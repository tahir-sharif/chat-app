import { createSlice } from '@reduxjs/toolkit';
import cookie from 'react-cookies';
import { register, login, getMe } from '../actions/auth';
import { socket } from '../../socket';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: cookie.load('jwt') !== undefined,
    currentUser: null,
    prevHistoryState: null
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      const { data, navigateTo } = action.payload;
      const { user, token } = data;
      state.currentUser = user;
      cookie.save('jwt', token, {
        path: '/'
      });
      socket.connect({
        token: `Bearer ${token}`
      });
      state.prevHistoryState = navigateTo;
      state.isLoggedIn = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { data, navigateTo } = action.payload;
      const { user, token } = data;
      state.currentUser = user;
      cookie.save('jwt', token, {
        path: '/'
      });
      socket.connect({
        token: `Bearer ${token}`
      });
      state.prevHistoryState = navigateTo;
      state.isLoggedIn = true;
    });

    // getting user's data
    builder.addCase(getMe.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.currentUser = user;
      state.isLoggedIn = true;
    });
    builder.addCase(getMe.rejected, (state) => {
      socket.disconnect();
      cookie.remove('jwt');
      state.currentUser = null;
      state.chats = [];
      state.isLoggedIn = false;
    });
  },
  reducers: {
    logout: (state) => {
      cookie.remove('jwt');
      socket.disconnect();
      state.currentUser = null;
      state.isLoggedIn = false;
    }
  }
});
export default authSlice.reducer;
export const { logout } = authSlice.actions;
