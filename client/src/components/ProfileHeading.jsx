/* eslint-disable react/prop-types */
import Logo from "../assets/logo.png";
import { DefaultButton, ErrorButton, SecondaryButton } from "./Buttons";
import {
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Avatar } from "flowbite-react";

function ProfileHeading({ isOwnProfile, initiateDelModal, initiateEditModal }) {
  return (
    <div className="w-full min-h-[300px] md:min-h-[450px] pb-[30px] bg-light-secondaryBackground dark:bg-dark-secondaryBackground">
      {/* AVATAR AND HEADER */}
      <div className="w-full h-[140px] md:h-[310px]">
        {/* HEADER */}
        <div className="w-full h-[125px] md:h-[280px] bg-light-accent dark:bg-dark-accent">
          {/* <img
              alt="header-image"
              src={Logo}
              className="object-cover w-full h-full"
            /> */}
          {/* AVATAR */}
        </div>
        <div className="relative ">
          <div className="absolute z-30 left-1/2 transform -translate-x-1/2 -bottom-12 md:-bottom-16">
            <Avatar
              img={Logo}
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
          <div className="flex flex-col">
            <h2 className="font-bold text-3xl">Sam Guy</h2>
            <p className="text-light-secondaryText dark:text-dark-secondaryText">
              @samguy
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
          ) : (
            <div className="flex flex-col  gap-[10px] ">
              <DefaultButton label={"Link"} Icon={LinkIcon} />
              <SecondaryButton label={"Message"} />
            </div>
          )}
        </div>
        {/* BIO */}
        <p className="text-sm">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Congue lectus
          fermentum nisl accumsan ut fames amet justo.
        </p>
      </div>
    </div>
  );
}

export default ProfileHeading;
