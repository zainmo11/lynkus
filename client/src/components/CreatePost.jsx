import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/darkModeSlice";

function CreatePost() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className=" w-full bg-dark-secondaryBackground md:hidden flex justify-between items-center py-2 px-4">
        <img src={logo} className="h-14 rounded-full object-cover" alt="Logo" />
        <div className="flex justify-center items-center gap-5">
          <button
            type="button"
            className="mx-auto p-2 text-black bg-light-secondaryText hover:bg-blue-800 rounded-full dark:bg-light-secondaryTex dark:text-white dark:hover:bg-blue-700"
            onClick={() => dispatch(toggleDarkMode())}
          >
            {darkMode ? (
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
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
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
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="mx-auto p-2 text-white bg-red-700 hover:bg-blue-800 rounded-full dark:bg-red-700 dark:hover:bg-blue-700"
          >
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <form className="mt-6 mx-6">
        <div className="flex items-center justify-center gap-4">
          <img
            src={logo}
            className="h-14 rounded-full object-cover"
            alt="Logo"
          />
          <input
            type="create"
            name="createPost"
            id="createPost"
            className="w-full block py-2.5 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="What's Happening ?"
          />
        </div>
        <div className="mb-6 flex justify-between items-end">
          <label className="mt-6 ml-3 mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <input
              type="file"
              name="photo"
              accept="image/*"
              // onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
          <button
            type="submit"
            className="font-semibold rounded-3xl text-sm px-6 py-2 text-center text-white bg-light-secondaryText hover:bg-blue-800  dark:bg-light-secondaryText dark:hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}

export default CreatePost;
