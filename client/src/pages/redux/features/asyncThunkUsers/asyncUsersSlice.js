import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];
export const fetchUsers = createAsyncThunk(
  "asyncUsers/fetchUsers",
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);

const asyncUsersSlice = createSlice({
  name: "asyncUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAsyncUsers = (state) => state.asyncUsers;
export default asyncUsersSlice.reducer;
