import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { fetchSearchResults } from "../store/searchSlice";

export default function FilteredPosts() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.searchQuery);
  let posts = useSelector((state) => state.search.posts) || [];
  const loading = useSelector((state) => state.search.loading);
  const activeTab = useSelector((state) => state.search.activeTab);

  if (!Array.isArray(posts)) {
    posts = [posts];
  }

  useEffect(() => {
    // Dispatch fetchSearchResults whenever the component mounts or query/activeTab changes
    dispatch(fetchSearchResults({ query, activeTab }));
  }, [dispatch, query, activeTab]);

  return (
    <div className="filtered-posts p-3">
      {loading ? (
        // Display loading spinner when data is being fetched
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      ) : !query ? (
        // Message when no query is entered
        <p className="text-center text-gray-500 mt-4">
          Please enter a search query to find posts
        </p>
      ) : posts.length > 0 ? (
        // Display post cards when there are matching posts
        posts.map((post, index) => (
          <Post
            key={index}
            username={post.username}
            name={post.name}
            profileImg={post.profileImg}
            body={post.body}
            postImg={post.postImg}
            likes={post.likes}
            commemts={post.commemts}
            postLiked={post.postLiked}
            index={index}
          />
        ))
      ) : (
        // Message when no posts match the query
        <p className="text-center text-gray-500 mt-4">No posts found</p>
      )}
    </div>
  );
}
