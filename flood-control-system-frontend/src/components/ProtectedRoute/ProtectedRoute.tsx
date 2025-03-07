import { useStore } from "@nanostores/react";
import { ReactNode } from "react";
import { Navigate } from "react-router";
import { $auth } from "src/stores/auth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useStore($auth);
  const tokenLocalStorage = localStorage.getItem("accessToken");

  if (!accessToken) {
    if (tokenLocalStorage) {
      return children;
    }
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
