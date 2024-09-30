import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

function HomePage() {
  const posts = useSelector((state) => state.post.posts);

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background col-span-8 md:col-span-7 lg:col-span-4 overflow-y-auto">
      <CreatePost />
      <ul className="w-full  divide-y divide-gray-600 border-t border-gray-600">
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
