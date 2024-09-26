import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../store/darkModeSlice";

function Navbar() {
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
    <div className="w-full fixed bottom-0 md:static md:col-span-1 md:h-screen lg:col-span-2">
      <nav className="bg-light-background dark:bg-dark-background w-full h-full z-20 rounded-tr-3xl rounded-tl-3xl md:rounded-none md:border-r border-gray-200 dark:border-gray-600">
        <div className="w-full h-full flex flex-col items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="w-full hidden md:flex items-center md:justify-center lg:justify-start md:mt-8 lg:ml-24"
          >
            <img
              src="logo.png"
              className="md:h-14 lg:h-24 rounded-full object-cover"
              alt="Logo"
            />
          </Link>
          <div className="hidden w-full mb-4 lg:flex flex-col gap-4 order-2">
            <button
              type="button"
              className="w-3/4 mx-auto font-medium rounded-lg text-sm px-4 py-2 text-center text-white bg-light-secondaryText hover:bg-blue-800  dark:bg-light-secondaryText dark:hover:bg-blue-700"
              onClick={() => dispatch(toggleDarkMode())}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              type="button"
              className="w-3/4 mx-auto font-medium rounded-lg text-sm px-4 py-2 text-center text-white bg-red-700 hover:bg-blue-800  dark:bg-red-700 dark:hover:bg-blue-700"
            >
              Sign Out
            </button>
          </div>
          <div className="w-full hidden md:flex mb-8 lg:hidden flex-col gap-8 order-2">
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
              onClick={() => dispatch(toggleDarkMode())}
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
          <ul className="w-full md:min-h-96 h-full flex md:flex-col items-center justify-between md:justify-start md:mt-20 lg:ml-24 md:gap-14 lg:gap-5 order-1 font-medium">
            <li className="w-full lg:flex items-center">
              <Link href="#" className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <p className="hidden lg:block text-2xl font-bold text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white">
                  Home
                </p>
              </Link>
            </li>
            <li className="w-full lg:flex items-center">
              <Link href="#" className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <p className="hidden lg:block text-2xl font-bold text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white">
                  Profile
                </p>
              </Link>
            </li>
            <li className="w-full lg:hidden items-center">
              <Link href="#" className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <p className="hidden lg:block text-2xl font-bold text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white">
                  Search
                </p>
              </Link>
            </li>
            <li className="w-full lg:flex items-center">
              <Link href="#" className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
                <p className="hidden lg:block text-2xl font-bold text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white">
                  Notifications
                </p>
              </Link>
            </li>
            <li className="w-full lg:flex items-center">
              <Link href="#" className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
                <p className="hidden lg:block text-2xl font-bold text-gray-900 hover:text-blue-700 dark:hover:text-blue-500 dark:text-white">
                  Chat
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
