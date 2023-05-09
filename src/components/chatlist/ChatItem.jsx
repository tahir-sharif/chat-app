import { Avatar, Box, Button, Typography } from '@mui/material';
import { formatAMPM } from '../../helperFunctions/timeformatter';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StatusTick from '../common/StatusTick';
import './chatlist.scss';

const ChatItem = (props) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { lastMessage } = props.chat;

  if (!props?.chat?.user || props.chat.user === 'null') {
    console.error('chat user is null.');
    return <></>;
  }

  const { name, profileImage, newMsg, _id } = props.chat.user;

  const isSender = currentUser._id === lastMessage.senderId;
  return (
    <NavLink
      to={`chat/${_id}`}
      className={(nav) => `${nav.isActive ? 'active' : ''} chat-link`}
    >
      <Button className="chat-item">
        <Box className="chat-item-wrapper">
          {/* Item left Side (profile) */}
          <Box className="chat-item-left">
            <Avatar src={profileImage} className="chat-item-avatar" />
          </Box>
          {/* Item right Side */}
          <Box className="chat-item-right">
            <Typography className="profile-name">{name}</Typography>
            <Typography color="#d2d2d2">{lastMessage.message}</Typography>
            <p className="time">{formatAMPM(lastMessage.createdAt)}</p>
            <Box className="delivereTick">
              {newMsg ? (
                <Box className="new-msg"></Box>
              ) : isSender ? (
                <StatusTick status={lastMessage.status} />
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </Button>
    </NavLink>
  );
};

export default ChatItem;
