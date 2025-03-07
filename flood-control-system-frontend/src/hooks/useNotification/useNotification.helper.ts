import { TVariant } from "./useNotification.type";
import checkIcon from "assets/icons/CheckCircle.svg";
import closeCircleIcon from "assets/icons/CloseCircle.svg";
import circleBlIcon from "assets/icons/ExclamationCircleBl.svg";
import circleYellowIcon from "assets/icons/ExclamationCircleYellow.svg";

export const resolveImage = (variant: TVariant): string => {
  switch (variant) {
    case "success":
      return checkIcon;

    case "info":
      return circleBlIcon;

    case "warning":
      return circleYellowIcon;

    case "error":
      return closeCircleIcon;

    default:
      return checkIcon;
  }
};
