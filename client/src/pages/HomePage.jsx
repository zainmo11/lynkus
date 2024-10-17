import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect } from "react";
import { fetchUserDataFromCookies, recommendedUsers } from "../store/userSlice";
import { fetchPosts } from "../store/postSlice";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUserDataFromCookies());
    dispatch(fetchPosts());
    dispatch(recommendedUsers());
  }, [dispatch]);

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar">
      <CreatePost profileImg={user.profileImg} />
      <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-t border-light-secondaryText dark:border-dark-secondaryText">
        {posts.map((x, i) => {
          return (
            <li key={i} className="pt-6 px-6">
              <Post
                userId={x.authorId._id}
                name={x.authorId.name}
                username={x.authorId.userName}
                profileImg={x.authorId.profileImg}
                postId={x._id}
                body={x.body}
                postImg={x.image}
                likes={x.likes}
                commemts={x.comments}
                likedByUser={x.likedByUser}
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
