import { TOpenNotificationProps } from "src/hooks/useNotification/useNotification.type";
import { $notification } from "./notification";

/**
 * Добавляет уведомление в очередь.
 *
 * @param {TOpenNotificationProps} props - Уведомление, которое нужно добавить в очередь.
 * @returns {void}
 *
 * @example
 * addNotificationToQueue({
 *   id: '1',
 *   message: 'Уведомление успешно добавлено!',
 *   type: 'success',
 * });
 */
export const pushNotification = (props: TOpenNotificationProps): void => {
  const { notificationStack } = $notification.get();
  $notification.setKey("notificationStack", [props, ...notificationStack]);
};

export const popNotification = (): TOpenNotificationProps | null => {
  const { notificationStack } = $notification.get();

  if (notificationStack.length === 0) {
    return null; // Нет уведомлений для обработки
  }

  const nextNotification = notificationStack[0]; // Получаем следующее уведомление
  $notification.setKey("notificationStack", notificationStack.slice(1)); // Удаляем его из очереди

  return nextNotification; // Возвращаем уведомление для обработки
};
