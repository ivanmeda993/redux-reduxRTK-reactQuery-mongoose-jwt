import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const asyncPostAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = asyncPostAdapter.getInitialState({
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  isAsync: false,
});
export const fetchPosts = createAsyncThunk(
  "asyncPosts/fetchPosts",
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);
export const addNewPost = createAsyncThunk(
  "asyncPosts/addNewPost",
  async (post) => {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
  }
);
export const updatePost = createAsyncThunk(
  "asyncPosts/updatePost",
  async (post) => {
    const response = await axios.put(`${POSTS_URL}/${post.id}`, post);
    return response.data;
  }
);
export const deletePost = createAsyncThunk(
  "asyncPosts/deletePost",
  async (id) => {
    await axios.delete(`${POSTS_URL}/${id}`);
    return id;
  }
);

const asyncPostsSlice = createSlice({
  name: "asyncPosts",
  initialState,
  reducers: {
    incrementAsyncReaction: (state, action) => {
      const { id, reaction } = action.payload;
      const post = state.entities[id];
      console.log("post", post);
      if (post) {
        post.reactions[reaction]++;
      }
    },

    isAsync: (state, action) => {
      state.isAsync = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.slice(0, 20).map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            cake: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        asyncPostAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.id = state.entities.length + 1;

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          cake: 0,
        };
        console.log(action.payload);
        asyncPostAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        asyncPostAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        asyncPostAdapter.removeOne(state, id);
      });
  },
});
//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAsyncPosts,
  selectById: selectAsyncPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = asyncPostAdapter.getSelectors((state) => state.asyncPosts);

//create selectors
export const selectAsyncPostsStatus = (state) => state.asyncPosts.status;
export const selectAsyncPostsError = (state) => state.asyncPosts.error;
export const selectIsAsync = (state) => state.asyncPosts.isAsync;

export const selectAsyncPostsByUser = createSelector(
  [selectAsyncPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

//export actions
export const { incrementAsyncReaction, isAsync } = asyncPostsSlice.actions;

//export reducer
export default asyncPostsSlice.reducer;
