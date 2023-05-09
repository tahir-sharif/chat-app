import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { formatAMPM } from '../../../helperFunctions/timeformatter';
import StatusTick from '../../../components/common/StatusTick';

const Messages = ({ currentUser, conversation }) => {
  const conversationRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      conversationRef.current?.scroll(0, conversationRef.current?.scrollHeight);
    }, 100);
  }, [conversation]);

  return (
    <Box className="conversation-wrapper">
      <Box className="conversation" ref={conversationRef}>
        {conversation.map((message, i) => {
          const isSender = message.senderId === currentUser._id;
          return (
            <Box
              className={`message-row ${isSender ? 'sender' : 'reciever'}`}
              key={i}
            >
              <Box className="message">
                {message.message}

                {isSender ? (
                  <div className="sender-info">
                    <span className="sender-time">
                      {formatAMPM(message.createdAt)}
                    </span>
                    <StatusTick status={message.status} />
                  </div>
                ) : (
                  <span className="time">{formatAMPM(message.createdAt)}</span>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Messages;
