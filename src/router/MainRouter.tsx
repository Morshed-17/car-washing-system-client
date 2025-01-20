import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";

import NotFoundPage from "@/pages/NotFoundPage";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import ManageSlots from "@/pages/dashboard/ManageSlots";
import ManageUesrs from "@/pages/dashboard/ManageUesrs";
import { ManageServices } from "@/pages/dashboard/ManageServices";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Booking from "@/pages/Booking";


import Dashboard from "@/pages/dashboard/Dashboard";
import ManageBookings from "@/pages/dashboard/ManageBookings";
import UserDashboard from "@/layouts/UserDashboard";
import Reviews from "@/pages/Review";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Booking />
            </ProtectedRoute>
          }
        />
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
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="slots" element={<ManageSlots />} />
        <Route path="users" element={<ManageUesrs />} />
      </Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      ></Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRouter;
