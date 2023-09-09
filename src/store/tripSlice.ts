import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
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
    addTrip: (
      state,
      action: PayloadAction<{
        city: string;
        startDate: string;
        endDate: string;
      }>,
    ) => {
      const randomId = nanoid();
      const newTrip = {
        id: randomId,
        name: `Trip ${randomId}`,
        city: action.payload.city,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
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
        end: dayjs(new Date(action.payload.date)).add(2, "hour").toISOString(),
        overlap: false,
      };
      state.calendarEvents = [...state.calendarEvents, newEvent];
      state.trips[0].scheduleItems = [
        ...state.trips[0].scheduleItems,
        newEvent,
      ];
    },
    editCalendarEvent: (
      state,
      action: PayloadAction<{ id: string; start: string; end: string }>,
    ) => {
      const calendarEvents = state.calendarEvents.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            start: action.payload.start,
            end: action.payload.end,
          };
        }
        return event;
      });
      state.calendarEvents = calendarEvents;
      state.trips[0].scheduleItems = calendarEvents;
    },
    removeCalendarEvent: (state, action: PayloadAction<string>) => {
      state.calendarEvents = state.calendarEvents.filter(
        (event) => event.id !== action.payload,
      );
      state.trips[0].scheduleItems = state.trips[0].scheduleItems.filter(
        (event) => event.id !== action.payload,
      );
    },
  },
});

export const {
  addAttraction,
  removeAttraction,
  addTrip,
  addAttractionToCalendar,
  editCalendarEvent,
  removeCalendarEvent,
} = tripSlice.actions;

export default tripSlice.reducer;
