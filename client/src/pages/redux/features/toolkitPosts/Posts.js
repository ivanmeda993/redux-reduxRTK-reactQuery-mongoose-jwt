import React, { useEffect } from "react";
import PostTable from "../../../../components/posts/PostTable";
import AddPost from "./AddPost";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "./postsSlice";
import { isAsync } from "../asyncThunkPosts/asyncPostsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(isAsync(false));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center max-w-7xl h-screen mt-[300px] md:mt-0 p-8 mx-auto">
      <AddPost />
      <PostTable posts={posts} />
    </div>
  );
};

export default Posts;
