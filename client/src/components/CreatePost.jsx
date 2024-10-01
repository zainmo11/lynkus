import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/darkModeSlice";
import {
  SunIcon,
  MoonIcon,
  ArrowLeftStartOnRectangleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

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
            className="mx-auto p-2 text-dark-primaryText bg-button-default hover:bg-button-hover rounded-full"
            onClick={() => dispatch(toggleDarkMode())}
          >
            {darkMode ? (
              <SunIcon className="size-6" />
            ) : (
              <MoonIcon className="size-6" />
            )}
          </button>
          <button
            type="button"
            className="mx-auto p-2 text-dark-primaryText bg-button-error hover:bg-red-800 rounded-full"
          >
            <ArrowLeftStartOnRectangleIcon className="size-6" />
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
            className="w-full block py-2.5 text-light-primaryText bg-transparent border-0 border-b-2 border-light-secondaryText appearance-none dark:text-dark-primaryText dark:border-dark-secondaryText dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="What's Happening?"
          />
        </div>
        <div className="mb-6 flex justify-between items-end">
          <label className="mt-6 ml-3 mr-6">
            <PhotoIcon className="size-7 text-button-default hover:text-button-hover" />
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
            className="font-semibold rounded-3xl text-sm px-6 py-2 text-center text-dark-primaryText bg-button-default hover:bg-button-hover"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}

export default CreatePost;
