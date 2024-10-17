import React from "react";
import SearchNavTabs from "../components/SearchNavTabs"; // Import the SearchNavTabs component
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Import the search icon
import { fetchSearchResults, setSearchQuery } from "../store/searchSlice"; // Import the actions for fetching search results and setting the query
import { useDispatch, useSelector } from "react-redux"; // Import hooks for dispatching actions and selecting state

const SearchPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch to trigger actions
  const query = useSelector((state) => state.search.searchQuery); // Select the current search query from the Redux store
  const activeTab = useSelector((state) => state.search.activeTab); // Select the current active tab from the Redux store

  // Handle search input change
  const handleSearch = (e) => {
    const newQuery = e.target.value; // Get the new query from the input
    dispatch(setSearchQuery(newQuery)); // Dispatch action to update the query in the store
    dispatch(fetchSearchResults({ query: newQuery, activeTab })); // Fetch search results based on the new query and active tab
  };

  return (
    <>
      {/* Container for the search page */}
      <div className="w-full max-h-screen bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
        {/* Page heading */}
        <h1 className="text-3xl font-bold mx-[30px] my-[25px] mb-[25px] text-light-primaryText dark:text-dark-primaryText">
          Search
        </h1>

        {/* Search input container */}
        <div className="relative mx-8">
          {/* Search icon inside input field */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="size-5" />
          </div>

          {/* Search input field */}
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-light-primaryText border-0 border-gray-300 rounded-lg bg-light-secondaryBackground focus:ring-light-secondaryText dark:bg-dark-secondaryBackground dark:placeholder-dark-secondaryText dark:text-dark-primaryText dark:focus:ring-dark-secondaryText"
            placeholder="Search..."
            onChange={handleSearch} // Update query and fetch results on input change
            value={query} // Bind input value to the search query from the Redux store
          />
        </div>

        {/* Component that renders navigation tabs for different search categories */}
        <SearchNavTabs />
      </div>
    </>
  );
};

export default SearchPage;
