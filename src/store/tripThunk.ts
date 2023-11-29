import { ScheduleItem, Trip, TripItem } from "@/types/trip";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { RootState } from "./index";

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

interface UpdateTripItemAttributes {
  id: number;
  start: string;
  end: string;
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
  { rejectValue: string; state: RootState }
>("trip/createTrip", async (trip, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.post(`${API_BASE_URL}/trips`, trip, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
  { rejectValue: string; state: RootState }
>("trip/getAllTrips", async (userId, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.get(`${API_BASE_URL}/trips/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
  { rejectValue: string; state: RootState }
>("trip/getAllScheduleItems", async (tripId, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.get(
      `${API_BASE_URL}/schedule-items/trip/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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
  { rejectValue: string; state: RootState }
>("trip/addScheduleItem", async (data, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.post(`${API_BASE_URL}/schedule-items`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
  { rejectValue: string; state: RootState }
>("trip/removeScheduleItem", async (scheduleItemId, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.delete(
      `${API_BASE_URL}/schedule-items/${scheduleItemId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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

export const getAllTripItems = createAsyncThunk<
  TripItem[],
  number,
  { rejectValue: string; state: RootState }
>("trip/getAllTripItems", async (tripId, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.get(`${API_BASE_URL}/trip-items/trip/${tripId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
  { rejectValue: string; state: RootState }
>("trip/addTripItem", async (data, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.post(`${API_BASE_URL}/trip-items`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const updateTripItem = createAsyncThunk<
  TripItem,
  UpdateTripItemAttributes,
  { rejectValue: string; state: RootState }
>("trip/updateTripItem", async ({ id, start, end }, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.patch(
      `${API_BASE_URL}/trip-items/${id}`,
      {
        start,
        end,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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

export const removeTripItem = createAsyncThunk<
  TripItem,
  number,
  { rejectValue: string; state: RootState }
>("trip/removeTripItem", async (tripItemId, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().user;

    const res = await axios.delete(`${API_BASE_URL}/trip-items/${tripItemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
