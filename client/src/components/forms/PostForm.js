import React from "react";
import Btn from "../btn/Btn";

const PostForm = ({ onSubmit, onChange, formState, users, error }) => {
  const { title, content, userId } = formState;
  return (
    <form className="w-full" onSubmit={onSubmit}>
      {/*Select user from options*/}
      <label
        htmlFor="userId"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Select User
      </label>
      <div className="mb-6">
        <select
          className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2"
          name="userId"
          onChange={onChange}
          value={userId}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Title
        </label>
        <input
          placeholder="Title"
          value={title}
          onChange={onChange}
          type="text"
          name="title"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <div className=" mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          value={content}
          onChange={onChange}
          name="content"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>
      </div>
      {/*create error msg*/}
      {error && (
        <div className="text-red-500 text-sm font-medium mb-2">{error}</div>
      )}
      <Btn text="Submit" type="submit" className="!ml-auto !w-full" />
    </form>
  );
};

export default PostForm;
