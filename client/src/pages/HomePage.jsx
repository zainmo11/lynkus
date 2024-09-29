import CreatePost from "../components/CreatePost";

function HomePage() {
  return (
    <div className="w-full max-h-screen bg-light-background dark:bg-dark-background col-span-8 md:col-span-7 lg:col-span-4">
      <CreatePost />
      <div className="w-full border-t border-gray-600"></div>
    </div>
  );
}

export default HomePage;
