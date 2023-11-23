import { LoginSuccessResponse, User } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface CreateUserAttributes {
  email: string;
  name: string;
  password: string;
}

interface LoginAttributes {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk<
  User,
  CreateUserAttributes,
  { rejectValue: string }
>("user/signUp", async (user, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/signup`, user);
    return res.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
    throw err;
  }
});

export const login = createAsyncThunk<
  LoginSuccessResponse,
  LoginAttributes,
  { rejectValue: string }
>("user/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, data);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
    throw err;
  }
});

export const logout = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: string }
>("user/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/logout`);
    return res.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
    throw err;
  }
});
