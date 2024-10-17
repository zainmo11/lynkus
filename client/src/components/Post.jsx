/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Head from "./Head";
import { useState } from "react";
import { likeNumberChange, likePostToggle } from "../store/postSlice";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftSolid,
  Bars3Icon,
} from "@heroicons/react/24/solid";

function Post({
  name,
  username,
  profileImg,
  postId,
  body,
  postImg,
  likes,
  commemts,
  likedByUser,
  // index,
}) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  // const [showMenu, setShowMenu] = useState(false);
  const [showPost, setShowPost] = useState(true);

  const handleLike = () => {
    console.log(likedByUser);
    const post = posts.find((post) => post._id === postId);
    dispatch(likePostToggle({ postId })).then(() => {
      dispatch(likeNumberChange(posts.indexOf(post)));
    });
  };

  return (
    <div className={`w-full ${showPost ? "block" : "hidden"}`}>
      <Link
        to={`/post/${postId}`}
        className="w-full flex justify-between items-start"
      >
        <Link to={`/user/${username}`}>
          <Head username={username} name={name} profileImg={profileImg} />
        </Link>
        {/* Add Stuff to menu from here */}
        {/* <div className="relative flex flex-col items-end justify-center">
          <button
            className="py-2 text-button-default"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Bars3Icon className="size-5" />
          </button>
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
        </div> */}
      </Link>
      <div className="w-full pt-4 pb-2 text-light-primaryText dark:text-dark-primaryText">
        {body}
      </div>
      {postImg && (
        <div className="w-full h-96">
          <img
            src={postImg}
            className="w-full h-full object-cover"
            alt="postImg"
          />
        </div>
      )}
      <div className="w-full py-4 flex items-center justify-start gap-10">
        <div className=" flex items-center justify-between gap-2">
          <button
            className="text-button-default  hover:text-button-hover"
            onClick={() => handleLike()}
          >
            <HeartIcon
              className={`size-6 ${likedByUser ? "hidden" : "block"}`}
            />
            <HeartSolid
              className={`size-6 ${likedByUser ? "block" : "hidden"}`}
            />
          </button>
          <p className="text-sm font-medium text-button-default">{likes}</p>
        </div>
        <Link
          to={`/post/${postId}`}
          className=" flex items-center justify-between gap-2"
        >
          <button className="text-button-default hover:text-button-hover">
            <ChatBubbleOvalLeftIcon className="size-6" />
          </button>
          <p className="text-sm font-medium text-button-default">{commemts}</p>
        </Link>
      </div>
    </div>
  );
}

export default Post;
