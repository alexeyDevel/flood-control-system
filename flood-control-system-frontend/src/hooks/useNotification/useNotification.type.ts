import { ReactNode } from "react";

export type TVariant = "success" | "info" | "warning" | "error";

export type TOpenNotificationProps = {
  title: ReactNode;
  description?: ReactNode;
  buttonText?: ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  variant?: TVariant;
};

export type TToast = {
  open: (props: TOpenNotificationProps) => void;
};

export type TUseNotificationReturn = {
  toast: TToast;
  contextHolder: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
};
