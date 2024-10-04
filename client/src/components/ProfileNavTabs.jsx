/* eslint-disable react/prop-types */
import { Tabs } from "flowbite-react";
import Post from "./Post";
import FollowCard from "./FollowCard";

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

function ProfileNavTabs({ userPosts, likedPosts, users }) {
  return (
    <div className="min-h-full my-[20px] bg-light-background dark:bg-dark-background rounded-[10px]">
      <Tabs
        theme={customTheme}
        aria-label="Full width tabs"
        variant="fullWidth"
        className="w-full "
      >
        <Tabs.Item
          title="Followers"
          className="bg-light-accent rounded-xl"
          color="error"
        >
          <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
            {users.map((x, i) => {
              return (
                <li key={i} className={`p-6 `}>
                  <FollowCard
                    key={i}
                    username={x.username}
                    name={x.name}
                    profileImg={x.profileImg}
                  />
                </li>
              );
            })}
          </ul>
        </Tabs.Item>
        <Tabs.Item title="Follwings">
          <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
            {users.map((x, i) => {
              return (
                <li key={i} className={`p-6 `}>
                  <FollowCard
                    key={i}
                    username={x.username}
                    name={x.name}
                    profileImg={x.profileImg}
                    followed={true}
                  />
                </li>
              );
            })}
          </ul>
        </Tabs.Item>
        <Tabs.Item active title="Posts">
          <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
            {userPosts.map((x, i) => {
              return (
                <li
                  key={i}
                  className={`pt-6 px-6 ${x.showPost ? "block" : "hidden"}`}
                >
                  <Post
                    username={x.username}
                    name={x.name}
                    profileImg={x.profileImg}
                    body={x.body}
                    postImg={x.postImg}
                    likes={x.likes}
                    commemts={x.comments}
                    showPost={x.showPost}
                    postLiked={x.postLiked}
                    index={i}
                  />
                </li>
              );
            })}
          </ul>
        </Tabs.Item>
        <Tabs.Item title="Likes">
          <ul className="w-full divide-y divide-light-secondaryText dark:divide-dark-secondaryText border-light-secondaryText dark:border-dark-secondaryText">
            {likedPosts.map((x, i) => {
              return (
                <li
                  key={i}
                  className={`pt-6 px-6 ${x.showPost ? "block" : "hidden"}`}
                >
                  <Post
                    username={x.username}
                    name={x.name}
                    profileImg={x.profileImg}
                    body={x.body}
                    postImg={x.postImg}
                    likes={x.likes}
                    commemts={x.comments}
                    showPost={x.showPost}
                    postLiked={x.postLiked}
                    index={i}
                  />
                </li>
              );
            })}
          </ul>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default ProfileNavTabs;
