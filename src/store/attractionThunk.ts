import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Attraction } from "@/types/attraction";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/attractions`;

const getAllAttractions = createAsyncThunk<
  Attraction[],
  void,
  { rejectValue: string }
>("attraction/getAllAttractions", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_BASE_URL}`);
    if (res.data.data) {
      return res.data.data;
    }
    return [];
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

export default getAllAttractions;
