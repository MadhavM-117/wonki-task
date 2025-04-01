import { Routes, Route } from "react-router";
import { Home } from "@/routes/home/route";
import { Login } from "@/routes/login/route";
import { UserHome } from "@/routes/home.user/route";
import { AuthLayout } from "@/components/custom/auth-layout";
import { Signup } from "@/routes/signup/route";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserHome />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};
