import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginSuccessResponse, User } from "@/types/user";
import { login, logout, signUp } from "./userThunk";

export interface UserState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  errorMessage: string;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  isLoading: false,
  isError: false,
  message: "",
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.errorMessage = action.payload;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginSuccessResponse>) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.message = action.payload.message;
          state.isLoading = false;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.errorMessage = action.payload;
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.errorMessage = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
