import { configureStore } from "@reduxjs/toolkit";
import attractionReducer from "./attractionSlice";
import tripReducer from "./tripSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    attraction: attractionReducer,
    trip: tripReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["trip/getDirection"],
        ignoredPaths: [/trip.tripDirections/g],
        ignoredActionPaths: [/payload.routes/g, /payload.request/g],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
