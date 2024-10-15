import React from "react";

export default function Error() {
  return (
    <div className="h-screen bg-light-background text-light-primaryText dark:bg-dark-background dark:text-dark-primaryText flex items-center justify-center text-center flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
      <h1 className="text-8xl">404</h1>
      <h2 className="text-4xl">Not Found</h2>
    </div>
  );
}
