import { Tabs } from "flowbite-react";
import FollowersTab from "./FollowersTab";
import FollowingsTab from "./FollowingsTab";
import UserPostsTab from "./UserPostsTab";
import UserLikesTab from "./UserLikesTab";
import { tabTheme } from "../utils/flowbiteThemes";

function ProfileNavTabs() {
  return (
    <div className="min-h-full my-[20px] bg-light-background dark:bg-dark-background rounded-[10px]">
      <Tabs
        theme={tabTheme}
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
