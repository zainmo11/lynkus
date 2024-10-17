import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect } from "react";
import { fetchUserDataFromCookies } from "../store/userSlice";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(fetchUserDataFromCookies());
  }, [dispatch]);

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar">
      <CreatePost />
      <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-t border-light-secondaryText dark:border-dark-secondaryText">
        {posts.map((x, i) => {
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
    </div>
  );
}

export default HomePage;
