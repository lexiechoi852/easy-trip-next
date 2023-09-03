import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Attraction } from "@/types/attraction";
import { Trip } from "@/types/trip";
import { DropInfo } from "@/types/calendar";

export interface TripState {
  selectedAttractions: Attraction[];
  trips: Trip[];
}

const initialState: TripState = {
  selectedAttractions: [],
  trips: [],
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addAttraction: (state, action: PayloadAction<Attraction>) => {
      state.selectedAttractions = [
        ...state.selectedAttractions,
        action.payload,
      ];
    },
    removeAttraction: (state, action: PayloadAction<Attraction>) => {
      state.selectedAttractions = state.selectedAttractions.filter(
        (attraction) => attraction.id !== action.payload.id,
      );
    },
    addTrip: (state) => {
      const newTrip = {
        id: state.trips.length,
        name: `trip ${state.trips.length}`,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        scheduleItems: [],
      };
      state.trips.push(newTrip);
    },
    addAttractionToCalendar: (state, action: PayloadAction<DropInfo>) => {
      const currentTrip = state.trips[0];
      console.log(currentTrip, "currentTrip");
      console.log(action.payload.date, "time");
      //   const newScheduleItem = {
      //     name: action.payload.name,
      //     description: action.payload.description,
      //     attraction: action.payload,
      //     type: 'attraction',
      //     startTime: action.payload.date
      //     endTimeTime: Date;
      //   };
      //   currentTrip.scheduleItems
    },
  },
});

export const { addAttraction, removeAttraction, addAttractionToCalendar } =
  tripSlice.actions;

export default tripSlice.reducer;
