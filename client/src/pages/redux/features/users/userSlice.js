import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "Neil Young",
  },
  {
    id: "3",
    name: "John Paul Jones",
  },
];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
