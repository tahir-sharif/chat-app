import { createSlice } from "@reduxjs/toolkit";
import { conversation } from "../../temp/conversation";
import { users } from "../../temp/chatsUsers";
import { getMe, login, register } from "../actions/auth";
import { getConversation } from "../actions/chats";

const chat = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    conversation: {
      messages: [],
      user: {},
    },
  },
  extraReducers: (builder) => {
    // Getting chats list for main view from the following fullfills
    builder.addCase(register.fulfilled, (state, action) => {
      const { data } = action.payload;
      const { chats } = data.user;
      state.chats = chats;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { data } = action.payload;
      const { chats } = data.user;
      state.chats = chats;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      const { chats } = action.payload.user;
      state.chats = chats;
    });

    builder.addCase(getConversation.fulfilled, (state, action) => {
      const { conversation } = action.payload;
      if (conversation) {
        state.conversation = {
          ...conversation,
        };
      } else {
        state.conversation = {
          messages: [],
        };
      }
    });
  },
  reducers: {
    getConversation(state, action) {
      const indexId = action.payload;
      state.conversation.messages = conversation[indexId];
      state.conversation.user = users[indexId];
    },
    updateMessageToLocal(state, action) {
      const messageObj = action.payload;
      state.conversation.messages.push(messageObj);

      const chat = state.chats.find(
        (chat) => chat?.user?._id === messageObj.id
      );
      if (chat) {
        chat.lastMessage = messageObj;
      }
    },
  },
});
export default chat.reducer;
export const { sendMessage, updateMessageToLocal } = chat.actions;
