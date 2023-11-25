import { ScheduleItem, Trip, TripItem } from "@/types/trip";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface CreateTripAttributes {
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  userId: number;
}

interface AddTripItemAttributes {
  overlap: boolean;
  start: string;
  end: string;
  attractionId: number;
  tripId: number;
}

interface AddScheduleItemAttributes {
  attractionId: number;
  tripId: number;
}

interface GetDirectionAttributes {
  origin: string;
  destination: string;
  mode: google.maps.TravelMode;
}

export const getDirection = createAsyncThunk<
  google.maps.DirectionsResult,
  GetDirectionAttributes,
  { rejectValue: string }
>("trip/getDirection", async (params) => {
  try {
    const service = new google.maps.DirectionsService();
    const res = await service.route({
      origin: params.origin,
      destination: params.destination,
      travelMode: params.mode,
    });
    return res;
  } catch (err) {
    console.log(err, "err");
    throw err;
  }
});

export const createTrip = createAsyncThunk<
  Trip,
  CreateTripAttributes,
  { rejectValue: string }
>("trip/createTrip", async (trip, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/trips`, trip);
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

export const getAllTrips = createAsyncThunk<
  Trip[],
  number,
  { rejectValue: string }
>("trip/getAllTrips", async (userId, thunkAPI) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/trips/user/${userId}`);

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

export const getAllScheduleItems = createAsyncThunk<
  ScheduleItem[],
  number,
  { rejectValue: string }
>("trip/getAllScheduleItems", async (tripId, thunkAPI) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/schedule-items/trip/${tripId}`,
    );

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

export const addScheduleItem = createAsyncThunk<
  ScheduleItem,
  AddScheduleItemAttributes,
  { rejectValue: string }
>("trip/addScheduleItem", async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/schedule-items`, data);
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

export const removeScheduleItem = createAsyncThunk<
  ScheduleItem,
  number,
  { rejectValue: string }
>("trip/removeScheduleItem", async (scheduleItemId, thunkAPI) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/schedule-items/${scheduleItemId}`,
    );
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

export const addTripItem = createAsyncThunk<
  TripItem,
  AddTripItemAttributes,
  { rejectValue: string }
>("trip/addTripItem", async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/trip-items`, data);
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
