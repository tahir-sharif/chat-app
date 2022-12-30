import { createSlice } from "@reduxjs/toolkit";
// import { conversation } from "../../temp/conversation";
// import { users } from "../../temp/chatsUsers";s
import { getMe, login, register } from "../actions/auth";
import { getConversation } from "../actions/chats";

const chat = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    conversations: {
      // data will file like this
      id: {
        messages: [],
        user: {},
      },
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

    // Getting Messages
    builder.addCase(getConversation.fulfilled, (state, action) => {
      const { data, id } = action.payload;
      if (data.conversation) {
        state.conversations[id] = data.conversation;
      }
    });
  },
  reducers: {
    updateLocalConversation(state, action) {
      const { message, chatId, chatUser } = action.payload;

      const chatNavIndex = state.chats.findIndex(
        (chat) => chat?.user?._id === message.id
      );
      if (chatNavIndex !== -1) {
        state.chats[chatNavIndex].lastMessage = message;
        state.chats.unshift(state.chats[chatNavIndex]);
        state.chats.splice(chatNavIndex + 1, 1);
      } else {
        state.chats.unshift({
          user: chatUser,
          lastMessage: message,
        });
      }

      const localConversation = state.conversations[chatId];
      if (localConversation) {
        localConversation.messages.push(message);
      } else {
        state.conversations[chatId] = {
          messages: [message],
          chatId,
        };
      }
    },
  },
});
export default chat.reducer;
export const { updateLocalConversation } = chat.actions;
