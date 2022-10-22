import React from "react";
import { useSelector } from "react-redux";
import ChatList from "../../../components/chatlist/ChatList";
import ListHeader from "../../../components/headers/ListHeader";

const MainPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chats);

  return (
    <>
      <ListHeader user={currentUser} />
      <ChatList list={chats} />
    </>
  );
};

export default MainPage;
