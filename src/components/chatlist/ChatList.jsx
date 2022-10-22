import { Box } from "@mui/material";
import ChatItem from "./ChatItem";

const ChatList = (props) => {
  const { list } = props;

  return (
    <Box sx={{ p: 2 }}>
      {list.length ? (
        list.map((chat, i) => {
          return <ChatItem chat={chat} key={i} />;
        })
      ) : (
        <>No Chats To Show</>
      )}
    </Box>
  );
};

export default ChatList;
