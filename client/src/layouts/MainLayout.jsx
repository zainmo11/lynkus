import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 max-w-screen-2xl min-h-screen mx-auto">
      <Navbar />
      <Outlet />
      <Sidebar />
    </div>
  );
}

export default Layout;
