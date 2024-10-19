import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect } from "react";
import { fetchUserDataFromCookies } from "../store/userSlice";
import { fetchPosts } from "../store/postSlice";
import { formatImageUrl } from "../utils/helpers";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const { authUserData } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("AUTH USER:");
    console.log(authUserData.name);
    console.log(authUserData.userName);
    console.log(authUserData.profileImg);
    // console.log(authUserData.name);
    dispatch(fetchUserDataFromCookies());
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="w-full max-h-screen mt-10 mb-20 md:m-0 bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar">
      <CreatePost
        profileImg={formatImageUrl(
          authUserData.profileImg
            ? authUserData?.profileImg
            : authUserData.data?.profileImg
        )}
      />
      <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-t border-light-secondaryText dark:border-dark-secondaryText">
        {posts.map((x, i) => {
          return (
            <li key={i} className="pt-6 px-6">
              <Post
                name={x.authorId?.name}
                username={x.authorId?.userName}
                profileImg={x.authorId?.profileImg}
                postId={x?._id}
                body={x?.body}
                postImg={x?.image}
                likes={x?.likes}
                commemts={x?.comments}
                likedByUser={x?.likedByUser}
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
