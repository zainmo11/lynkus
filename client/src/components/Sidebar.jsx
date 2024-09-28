import Head from "./Head";

function Sidebar() {
  return (
    <div className="hidden lg:grid grid-rows-4 col-span-2 bg-gray-600">
      <div className="row-span-1">
      <div className="relative hidden md:block">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
    </div>
      </div>
      <div className="row-span-2 flex justify-between items-center mt-4 mx-4">
      <Head/>
        <button className="bg-light-secondaryText px-6 py-2 font-medium rounded-lg text-center text-white">Link</button>
      </div>
      <div className="row-span-1">Bottom</div>
    </div>
  );
}

export default Sidebar;
