/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Head from "./Head";
import { useState } from "react";
import { likePost, toggleLikedPosts } from "../store/postSlice";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftSolid,
  Bars3Icon,
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
  const [showMenu, setShowMenu] = useState(false);
  const [showPost, setShowPost] = useState(true);

  return (
    <div className={`w-full ${showPost ? "block" : "hidden"}`}>
      <div className="w-full flex justify-between items-start">
        <Head username={username} name={name} profileImg={profileImg} />
        <div className="relative flex flex-col items-end justify-center">
          <button
            className="py-2 text-button-default"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Bars3Icon className="size-5" />
          </button>
          {/* Add Stuff to menu from here */}
          <div
            className={`absolute top-1/2 mt-5 z-10 ${
              showMenu ? "block" : "hidden"
            } bg-button-default divide-y divide-dark-secondaryText rounded-lg shadow w-44 dark:bg-dark-secondaryBackground dark:divide-dark-secondaryText`}
          >
            <ul className="py-2 text-sm text-dark-primaryText dark:text-dark-primaryText">
              <li
                className="block px-4 py-2 hover:bg-button-hover hover:text-light-primaryText dark:hover:bg-dark-background dark:hover:text-button-hover"
                onClick={() => setShowPost(!showPost)}
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
            onClick={() => {
              dispatch(likePost(index));
              dispatch(toggleLikedPosts(index));
            }}
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
