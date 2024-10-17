import { useParams } from "react-router-dom";
import ProfileHeading from "../components/ProfileHeading";
import ProfileNavTabs from "../components/ProfileNavTabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteProfileModal from "../components/DeleteProfileModal";
import EditProfileModal from "../components/EditProfileModal";
import {
  getUserData,
  getUserFollowers,
  getUserFollowings,
  getUserLikedPosts,
  getUserPosts,
} from "../store/userSlice";
import LoadingPage from "./LoadingPage";
import AlertComponent from "../components/AlertComponent";
import { toggleAlert } from "../store/appSlice";
function ProfilePage() {
  const dispatch = useDispatch();
  const { username } = useParams();

  // const [isOwnProfile, setIsOwnProfile] = useState(username === "@samguy");
  console.log(username);

  const {
    userData,
    loading,
    err,
    userLikedPosts,
    userFollowers,
    userFollowings,
    userPosts,
  } = useSelector((state) => state.user);
  const { showAlert } = useSelector((state) => state.app);
  const [deleteModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const userId = userData.id;
  const isOwnProfile = username === userData.userName;

  useEffect(() => {
    dispatch(getUserData(username));
    dispatch(getUserFollowers(userId));
    dispatch(getUserFollowings(userId));
    dispatch(getUserPosts(userId));
    dispatch(getUserLikedPosts(userId));
  }, [dispatch, userId, username]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(toggleAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, showAlert]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText opacity-80">
        <LoadingPage />
      </div>
    );
  }

  if (err) {
    return (
      <div className="w-full h-full flex items-center justify-center md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText opacity-80">
        Error: {err}
      </div>
    );
  }

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
      {showAlert && (
        <AlertComponent
          type="Success!"
          content="Your profile has been successfully updated!"
          toggleFunction={() => {
            dispatch(toggleAlert());
          }}
        />
      )}
      {/* HEADING */}
      <ProfileHeading
        isOwnProfile={isOwnProfile}
        initiateDelModal={() => {
          setDelModal(true);
        }}
        initiateEditModal={() => {
          setEditModal(true);
        }}
        userData={userData}
        loading={loading}
      />
      {/* NAV TABS */}
      {/* TODO: MAKE IT DYNAMIC */}
      <ProfileNavTabs
        userId={userId}
        loading={loading}
        err={err}
        userFollowers={userFollowers}
        userFollowings={userFollowings}
        userPosts={userPosts}
        userLikedPosts={userLikedPosts}
      />
      {/* Edit Modal */}
      {editModal && (
        <EditProfileModal openModal={editModal} setOpenModal={setEditModal} />
      )}
      {/* Delete Modal */}
      {deleteModal && (
        <DeleteProfileModal
          openModal={deleteModal}
          setOpenModal={setDelModal}
        />
      )}
    </div>
  );
}

export default ProfilePage;
