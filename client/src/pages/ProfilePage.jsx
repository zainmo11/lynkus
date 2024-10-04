import { useParams } from "react-router-dom";
import ProfileHeading from "../components/ProfileHeading";
import ProfileNavTabs from "../components/ProfileNavTabs";
import { useSelector } from "react-redux";
import { useState } from "react";
import DeleteProfileModal from "../components/DeleteProfileModal";
import EditProfileModal from "../components/EditProfileModal";
function ProfilePage() {
  const username = useParams();
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const userPosts = useSelector((state) => state.post.userPosts);
  const likedPosts = useSelector((state) => state.post.likedPosts);
  const users = useSelector((state) => state.user.users);
  const [deleteModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
      {/* HEADING */}
      <ProfileHeading
        isOwnProfile={isOwnProfile}
        initiateDelModal={() => {
          setDelModal(true);
        }}
        initiateEditModal={() => {
          setEditModal(true);
        }}
      />
      {/* NAV TABS */}
      <ProfileNavTabs
        userPosts={userPosts}
        likedPosts={likedPosts}
        users={users}
      />
      {/* Edit Modal */}
      {editModal && (
        <EditProfileModal
          openModal={editModal}
          setOpenModal={setEditModal}
          editFunction={() => {}}
        />
      )}
      {/* Delete Modal */}
      {deleteModal && (
        <DeleteProfileModal
          openModal={deleteModal}
          setOpenModal={setDelModal}
          delFunction={() => {}}
        />
      )}
    </div>
  );
}

export default ProfilePage;
