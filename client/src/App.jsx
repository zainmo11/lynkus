import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./store/themeSlice";
import Welcome from "./pages/Welcome";
import Loading from "./components/Loading";
import Error from "./pages/Error";
import NotificationsPage from "./pages/NotificationsPage";
import usePeriodicFetch from "./hooks/usePeriodicFetch";
import { getAllNotifications } from "./store/notificationSlice";

function App() {
  const dispatch = useDispatch();

  //Fetch notifications globally
  usePeriodicFetch(() => dispatch(getAllNotifications()), 300000);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      dispatch(setTheme(storedTheme));
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      dispatch(setTheme(systemTheme ? "dark" : "light"));
      document.documentElement.classList.toggle("dark", systemTheme);
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Welcome />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/notfication" element={<NotificationsPage />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
