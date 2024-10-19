/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import ProfileHeading from "../components/ProfileHeading";
import ProfileNavTabs from "../components/ProfileNavTabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteProfileModal from "../components/DeleteProfileModal";
import EditProfileModal from "../components/EditProfileModal";
import {
  checkOwnProfile,
  clearUserData,
  fetchUserData,
  getUserData,
  // getUserFollowers,
  // getUserFollowings,
  // getUserLikedPosts,
  // getUserPosts,
} from "../store/userSlice";
import LoadingPage from "./LoadingPage";
import AlertComponent from "../components/AlertComponent";
import { toggleAlert } from "../store/appSlice";
function ProfilePage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  console.log(username);

  const {
    userData,
    authUserData,
    isOwnProfile,
    loading,
    followLoading,
    err,
    userLikedPosts,
    userFollowers,
    userFollowings,
    userPosts,
  } = useSelector((state) => state.user);
  const { showAlert } = useSelector((state) => state.app);
  const [deleteModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(checkOwnProfile(username));

    console.log("IS IOWNER: " + isOwnProfile);
  }, [isOwnProfile, username]);
  // const isOwnProfile = username ===

  useEffect(() => {
    const fetchProfileData = async () => {
      dispatch(clearUserData());
      console.log("CLEARED USER DATA");
      if (username) {
        const resultAction = await dispatch(getUserData(username));
        if (getUserData.fulfilled.match(resultAction)) {
          console.log("GET USER DATA, ", username);

          const userId = isOwnProfile
            ? resultAction.payload?.id || resultAction.payload.data?.id
            : resultAction.payload.data?.id;
          if (userId) {
            console.log("GET USER ID, ", userId);
            dispatch(fetchUserData(userId));
          }
        }
      }
    };
    fetchProfileData();
  }, [dispatch, username]);

  // useEffect(() => {
  //   dispatch(getUserData(username)).then(() => {
  //     if (isOwnProfile) {
  //       console.log("AUTH USER PROFILE");
  //       // console.log("USER NAME: " + authUserId);
  //       // console.log("USER NAME: " + authUserData.userName);
  //       // console.log("USER DATA: " + authUserData);

  //       dispatch(
  //         getUserFollowers(
  //           authUserData?.data?.id ? authUserData?.data?.id : authUserData?.id
  //         )
  //       );
  //       dispatch(
  //         getUserFollowings(
  //           authUserData?.data?.id ? authUserData.data?.id : authUserData?.id
  //         )
  //       );
  //       dispatch(
  //         getUserPosts(
  //           authUserData?.data?.id ? authUserData?.data?.id : authUserData?.id
  //         )
  //       );
  //       dispatch(
  //         getUserLikedPosts(
  //           authUserData?.data?.id ? authUserData.data?.id : authUserData?.id
  //         )
  //       );
  //     } else {
  //       console.log("NOT AUTH USER PROFILE");
  //       console.log("USER ID: " + userData.data?.id);
  //       // console.log("USER NAME: " + userData.userName);
  //       // console.log("USER DATA: " + userData);
  //       dispatch(getUserFollowers(userData.data?.id));
  //       dispatch(getUserFollowings(userData.data?.id));
  //       dispatch(getUserPosts(userData.data?.id));
  //       dispatch(getUserLikedPosts(userData.data?.id));
  //     }
  //   });
  // }, [isOwnProfile, username]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(toggleAlert());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, showAlert]);

  if (
    (loading ||
      (!userData && !authUserData) ||
      !userPosts ||
      !userFollowers ||
      !userFollowings ||
      !userLikedPosts) &&
    !err
  ) {
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

  const profileData = isOwnProfile ? authUserData : userData;

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
        userData={profileData}
        loading={loading}
        followLoading={followLoading}
      />
      {/* NAV TABS */}
      {/* TODO: MAKE IT DYNAMIC */}
      <ProfileNavTabs
        userId={profileData?.id}
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
