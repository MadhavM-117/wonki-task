import { Routes, Route } from "react-router";
import { Home } from "@/routes/home/route";
import { Login } from "@/routes/login/route";
import { UserHome } from "@/routes/user/route";
import { AuthLayout } from "@/components/custom/auth-layout";
import { Signup } from "@/routes/signup/route";
import { SidebarLayout } from "@/components/custom/sidebar-layout";
import { Dashboard } from "@/routes/dashboard/route";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};
