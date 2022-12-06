import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "../../../components/chatlist/ChatList";
import ListHeader from "../../../components/headers/ListHeader";
import SearchInput from "../../../components/common/Searchinput";
import { useNavigate } from "react-router-dom";
import { getSearchAutocomlete } from "../../../store/actions/chats";

const MainPage = () => {
  const [autoCompleteSearchbar, setautoCompleteSearchbar] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chats);
  const navigate = useNavigate();
  const [searchbar, setsearchbar] = useState({
    open: false,
    loading: false,
    result: [],
  });

  const updateSearchState = (name, value) => {
    if (name) {
      setsearchbar((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSearchBarChange = (value) => {
    if (value) {
      dispatch(getSearchAutocomlete(value)).then(({ payload: users }) => {
        updateSearchState("result", users);
        updateSearchState("loading", false);
      });
    }
  };

  const onImmediateChange = (value) => {
    if (value) {
      if (!searchbar.result.length) {
        updateSearchState("loading", true);
      }
    } else {
      updateSearchState("loading", false);
    }
  };

  const onSearchBarOpen = (value) => {
    if (!searchbar.result.length && value) {
      updateSearchState("loading", true);
    }
  };

  const onSearchBarClose = () => {
    updateSearchState("open", false);
  };

  const onSearchSelectHandler = (_, user) => {
    if (user) {
      navigate(`chat/${user._id}`);
    }
  };

  return (
    <>
      <ListHeader
        user={currentUser}
        isSearchbarOpen={autoCompleteSearchbar}
        setsearchbarOpen={setautoCompleteSearchbar}
      />
      <SearchInput
        options={searchbar.result}
        loading={searchbar.loading}
        onChange={onSearchBarChange}
        onImmediateChange={onImmediateChange}
        onOpen={onSearchBarOpen}
        onselect={onSearchSelectHandler}
        onClose={onSearchBarClose}
      />
      <ChatList list={chats} />
    </>
  );
};

export default MainPage;
