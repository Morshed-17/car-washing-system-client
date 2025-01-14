import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface UserState {
  user: User | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedReducer;
