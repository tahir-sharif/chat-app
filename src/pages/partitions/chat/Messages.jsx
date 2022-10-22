import React, { useEffect, useRef } from "react";
import { Done, DoneAll } from "@mui/icons-material";
import { Box } from "@mui/material";
import { formatAMPM } from "../../../helperFunctions/timeformatter";

const Messages = ({ currentUser, conversation, delivered, seen, loading }) => {
  const conversationRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      conversationRef.current.scroll(0, conversationRef.current.scrollHeight);
    }, 100);
  }, [conversation]);

  return (
    <Box className="conversation-wrapper">
      {loading ? (
        <Box className="page-center">Loading your conversation..</Box>
      ) : (
        <Box className="conversation" ref={conversationRef}>
          {conversation.map((message, i) => {
            const isSender = message.sender === currentUser._id;
            return (
              <Box
                className={`message-row ${isSender ? "sender" : "reciever"}`}
                key={i}
              >
                <Box className="message">
                  {message.message}

                  {isSender ? (
                    <div className="sender-info">
                      <span className="sender-time">
                        {formatAMPM(message.createdAt)}
                      </span>
                      <div className="delivered-status">
                        {delivered || seen ? (
                          <DoneAll className={seen ? "seen" : ""} />
                        ) : (
                          <Done />
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="time">
                      {formatAMPM(message.createdAt)}
                    </span>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Messages;
