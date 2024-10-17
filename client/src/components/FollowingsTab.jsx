import { useSelector } from "react-redux";
import FollowCard from "./FollowCard";
import { capitalizeName } from "../utils/helpers";

function FollowingsTab() {
  const { userFollowings } = useSelector((state) => state.user);
  return (
    <>
      {userFollowings.length == 0 ? (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          <p>You have no followings yet!</p>
        </div>
      ) : (
        <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
          {userFollowings.map((x, i) => {
            return (
              <li key={i} className={`p-6 `}>
                <FollowCard
                  key={i}
                  username={x.userName}
                  name={capitalizeName(x.name)}
                  profileImg={x.profileImg}
                  followed={true}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default FollowingsTab;
