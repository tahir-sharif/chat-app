import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
import { apiUrl } from "../../url";

const getAxiosConfig = () => {
  const jwt = cookie.load("jwt");

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  return axiosConfig;
};

export const register = createAsyncThunk("register", async (data, thunkApi) => {
  const navigateTo = data.navigateTo;
  delete data.navigateTo;
  try {
    const response = await axios.post(
      apiUrl("/user/register"),
      data,
      getAxiosConfig()
    );
    return { data: response.data, navigateTo };
  } catch (e) {
    const { error } = e.response.data;
    return thunkApi.rejectWithValue(error ? error : e);
  }
});

export const login = createAsyncThunk("login", async (data, thunkApi) => {
  const navigateTo = data.navigateTo;
  delete data.navigateTo;
  try {
    const response = await axios.post(
      apiUrl("/user/login"),
      data,
      getAxiosConfig()
    );
    return { data: response.data, navigateTo };
  } catch (e) {
    const { error } = e.response.data;
    return thunkApi.rejectWithValue(error ? error : e);
  }
});

export const checkIfUserCanRegister = createAsyncThunk(
  "check",
  async ({ userName }, thunkApi) => {
    try {
      const response = await axios.get(
        apiUrl("/user/canregister/" + userName),
        getAxiosConfig()
      );
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue();
    }
  }
);

export const getMe = createAsyncThunk("getMe", async (data, thunkApi) => {
  try {
    const response = await axios.get(apiUrl("/user/getme"), getAxiosConfig());
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue();
  }
});
