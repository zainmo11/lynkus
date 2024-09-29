function Head() {
  return (
    <div className="flex items-center justify-start gap-2">
      <img
        src="logo.png"
        className="h-14 rounded-full object-cover"
        alt="Logo"
      />
      <div className="flex flex-col">
        <p className="text-black font-semibold dark:text-white">First Loser</p>
        <p className="text-gray-500 font-medium dark:text-gray-400">
          @why did i lose
        </p>
      </div>
    </div>
  );
}

export default Head;
