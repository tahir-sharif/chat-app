import React, { useEffect, useState } from "react";
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
import { updateMessageToLocal } from "../../../store/reducers/chats-slice";

const ChatArea = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chats.conversation);
  const { currentUser } = useSelector((state) => state.auth);
  const { chats } = currentUser;
  const [loading, setLoading] = useState(true);
  const [messageLoading, setmessageLoading] = useState(true);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    // getting chat if it find from local
    const chatFromLocal = chats.find((chatUser) => chatUser._id === id);
    if (chatFromLocal && chatFromLocal._id) {
      setChatUser(chatFromLocal);
      getUserConversation();
      setLoading(false);
    } else {
      // if not on local then get it from server
      dispatch(getchatuser({ id })).then((res) => {
        if (res.error) {
          setLoading(false);
          setChatUser(null);
        } else {
          const user = res.payload.user;
          setChatUser(user);
          getUserConversation();
          setLoading(false);
        }
      });
    }
  }, [id, dispatch, chats]);

  const getUserConversation = () => {
    dispatch(getConversation({ id })).then((res) => {
      setmessageLoading(false);
    });
  };

  const requestMessage = (message) => {
    const messageObj = {
      message,
      id,
      createdAt: Date.now(),
    };
    dispatch(sendMessage(messageObj));
    // updating message locally
    dispatch(
      updateMessageToLocal({
        ...messageObj,
        sender: currentUser._id,
      })
    );
  };

  return (
    <Box className="chat-area">
      {loading ? (
        <Box className="page-center">
          <Typography>Loading your chat..</Typography>
        </Box>
      ) : (
        <>
          {chatUser && chatUser._id ? (
            <>
              <ChatHeader user={chatUser} />
              <Messages
                currentUser={currentUser}
                conversation={messages}
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
