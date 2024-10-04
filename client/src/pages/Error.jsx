import React from "react";

export default function Error() {
  return (
    <div className="h-screen bg-light-background text-light-primaryText dark:bg-dark-background dark:text-dark-primaryText text-center flex items-center justify-center">
      <div className="error">
        <i className="fa-solid fa-triangle-exclamation"></i>
        <h1 className="text-8xl">404</h1>
        <h2 className="text-4xl">Not Found</h2>
      </div>
    </div>
  );
}
