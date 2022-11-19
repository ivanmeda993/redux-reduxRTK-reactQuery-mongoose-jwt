import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/toolkitPosts/postsSlice";
import asyncPostsReducer from "../features/asyncThunkPosts/asyncPostsSlice";
import usersReducer from "../features/users/userSlice";
import asyncUsersReducer from "../features/asyncThunkUsers/asyncUsersSlice";
import modalReducer from "./modalSlice";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    asyncPosts: asyncPostsReducer,
    users: usersReducer,
    asyncUsers: asyncUsersReducer,
    modal: modalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
