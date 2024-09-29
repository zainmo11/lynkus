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
        <p className="text-black font-semibold dark:text-white">{username}</p>
        <p className="text-gray-500 font-medium dark:text-gray-400">{name}</p>
      </div>
    </div>
  );
}

export default Head;
