import { useSelector } from "react-redux";
import { capitalizeName } from "../utils/helpers";
import FollowCard from "./FollowCard";

function FollowersTab() {
  const { loading, err, userFollowers } = useSelector((state) => state.user);
  return (
    <>
      {loading && (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          Loading...
        </div>
      )}
      {/* {err && (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          Error: {err}
        </div>
      )} */}
      {userFollowers.length == 0 && !loading && !err ? (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          <p>You have no followers yet!</p>
        </div>
      ) : (
        <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
          {userFollowers.map((x, i) => {
            return (
              <li key={i} className={`p-6 `}>
                <FollowCard
                  key={i}
                  username={x.username}
                  name={capitalizeName(x.name)}
                  profileImg={x.profileImg}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default FollowersTab;
