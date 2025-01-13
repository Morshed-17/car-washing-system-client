import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface user {
  name: string;
  email: string;
  token: string;
}

// Define the initial state using that type
const initialState: user = {
  name: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
