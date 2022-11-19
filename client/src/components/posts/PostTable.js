import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import {
  selectAsyncPostsByUser,
  selectIsAsync,
} from "../../pages/redux/features/asyncThunkPosts/asyncPostsSlice";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { selectAsyncUsers } from "../../pages/redux/features/asyncThunkUsers/asyncUsersSlice";
import * as PropTypes from "prop-types";
import SearchInput from "../forms/SearchInput";

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
const PostTable = ({ posts }) => {
  //just for reusable component
  const isAsync = useSelector(selectIsAsync);
  const users = useSelector(selectAsyncUsers);

  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [userId, setUserId] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search === "") {
      return setFilteredPosts(posts);
    }
    const filtered = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post?.content?.toLowerCase().includes(search.toLowerCase()) ||
        post?.body?.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredPosts(filtered);
  }, [search]);
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);
  const postByUser = useSelector((state) =>
    selectAsyncPostsByUser(state, +userId)
  );
  useEffect(() => {
    if (userId === "") {
      return setFilteredPosts(posts);
    }
    setFilteredPosts(postByUser);
  }, [userId]);

  return (
    <div className="p-4  bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center w-full">
          Posts
        </h5>
      </div>
      <SearchInput value={search} onChange={handleSearch} />
      {isAsync && (
        <div className="mt-4">
          <label className="mb-2  text-sm font-medium text-gray-900 dark:text-gray-300">
            Or filter by user
          </label>
          <select
            className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 "
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flow-root mt-3">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700 space-y-3"
        >
          {filteredPosts.map((post, index) => {
            return isAsync ? (
              <div key={post.id}>
                <PostCard {...post} />
                <Link
                  to={`/redux/async-posts/${post.id}`}
                  onClick={() => console.log("click")}
                  className=" p-2 hover:shadow-xl hover:bg-gray-200 w-[150px]  dark:border-gray-700 rounded-lg justify-between items-center flex"
                >
                  View Details
                  <ArrowRightIcon className="w-6 h-6" />
                </Link>
              </div>
            ) : (
              <PostCard
                key={post.id}
                {...post}
                onClick={() => console.log("clisssck")}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PostTable;
