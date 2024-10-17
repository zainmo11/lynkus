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
  const [deleteModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const userId = userData.id; //TODO: MAKE IT DYNAMIC
  const isOwnProfile = username === userData.userName;

  useEffect(() => {
    dispatch(getUserData(username));
    dispatch(getUserFollowers(userId));
    dispatch(getUserFollowings(userId));
    dispatch(getUserPosts(userId));
    dispatch(getUserLikedPosts(userId));
  }, [dispatch, username]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText opacity-80">
        Loading...
      </div>
    );
  }

  // if (err) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText opacity-80">
  //       Error: {err}
  //     </div>
  //   );
  // }

  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
      {/* HEADING */}
      <ProfileHeading
        isOwnProfile={isOwnProfile}
        initiateDelModal={() => {
          setDelModal(true);
          console.log("INITIATE DEL MODAL");
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
