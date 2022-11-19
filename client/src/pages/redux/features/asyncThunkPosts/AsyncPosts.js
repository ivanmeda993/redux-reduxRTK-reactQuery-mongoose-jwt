import React, { useEffect } from "react";
import PostTable from "../../../../components/posts/PostTable";
import {
  selectAsyncPosts,
  selectAsyncPostsStatus,
  selectAsyncPostsError,
  fetchPosts,
  isAsync,
} from "./asyncPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import AddAsyncPost from "./AddAsyncPost";
import { Outlet } from "react-router-dom";

const AsyncPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAsyncPosts);
  const status = useSelector(selectAsyncPostsStatus);
  const error = useSelector(selectAsyncPostsError);

  useEffect(() => {
    dispatch(isAsync(true));
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12  justify-center max-w-7xl h-screen mt-[200px] p-8 mx-auto">
        <AddAsyncPost />
        {
          {
            loading: <div>Loading...</div>,
            failed: <div>{error}</div>,
            succeeded: <PostTable posts={posts} />,
          }[status]
        }
      </div>
      <Outlet />
    </>
  );
};

export default AsyncPosts;
