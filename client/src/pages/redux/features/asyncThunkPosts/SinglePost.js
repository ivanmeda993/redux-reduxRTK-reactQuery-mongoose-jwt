import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, isAsync, selectAsyncPostById } from "./asyncPostsSlice";
import PostCard from "../../../../components/posts/PostCard";
import { toast } from "react-toastify";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(isAsync(true));
  }, []);

  let post = useSelector((state) => selectAsyncPostById(state, +id));
  if (!post) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <h2>Post not found!</h2>
      </section>
    );
  }
  console.log("post", post);
  const deletePostHandler = () => {
    try {
      dispatch(deletePost({ id: post.id })).unwrap();
      toast.success("Post deleted successfully");
      navigate("/redux/async-posts");
    } catch (e) {
      toast.error("Error deleting post");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mt-[300px] flex-col ">
        <div className="max-w-[450px]">
          <PostCard {...post} isSingle />
        </div>
        {/*  create controls for deleting and editing*/}
        <div className="mt-6 flex space-x-8 items-center justify-center">
          <button
            className="shadow-lg py-2 px-9 rounded-xl hover:shadow-2xl hover:scale-110 transition transform ease-in bg-gray-100"
            onClick={() => navigate(`/redux/async-posts/${post.id}/edit`)}
          >
            Edit
          </button>
          <button
            className="shadow-lg py-2 px-9 rounded-xl hover:shadow-2xl hover:scale-110 transition transform ease-in bg-gray-100"
            onClick={deletePostHandler}
          >
            Delete
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default SinglePost;
