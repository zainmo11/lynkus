import { useSelector } from "react-redux";
import Post from "./Post";

function UserPostsTab() {
  const { loading, err, userPosts } = useSelector((state) => state.user);
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
      {userPosts.length == 0 && !loading ? (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          <p>You have no posts yet!</p>
        </div>
      ) : (
        <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
          {userPosts.map((x, i) => {
            return (
              <li
                key={i}
                className={`pt-6 px-6 ${x.showPost ? "block" : "hidden"}`}
              >
                <Post
                  username={x.username}
                  name={x.name}
                  profileImg={x.profileImg}
                  body={x.body}
                  postImg={x.postImg}
                  likes={x.likes}
                  commemts={x.comments}
                  showPost={x.showPost}
                  postLiked={x.postLiked}
                  index={i}
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
