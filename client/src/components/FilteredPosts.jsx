import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { fetchSearchResults } from "../store/searchSlice";
import { useNavigate } from "react-router-dom";
import PostDetailsPage from "../pages/PostDetailsPage";

export default function FilteredPosts() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.searchQuery);
  let posts = useSelector((state) => state.search.posts) || [];
  const loading = useSelector((state) => state.search.loading);
  const activeTab = useSelector((state) => state.search.activeTab);

  useEffect(() => {
    if (query && activeTab === "Posts") {
      dispatch(fetchSearchResults({ query, activeTab }));
    }
  }, [dispatch, query, activeTab]);


  return (
    <div className="filtered-posts px-3">
      {loading ? (
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      ) : !query ? (
        <p className="text-center text-gray-500 mt-4">
          Please enter a search query to find posts
        </p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={post._id}
            className="border-b-gray-300 border-b mt-5"
          >
            <Post
              username={post.authorId.userName}
              name={post.authorId.name}
              profileImg={post.authorId.profileImg}
              body={post.body}
              postImg={post.image}
              likes={post.likes || 0}
              comments={post.comments || 0}
              postLiked={post.postLiked || false}
              index={index}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No posts found</p>
      )}
    </div>
  );
}
