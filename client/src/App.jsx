import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./store/themeSlice";
import PostDetailsPage from "./pages/PostDetailsPage.jsx";

function App() {
  const dispatch = useDispatch();

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
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/post/:postId" element={<PostDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
