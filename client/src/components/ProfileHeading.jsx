/* eslint-disable react/prop-types */
import { DefaultButton, ErrorButton } from "./Buttons";
import {
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Avatar } from "flowbite-react";
import { capitalizeName } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../store/userSlice";

function ProfileHeading({
  isOwnProfile,
  initiateDelModal,
  initiateEditModal,
  userData,
  loading,
}) {
  const dispatch = useDispatch();

  return (
    <div className="w-full min-h-[300px] md:min-h-[450px] pb-[30px] bg-light-secondaryBackground dark:bg-dark-secondaryBackground">
      {/* AVATAR AND HEADER */}
      <div className="w-full h-[140px] md:h-[310px]">
        {/* HEADER */}
        <div className="w-full h-[125px] md:h-[280px] bg-light-accent dark:bg-dark-accent">
          <img
            alt="header-image"
            src={`${
              userData.headerImg
                ? userData.headerImg
                : "https://placeholder.pics/svg/700/DEDEDE/DEDEDE/"
            }`}
            className="object-cover w-full h-full"
          />

          {/* AVATAR */}
        </div>
        <div className="relative ">
          <div className="absolute z-30 left-1/2 transform -translate-x-1/2 -bottom-12 md:-bottom-16">
            <Avatar
              img={`${
                userData.profileImg
                  ? userData.profileImg
                  : "https://avatar.iran.liara.run/username?username=Lynkus&background=008080&color=F0F8FF&length=1"
              }`}
              alt="user-avatar"
              rounded
              className="object-cover size-[90px] md:size-[150px] rounded-full border-4 border-light-accent dark:border-dark-accent"
            />
          </div>
        </div>
      </div>
      {/* USER INFO AND ACTIONS */}
      <div className=" flex flex-col gap-[30px] mx-[50px]">
        <div className="flex justify-between items-center">
          {/* NAME AND USERNAME*/}
          <div className="flex flex-col w-2/5">
            <h2 className="font-bold text-2xl xl:text-3xl">
              {capitalizeName(userData.name)}
            </h2>
            <p className="text-light-secondaryText dark:text-dark-secondaryText">
              @{userData.userName}
            </p>
          </div>
          {/* ACTIONS */}
          {isOwnProfile ? (
            <div className="flex flex-col  gap-[10px] ">
              <DefaultButton
                label="Edit Profile"
                Icon={PencilSquareIcon}
                onClick={initiateEditModal}
              />
              <ErrorButton
                label="Delete Profile"
                Icon={TrashIcon}
                onClick={initiateDelModal}
              />
            </div>
          ) : loading ? (
            <div className="w-full h-full flex items-center justify-center md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText opacity-80">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col  gap-[10px] ">
              <DefaultButton
                label={"Link"}
                Icon={LinkIcon}
                onClick={() => {
                  dispatch(toggleFollow(userData.id));
                }}
              />
              {/* <SecondaryButton label={"Message"} /> */}
            </div>
          )}
        </div>
        {/* BIO */}
        <p className="text-sm">{userData.bio}</p>
      </div>
    </div>
  );
}

export default ProfileHeading;
