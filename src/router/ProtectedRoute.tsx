import useAuth from "@/hooks/useAuth";
import { User } from "@/types";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User["role"][];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
  }
  return children;
}
