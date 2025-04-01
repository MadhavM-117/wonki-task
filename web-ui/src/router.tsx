import { Routes, Route } from "react-router";
import { Home } from "./routes/home/route";
import { Login } from "./routes/login/route";
import { UserHome } from "./routes/home.user/route";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserHome />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
