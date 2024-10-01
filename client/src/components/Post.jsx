/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Head from "./Head";
import { useState } from "react";
import { likePost, togglePost } from "../store/postSlice";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftSolid,
} from "@heroicons/react/24/solid";

function Post({
  username,
  name,
  profileImg,
  body,
  postImg,
  likes,
  commemts,
  postLiked,
  index,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start">
        <Head username={username} name={name} profileImg={profileImg} />
        <div className="relative flex flex-col items-end justify-center">
          <button
            className="py-2 text-button-default hover:bg-button-hover"
            onClick={() => setShow(!show)}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          {/* Add Stuff to menu from here */}
          <div
            className={`absolute top-1/2 mt-5 z-10 ${
              show ? "block" : "hidden"
            } bg-button-default divide-y divide-dark-secondaryText rounded-lg shadow w-44 dark:bg-dark-secondaryBackground dark:divide-dark-secondaryText`}
          >
            <ul className="py-2 text-sm text-dark-primaryText dark:text-dark-primaryText">
              <li
                className="block px-4 py-2 hover:bg-button-hover hover:text-light-primaryText dark:hover:bg-dark-background dark:hover:text-button-hover"
                onClick={() => dispatch(togglePost(index))}
              >
                Hide Post
              </li>
            </ul>
            <ul className="py-2 text-sm text-dark-primaryText dark:text-dark-primaryText">
              <li className="px-4 py-2 hover:bg-button-hover hover:text-light-primaryText dark:hover:bg-dark-background dark:hover:text-button-hover">
                Share
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full pt-4 pb-2 text-light-primaryText dark:text-dark-primaryText">
        {body}
      </div>
      {postImg && (
        <div className="w-full h-96">
          <img
            src={postImg}
            className="w-full h-full object-cover"
            alt="Logo"
          />
        </div>
      )}
      <div className="w-full py-4 flex items-center justify-start gap-10">
        <div className=" flex items-center justify-between gap-2">
          <button
            className="text-button-default  hover:text-button-hover"
            onClick={() => dispatch(likePost(index))}
          >
            <HeartIcon className={`size-6 ${postLiked ? "hidden" : "block"}`} />
            <HeartSolid
              className={`size-6 ${postLiked ? "block" : "hidden"}`}
            />
          </button>
          <p className="text-sm font-medium text-button-default">{likes}</p>
        </div>
        <div className=" flex items-center justify-between gap-2">
          <button className="text-button-default hover:text-button-hover">
            <ChatBubbleOvalLeftIcon className="size-6" />
          </button>
          <p className="text-sm font-medium text-button-default">{commemts}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
