import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import PostForm from "../../../../components/forms/PostForm";
import { selectAsyncUsers } from "../asyncThunkUsers/asyncUsersSlice";
import { addNewPost } from "./asyncPostsSlice";
import { toast } from "react-toastify";

const AddAsyncPost = () => {
  const dispatch = useDispatch();

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
      dispatch(addNewPost({ title, body: content, userId })).unwrap();
      setFormState({ title: "", content: "", userId: "" });
      toast.success("Post added successfully");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
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

export default AddAsyncPost;
