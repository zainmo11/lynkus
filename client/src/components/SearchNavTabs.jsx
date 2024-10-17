import React, { useEffect } from "react";
import { Tabs } from "flowbite-react"; // Import Tabs component from Flowbite for UI navigation
import { setActiveTab } from "../store/searchSlice"; // Import action to set the active tab
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks to dispatch actions and select state
import FilteredUsers from "../components/FilteredUsers"; // Import the component to display filtered users
import FilteredPosts from "./FilteredPosts"; // Import the component to display filtered posts

// Custom theme for the Tabs component, defining styling for various states (active/inactive)
const customTheme = {
  base: "flex flex-col",
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

export default function SearchNavTabs() {
  const dispatch = useDispatch(); // Initialize dispatch to trigger actions
  const activeTab = useSelector((state) => state.search.activeTab); // Select the current active tab from the Redux store

  // useEffect to set the active tab when the component mounts or when the active tab changes
  useEffect(() => {
    dispatch(setActiveTab(activeTab)); // Dispatch action to set the active tab in the Redux store
  }, [activeTab, dispatch]);

  // Function to handle tab changes
  const changeTab = (newTab) => {
    dispatch(setActiveTab(newTab)); // Dispatch the action to change the active tab
  };

  return (
    <div className="min-h-full mt-[20px] bg-light-background dark:bg-dark-background rounded-[10px]">
      {/* Tabs component with custom theme */}
      <Tabs
        theme={customTheme} // Apply custom styling
        aria-label="Full width tabs" // Accessibility label for the Tabs component
        variant="fullWidth" // Full-width variant for the tabs
        className="w-full" // Set width to full
      >
        {/* Tab for Posts */}
        <Tabs.Item
          onClick={() => changeTab("")} // Switch to 'Posts' tab on click
          active={activeTab === ""} // Set active when current tab is 'Posts'
          title="Posts" // Tab title
        >
          <FilteredPosts />{" "}
          {/* Render filtered posts component when tab is active */}
        </Tabs.Item>

        {/* Tab for Users */}
        <Tabs.Item
          onClick={() => changeTab("")} // Switch to 'Users' tab on click
          active={activeTab === "Users"} // Set active when current tab is 'Users'
          title="Users" // Tab title
        >
          <FilteredUsers />{" "}
          {/* Render filtered users component when tab is active */}
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
