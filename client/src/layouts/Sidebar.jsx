import { useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FollowCard from "../components/FollowCard";

function Sidebar() {
  const users = useSelector((state) => state.user.users);

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background hidden lg:grid grid-rows-6 col-span-2 border-l border-light-secondaryText dark:border-dark-secondaryText">
      {/* Need 4 Random users unique */}
      <div className="min-h-screen pt-6 px-4">
        <h1 className="text-3xl font-bold mb-8 text-light-primaryText dark:text-dark-primaryText">
          Link Up With
        </h1>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          {users.map((x, i) => {
            return (
              <FollowCard
                key={i}
                username={x.username}
                name={x.name}
                profileImg={x.profileImg}
              />
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
