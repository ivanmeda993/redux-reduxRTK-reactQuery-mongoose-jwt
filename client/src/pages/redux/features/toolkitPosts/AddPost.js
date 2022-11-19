import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { selectUsers } from "../users/userSlice";
import PostForm from "../../../../components/forms/PostForm";
import { toast } from "react-toastify";
const AddPost = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
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
    dispatch(addPost(title, content, userId));
    toast.success("Post added successfully");
    setFormState({ title: "", content: "", userId: "" });
  };
  return (
    <PostForm
      onSubmit={onSubmit}
      onChange={onChange}
      formState={formState}
      error={error}
      users={users}
    />
  );
};

export default AddPost;
