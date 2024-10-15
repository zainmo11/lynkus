/* eslint-disable react/prop-types */
import { Tabs } from "flowbite-react";
import { useSelector } from "react-redux";
import FollowersTab from "./FollowersTab";
import FollowingsTab from "./FollowingsTab";
import UserPostsTab from "./UserPostsTab";
import UserLikesTab from "./UserLikesTab";

const customTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    variant: {
      fullWidth:
        "grid w-full grid-flow-col divide-x divide-light-secondaryText text-xl text-light-primaryText font-medium shadow dark:divide-dark-secondaryText dark:text-dark-primaryText ",
    },
    tabitem: {
      base: " flex items-center justify-center p-4 text-sm font-medium first:ml-0 first:rounded-tl-[10px] last:rounded-tr-[10px]",
      variant: {
        fullWidth: {
          active: {
            on: "active bg-light-background text-xl font-bold p-4 text-light-secondaryText dark:bg-dark-background dark:text-dark-secondaryText ",
            off: "bg-light-secondaryBackground text-light-primaryText hover:bg-light-accent dark:bg-dark-secondaryBackground dark:hover:bg-dark-accent dark:text-dark-primaryText",
          },
        },
      },
    },
  },
};

function ProfileNavTabs() {
  const { loading, err } = useSelector((state) => state.user);

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
    <div className="min-h-full my-[20px] bg-light-background dark:bg-dark-background rounded-[10px]">
      <Tabs
        theme={customTheme}
        aria-label="Full width tabs"
        variant="fullWidth"
        className="w-full "
      >
        <Tabs.Item title="Followers">
          <FollowersTab />
        </Tabs.Item>
        <Tabs.Item title="Follwings">
          <FollowingsTab />
        </Tabs.Item>
        <Tabs.Item active title="Posts">
          <UserPostsTab />
        </Tabs.Item>
        <Tabs.Item title="Likes">
          <UserLikesTab />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default ProfileNavTabs;
