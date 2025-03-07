import { map } from "nanostores";
import { INotificationStore } from "./notification.type";
import { INITIAL_NOTIFICATION_STORE } from "./notification.const";

export const $notification = map<INotificationStore>(
  INITIAL_NOTIFICATION_STORE
);
