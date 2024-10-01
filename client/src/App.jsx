import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
