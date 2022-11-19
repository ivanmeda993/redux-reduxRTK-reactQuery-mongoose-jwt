import React from "react";
import {
  CakeIcon,
  FaceFrownIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { incrementReaction } from "../../pages/redux/features/toolkitPosts/postsSlice";
import { selectUsers } from "../../pages/redux/features/users/userSlice";
import TimeAgo from "./TimeAgo";
import { selectAsyncUsers } from "../../pages/redux/features/asyncThunkUsers/asyncUsersSlice";
import {
  incrementAsyncReaction,
  selectIsAsync,
} from "../../pages/redux/features/asyncThunkPosts/asyncPostsSlice";

const PostCard = ({
  title,
  content,
  reactions,
  userId,
  id,
  date,
  body,
  isSingle,
}) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const asyncUsers = useSelector(selectAsyncUsers);
  const isAsync = useSelector(selectIsAsync);
  const PostUser = () => {
    const author = isAsync
      ? asyncUsers.find((user) => user.id === userId)
      : users.find((user) => user.id === userId);
    return <span>by {author ? author.name : "Unknown user"}</span>;
  };

  return (
    <li className="py-3 sm:py-4 hover:scale-105 hover:shadow-xl hover:bg-gray-200/90 p-4 rounded-xl transform transition ease-in">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl">{title}</h2>
          <p
            className={`text-sm  text-gray-900 ${
              isSingle ? "" : "truncate"
            } dark:text-white`}
          >
            {content ? content : body}
          </p>
          <p
            className={` text-sm text-gray-500 ${
              isSingle ? "mt-2" : "truncate"
            } dark:text-gray-400 space-y-3`}
          >
            <PostUser />
            <br />
            <TimeAgo timestamp={date} />
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white gap-2">
          <div
            className="flex flex-col justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              isAsync
                ? dispatch(incrementAsyncReaction({ id, reaction: "thumbsUp" }))
                : dispatch(incrementReaction({ id, reaction: "thumbsUp" }));
            }}
          >
            <HandThumbUpIcon className="smallIcon" />
            <span>{reactions?.thumbsUp}</span>
          </div>
          <div
            className="flex flex-col justify-center items-center"
            onClick={() =>
              isAsync
                ? dispatch(incrementAsyncReaction({ id, reaction: "wow" }))
                : dispatch(incrementReaction({ id, reaction: "wow" }))
            }
          >
            <FaceFrownIcon className="smallIcon hover:text-yellow-300" />
            <span>{reactions?.wow}</span>
          </div>
          <div
            className="flex flex-col justify-center items-center"
            onClick={() =>
              isAsync
                ? dispatch(incrementAsyncReaction({ id, reaction: "heart" }))
                : dispatch(incrementReaction({ id, reaction: "heart" }))
            }
          >
            <HeartIcon className="smallIcon hover:text-red-600" />
            <span>{reactions?.heart}</span>
          </div>
          <div
            className="flex flex-col justify-center items-center"
            onClick={() =>
              isAsync
                ? dispatch(incrementAsyncReaction({ id, reaction: "rocket" }))
                : dispatch(incrementReaction({ id, reaction: "rocket" }))
            }
          >
            <PaperAirplaneIcon className="smallIcon hover:text-blue-600" />
            <span>{reactions?.rocket}</span>
          </div>
          <div
            className="flex flex-col justify-center items-center"
            onClick={() =>
              isAsync
                ? dispatch(incrementAsyncReaction({ id, reaction: "cake" }))
                : dispatch(incrementReaction({ id, reaction: "cake" }))
            }
          >
            <CakeIcon className="smallIcon hover:text-violet-600" />
            <span>{reactions?.cake}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
