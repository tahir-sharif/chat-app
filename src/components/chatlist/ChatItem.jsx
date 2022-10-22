import { Avatar, Box, Button, Typography } from "@mui/material";
import { Done, DoneAll } from "@mui/icons-material";
import { formatAMPM } from "../../helperFunctions/timeformatter";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";

const ChatItem = (props) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { lastMessage } = props.chat;
  const { name, profileImage, seen, delivered, newMsg, _id } = props.chat.user;

  const isSender = currentUser._id === lastMessage.sender;
  return (
    <NavLink
      to={`chat/${_id}`}
      className={(nav) => `${nav.isActive ? "active" : ""} chat-link`}
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
                delivered || seen ? (
                  <DoneAll className={seen ? "seen" : ""} />
                ) : (
                  <Done />
                )
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
