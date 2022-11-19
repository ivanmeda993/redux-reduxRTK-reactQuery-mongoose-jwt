import React, { useEffect, useState } from "react";
import PostForm from "../../../../components/forms/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAsyncPostById, updatePost } from "./asyncPostsSlice";
import { selectAsyncUsers } from "../asyncThunkUsers/asyncUsersSlice";
import { toast } from "react-toastify";
const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("params", id);
  const post = useSelector((state) => selectAsyncPostById(state, +id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) {
      return navigate("/redux/async-posts");
    }
    if (post) {
      setFormState({
        title: post.title,
        content: post.body,
        userId: post.userId,
      });
    }
  }, [post]);

  const users = useSelector(selectAsyncUsers);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [error, setError] = useState(null);

  const { title, content, userId } = formState;
  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !userId) {
      setError("All fields are required");
      return;
    }
    try {
      dispatch(
        updatePost({
          ...post,
          id: +id,
          title,
          body: content,
          userId: +userId,
        })
      ).unwrap();
      setFormState({ title: "", content: "", userId: "" });

      toast.success("Post updated successfully");
      navigate(`/redux/async-posts/${id}`);
    } catch (e) {
      console.log("error", e);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-4xl mx-auto h-screen flex justify-center items-center p-8">
      <PostForm
        onSubmit={onSubmit}
        onChange={onChange}
        formState={formState}
        error={error}
        users={users}
      />
    </div>
  );
};

export default EditPost;
