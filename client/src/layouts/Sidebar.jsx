import Head from "../components/Head";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Sidebar() {
  const users = useSelector((state) => state.user.users);

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background hidden lg:grid grid-rows-6 col-span-2 border-l border-light-secondaryText dark:border-dark-secondaryText">
      <div className="h-full row-span-1 pt-6 px-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="size-5  fill-light-secondaryText dark:fill-dark-secondaryText" />
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-light-primaryText border-0 border-gray-300 rounded-lg bg-light-secondaryBackground  focus:ring-light-secondaryText dark:bg-dark-secondaryBackground dark:placeholder-dark-secondaryText dark:text-dark-primaryText dark:focus:ring-dark-secondaryText"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Need 4 Random users unique */}
      <div className="min-h-96 row-span-3 pt-4 px-4">
        <h1 className="text-3xl font-bold mb-8 text-light-primaryText dark:text-dark-primaryText">
          Link Up With
        </h1>
        <div className="w-full flex flex-col justify-center items-center gap-8">
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
                  className="bg-button-default hover:bg-button-hover pl-4 pr-5 py-2 flex justify-center items-center gap-2 rounded-xl"
                >
                  <LinkIcon className="size-4 text-dark-primaryText" />
                  <p className="text-dark-primaryText text-base font-semibold">
                    Link
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {/* Hash Tag Section */}
      {/* <div className="max-h-full row-span-2 pt-14 px-4">
        <h1 className="text-3xl font-bold mb-4 text-light-primaryText dark:text-dark-primaryText">
          Trending Links
        </h1>
        <div className="max-h-full flex flex-col justify-between items-start gap-2 ml-3">
          <p className="text-light-primaryText dark:text-dark-primaryText">
            #BananasAreBerries
          </p>
          <p className="text-light-primaryText dark:text-dark-primaryText">
            #ElephantsSenseRain
          </p>
          <p className="text-light-primaryText dark:text-dark-primaryText">
            #HumansShareDNAWithBananas
          </p>
          <p className="text-light-primaryText dark:text-dark-primaryText">
            #CatsHaveMoreBones
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
