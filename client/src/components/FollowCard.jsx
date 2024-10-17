/* eslint-disable react/prop-types */
import Head from "./Head";
import { LinkIcon } from "@heroicons/react/24/outline";
import { DefaultButton } from "./Buttons";
import { Link } from "react-router-dom";
import { LinkSlashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function FollowCard({ name, username, profileImg, followed }) {
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    setFollowing(followed);
  }, [followed]);
  const toggleFollowing = () => {
    setFollowing(!following);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <Link to={`/user/${username}`}>
        <Head username={username} name={name} profileImg={profileImg} />
      </Link>

      <DefaultButton
        Icon={following ? LinkSlashIcon : LinkIcon}
        label={following ? "Unlink" : "Link"}
        onClick={() => {
          toggleFollowing();
        }}
      />
    </div>
  );
}

export default FollowCard;
