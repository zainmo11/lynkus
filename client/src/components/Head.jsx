/* eslint-disable react/prop-types */
function Head({ username, name, profileImg }) {
  return (
    <div className="flex items-center justify-start gap-2">
      <img
        src={profileImg}
        className="h-14 rounded-full object-cover"
        alt="Logo"
      />
      <div className="flex flex-col">
        <p className="text-light-primaryText font-semibold dark:text-dark-primaryText line-clamp-1">
          {username}
        </p>
        <p className="text-light-secondaryText font-medium dark:text-dark-secondaryText line-clamp-1">
          {name}
        </p>
      </div>
    </div>
  );
}

export default Head;
