/* eslint-disable react/prop-types */
import { ChatBubbleOvalLeftIcon, LinkIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

function NotificationItem({ type, from, read, toggleRead }) {
  return (
    <div
      className={`w-full flex justify-start items-center px-[30px] py-[25px] gap-[15px] border-t border-light-secondaryText dark:border-dark-secondaryText cursor-pointer ${
        !read
          ? "bg-light-secondaryBackground dark:bg-dark-secondaryBackground"
          : ""
      }`}
      onClick={toggleRead}
    >
      {type == "follow" ? (
        <LinkIcon className="size-[24px] xl:size-5  text-button-default" />
      ) : type == "like" ? (
        <HeartIcon className="size-[24px] xl:size-5  text-button-default" />
      ) : (
        <ChatBubbleOvalLeftIcon className="size-[24px] xl:size-5  text-button-default" />
      )}

      <p className="text-[20px] md:text[24px]">
        <span className="font-bold text-light-secondaryText dark:text-dark-secondaryText">
          @{from}
        </span>{" "}
        {type == "follow"
          ? "has linked with you!"
          : type == "like"
          ? "has liked your post!"
          : "has commented on your post!"}
      </p>
    </div>
  );
}

export default NotificationItem;
