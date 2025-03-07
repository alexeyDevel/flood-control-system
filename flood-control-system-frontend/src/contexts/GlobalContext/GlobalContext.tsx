import { createContext, useEffect } from "react";
import { IGlobalContext, TGlobalProviderProps } from "./GlobalContext.type";
import { useNotification } from "src/hooks/useNotification";
import { $notification, popNotification } from "src/stores/notification";
import { useStore } from "@nanostores/react";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<IGlobalContext>(
  {} as IGlobalContext
);

export const GlobalProvider = ({ children }: TGlobalProviderProps) => {
  const { notificationStack } = useStore($notification);
  const { toast, contextHolder } = useNotification();

  useEffect(() => {
    const notificationProp = popNotification();

    if (!notificationProp) return;

    toast.open(notificationProp);
  }, [notificationStack, toast]);

  return (
    <GlobalContext.Provider value={{ toast }}>
      {contextHolder}
      {children}
    </GlobalContext.Provider>
  );
};
