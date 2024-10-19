import { useSelector } from "react-redux";
import Post from "./Post";
import { useEffect } from "react";
import { capitalizeName } from "../utils/helpers";

function UserPostsTab() {
  const { userPosts } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("USER POSTS TAB: ");
    console.log(userPosts[0]);
  }, []);
  return (
    <>
      {userPosts?.length == 0 || userPosts.posts?.length == 0 ? (
        <div className="w-full h-20 flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          <p>You have no posts yet!</p>
        </div>
      ) : (
        <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
          {userPosts.map((x, i) => {
            return (
              <li key={i} className={`pt-6 px-6 `}>
                <Post
                  username={x.authorId.userName}
                  name={capitalizeName(x.authorId.name)}
                  profileImg={x.authorId.profileImg}
                  body={x.body}
                  postImg={x.image}
                  likes={x.likesCount || "0"}
                  commemts={x.commentsCount || "0"}
                  likedByUser={x.likedByUser}
                  postId={x._id}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default UserPostsTab;
