import React from "react";

import { Flowbite, Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Spinner color="purple" aria-label="Purple spinner example" />
    </div>
  );
}
