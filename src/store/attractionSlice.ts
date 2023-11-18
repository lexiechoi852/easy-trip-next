import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Attraction } from "@/types/attraction";
import getAllAttractions from "./attractionThunk";

export interface AttractionState {
  attractions: Attraction[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: AttractionState = {
  attractions: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const attractionSlice = createSlice({
  name: "attraction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAttractions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllAttractions.fulfilled,
        (state, action: PayloadAction<Attraction[]>) => {
          state.attractions = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getAllAttractions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.errorMessage = action.payload;
        }
      });
  },
});

// export const { getAllAttractions } = attractionSlice.actions;

export default attractionSlice.reducer;
