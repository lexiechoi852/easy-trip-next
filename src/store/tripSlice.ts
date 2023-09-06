import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addDays, addHours } from "date-fns";
import { nanoid } from "nanoid";
import { Attraction } from "@/types/attraction";
import { CalendarEvent, ScheduleItem, Trip } from "@/types/trip";

export interface TripState {
  selectedAttractions: Attraction[];
  trips: Trip[];
  scheduleItems: ScheduleItem[];
  calendarEvents: CalendarEvent[];
}

const initialState: TripState = {
  selectedAttractions: [],
  trips: [],
  scheduleItems: [],
  calendarEvents: [],
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addAttraction: (state, action: PayloadAction<Attraction>) => {
      const newScheduleItem = {
        id: action.payload.id,
        title: action.payload.name,
        duration: "02:00",
      };
      state.scheduleItems = [...state.scheduleItems, newScheduleItem];
      state.selectedAttractions = [
        ...state.selectedAttractions,
        action.payload,
      ];
    },
    removeAttraction: (state, action: PayloadAction<Attraction>) => {
      state.selectedAttractions = state.selectedAttractions.filter(
        (attraction) => attraction.id !== action.payload.id,
      );
      state.scheduleItems = state.scheduleItems.filter(
        (scheduleItem) => scheduleItem.id !== action.payload.id,
      );
    },
    addTrip: (state) => {
      const newTrip = {
        id: nanoid(),
        name: `trip ${state.trips.length}`,
        startDate: new Date().toISOString(),
        endDate: addDays(new Date(), 5).toISOString(),
        scheduleItems: [],
      };
      state.trips.push(newTrip);
    },
    addAttractionToCalendar: (
      state,
      action: PayloadAction<{ title: string; date: string }>,
    ) => {
      const newEvent = {
        id: nanoid(),
        title: action.payload.title,
        start: action.payload.date,
        end: addHours(new Date(action.payload.date), 2).toISOString(),
        overlap: false,
      };
      state.calendarEvents = [...state.calendarEvents, newEvent];
      state.trips[0].scheduleItems = [
        ...state.trips[0].scheduleItems,
        newEvent,
      ];
    },
  },
});

export const {
  addAttraction,
  removeAttraction,
  addTrip,
  addAttractionToCalendar,
} = tripSlice.actions;

export default tripSlice.reducer;
