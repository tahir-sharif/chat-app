import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth-slice";
import chatsSlice from "./reducers/chats-slice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    chats: chatsSlice,
  },
});
export default store;
