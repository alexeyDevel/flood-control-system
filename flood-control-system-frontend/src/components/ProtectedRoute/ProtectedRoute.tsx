import { useStore } from "@nanostores/react";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router";
import { $auth, setAccessTokenFromStorage } from "src/stores/auth"; // предполагается, что setAuth есть в хранилище

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useStore($auth);

  const tokenLocalStorage = localStorage.getItem("accessToken");

  useEffect(() => {
    // Если токен в localStorage, но нет в хранилище - синхронизируем
    if (tokenLocalStorage && !accessToken) {
      setAccessTokenFromStorage();
    }
  }, [accessToken, tokenLocalStorage]);

  if (!accessToken && !tokenLocalStorage) {
    return <Navigate to="/login" />;
  }

  return children;
};
