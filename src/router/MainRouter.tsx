import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import ManageSlots from "@/pages/dashboard/ManageSlots";
import ManageUesrs from "@/pages/dashboard/ManageUesrs";
import { ManageServices } from "@/pages/dashboard/ManageServices";
import Services from "@/pages/Services";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="slots" element={<ManageSlots />} />
        <Route path="users" element={<ManageUesrs />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRouter;
