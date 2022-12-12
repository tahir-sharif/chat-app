import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatHeader from "../../../components/headers/ChatHeader";
import {
  getchatuser,
  getConversation,
  sendMessage,
} from "../../../store/actions/chats";
import Messages from "./Messages";
import { Box, Typography } from "@mui/material";
import MessageFooter from "./MessageFooter";
import "./style.scss";
import { updateLocalConversation } from "../../../store/reducers/chats-slice";

const ChatArea = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chats.conversations);
  const { currentUser } = useSelector((state) => state.auth);
  const { chats } = currentUser;
  const [loading, setLoading] = useState(false);
  const [messageLoading, setmessageLoading] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const currentConversation = conversations[id];

  const getUserConversation = useCallback(() => {
    if (!currentConversation) {
      setmessageLoading(true);
      dispatch(getConversation({ id })).then(() => {
        setmessageLoading(false);
      });
    }
  }, [currentConversation, dispatch, id]);

  useEffect(() => {
    // getting chat if it find from local
    const chatFromLocal = chats.find((chatUser) => chatUser.user._id === id);
    if (chatFromLocal && chatFromLocal?.user?._id) {
      setChatUser(chatFromLocal.user);
      getUserConversation();
    } else {
      // if not on local then get it from server
      setLoading(true);
      dispatch(getchatuser({ id })).then((res) => {
        if (res.error) {
          setLoading(false);
          setChatUser(null);
        } else {
          const user = res.payload.user;
          setChatUser(user);
          setLoading(false);
          getUserConversation();
        }
      });
    }
  }, [id, dispatch, chats, getUserConversation]);

  const requestMessage = (message) => {
    const messageObj = {
      message,
      id,
      createdAt: Date.now(),
    };
    dispatch(sendMessage(messageObj));
    // updating message locally
    dispatch(
      updateLocalConversation({
        message: {
          ...messageObj,
          sender: currentUser._id,
        },
        chatId: id,
        chatUser,
      })
    );
  };

  return (
    <Box className="chat-area">
      {loading || messageLoading ? (
        <Box className="page-center">
          <Typography>
            {loading ? "Loading your chat.." : "Loading Messages.."}
          </Typography>
        </Box>
      ) : (
        <>
          {chatUser && chatUser._id ? (
            <>
              <ChatHeader user={chatUser} />
              <Messages
                currentUser={currentUser}
                conversation={currentConversation?.messages || []}
                loading={messageLoading}
              />
              <MessageFooter onSend={requestMessage} />
            </>
          ) : (
            <Box className="page-center">
              <Typography sx={{ color: "#ff6868" }}>
                Sorry no chat user were found !
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ChatArea;
