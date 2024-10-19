import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function Error() {
  return (
    <div className="h-screen bg-light-background text-light-primaryText dark:bg-dark-background dark:text-dark-primaryText flex items-center justify-center text-center flex-col">
      <ExclamationTriangleIcon className="size-28 fill-light-primaryText dark:fill-dark-primaryText" />
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-5xl font-bold">Not Found</h2>
    </div>
  );
}
