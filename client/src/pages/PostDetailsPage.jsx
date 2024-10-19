/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { DefaultButton } from "../components/Buttons.jsx";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import api, { setAuthToken } from "../utils/axios";
import Cookies from "universal-cookie";
import LoadingPage from "./LoadingPage.jsx";

function PostDetailsPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [optionsOpen, setOptionsOpen] = useState(null);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    const currentUser = cookies.get("username");
    const token = cookies.get("token");

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                setAuthToken(token);
                const postResponse = await api.get(`/posts/${postId}`);
                setPost(postResponse.data);

                const commentsResponse = await api.get(`/comments/${postId}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching post or comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId, token, setComments]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newCommentData = {
                postId: postId,
                text: newComment,
            };
            try {
                setAuthToken(token);
                const response = await api.post(`/comments`, newCommentData);
                console.log("Comment added successfully:", response.data);
                setComments((prevComments) => [...prevComments, response.data]);
                setNewComment("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            setAuthToken(token);
            await api.delete(`/posts/${postId}/comments/${id}`);
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
            setOptionsOpen(null);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const toggleOptionsMenu = (id) => {
        setOptionsOpen((prev) => (prev === id ? null : id));
    };

    const optionsMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
                setOptionsOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) return <div
        className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
        <LoadingPage/>
    </div>;

    return (
        <div
            className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar pt-6 px-6 flex-1">
            {post ? (
                <Post
                    name={post.userName}
                    username={post.name}
                    profileImg={post.post.authorId.profileImg}
                    body={post.post.body}
                    postImg={post.post.image}
                    likes={post.likes}
                    postLiked={post.postLiked}
                    index={postId}
                    comments={post.comments}
                    userId={post.post.authorId._id}
                    currentUserId={currentUser}
                />
            ) : (
                <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
                <LoadingPage />
                </div>
            )}

            <div className="comments-section mt-8">
                <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-200 font-bold">
                    Comments ({comments.length})
                </h2>

                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="comment mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-light-primaryBackground dark:bg-dark-primaryBackground flex items-start relative"
                    >
                        <img
                            src={post.post.authorId.profileImg}
                            alt={`${comment.user}'s avatar`}
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-grow space-y-1">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{comment.userId.name}</p>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                <span className="text-primary-600 dark:text-primary-400">@{comment.userId.userName}</span>
                            </p>
                            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                {comment.text}
                            </p>
                        </div>

                        <div className="relative" ref={optionsMenuRef}>
                            <button
                                onClick={() => toggleOptionsMenu(comment.id)}
                                className="ml-4 text-gray-600"
                                aria-label="Options"
                            >
                                <EllipsisVerticalIcon className="w-5 h-5" />
                            </button>
                            {optionsOpen === comment.id && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                    <ul className="py-1">
                                        {comment.user === currentUser ? (
                                            <>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleDeleteComment(comment.id)}>Delete
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Modify</li>
                                            </>
                                        ) : (
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report & Delete</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <form onSubmit={handleCommentSubmit} className="add-comment-form mt-6 flex flex-col gap-4 mb-20">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Add a comment..."
                        required
                    ></textarea>
                    <div className="flex justify-end">
                        <DefaultButton type="submit" label="Post Comment" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostDetailsPage;
