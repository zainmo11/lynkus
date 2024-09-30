/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Head from "./Head";
import { useState } from "react";
import { togglePost } from "../store/postSlice";

function Post({
  username,
  name,
  profileImg,
  body,
  postImg,
  likes,
  commemts,
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
            className="py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => dispatch(togglePost(index))}
              >
                Hide Post
              </li>
            </ul>
            <ul className="py-2">
              <li className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Share
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full pt-4 pb-2 text-gray-900 dark:text-white">
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
          <button className="text-gray-900 dark:text-white hover:text-rose-500 dark:hover:text-rose-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {likes}
          </p>
        </div>
        <div className=" flex items-center justify-between gap-2">
          <button className="text-gray-900 dark:text-white hover:text-rose-500 dark:hover:text-rose-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </button>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {commemts}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
