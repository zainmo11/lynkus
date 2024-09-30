import { Link } from "react-router-dom";
import Head from "../components/Head";
import { useSelector } from "react-redux";

function Sidebar() {
  const users = useSelector((state) => state.user.users);

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background hidden lg:grid grid-rows-6 col-span-2 border-l border-gray-600">
      <div className="h-full row-span-1 mt-6 mx-6">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Need 4 Random users unique */}
      <div className="min-h-96 row-span-3 mt-4 mx-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Link Up With
        </h1>
        <div className="w-full flex flex-col justify-center items-center gap-5">
          {users.map((x, i) => {
            return (
              <div key={i} className="w-full flex justify-between items-center">
                <Head
                  username={x.username}
                  name={x.name}
                  profileImg={x.profileImg}
                />
                <Link
                  to={"/profile"}
                  className="bg-light-secondaryText pl-4 pr-5 py-2 flex justify-center items-center gap-2 rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  <p className=" text-white text-base font-semibold">Link</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {/* Need 5 Tags */}
      <div className="max-h-full row-span-2 mt-4 mx-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Trending Links
        </h1>
        <div className="max-h-full flex flex-col justify-between items-start gap-2 ml-3">
          <p className=" text-gray-900 dark:text-white">#OctopusHas3Hearts</p>
          <p className=" text-gray-900 dark:text-white">#BananasAreBerries</p>
          <p className=" text-gray-900 dark:text-white">#ElephantsSenseRain</p>
          <p className=" text-gray-900 dark:text-white">
            #HumansShareDNAWithBananas
          </p>
          <p className="text-gray-900 dark:text-white">#CatsHaveMoreBones</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
