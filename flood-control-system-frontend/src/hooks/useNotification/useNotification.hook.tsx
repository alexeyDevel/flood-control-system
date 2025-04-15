import { notification } from "antd";
import styles from "./useNotification.module.scss";

import {
  TOpenNotificationProps,
  TToast,
  TUseNotificationReturn,
} from "./useNotification.type";
import { resolveImage } from "./useNotification.helper";
import { Box, Button, Typography } from "@mui/material";

export const useNotification = (): TUseNotificationReturn => {
  const [notificationApi, contextHolder] = notification.useNotification();

  const openOverride = ({
    title,
    description,
    buttonText,
    onClick,
    onClose,
    variant = "success",
  }: TOpenNotificationProps) => {
    const variantImage = resolveImage(variant);

    return notificationApi.open({
      message: (
        <Box className={styles.contentWrapper}>
          <Box className={styles.contentInner}>
            <Typography>{title}</Typography>
            {description && <Typography>{description}</Typography>}
          </Box>

          {onClick && (
            <Button onClick={onClick}>
              <Typography>{buttonText ?? "Ок"}</Typography>
            </Button>
          )}
        </Box>
      ),

      duration: 5,
      className: styles.notification,
      icon: <img src={variantImage} alt="success" width={22} height={22} />,
      onClick: onClose,
    });
  };

  const toast: TToast = {
    open: openOverride,
  };

  return { toast, contextHolder };
};
