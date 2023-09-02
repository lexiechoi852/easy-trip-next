import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Attraction } from "@/types/attraction";
import { User } from "@/types/user";
import { Trip } from "@/types/trip";

export interface UserState {
  user: User | null;
  selectedAttractions: Attraction[];
  trips: Trip[];
}

const initialState: UserState = {
  user: null,
  selectedAttractions: [],
  trips: [],
};

export const userSlice = createSlice({
  name: "user",
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
  },
});

export const { addAttraction, removeAttraction } = userSlice.actions;

export default userSlice.reducer;
