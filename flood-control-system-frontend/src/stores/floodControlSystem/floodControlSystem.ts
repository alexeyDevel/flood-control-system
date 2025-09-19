import { map } from "nanostores";
import { influence, TNfluence } from "src/api/app/app";
import { IPaginatedTaskResponse } from "src/api/task/task.type";
import { pushNotification } from "../notification";

export const $floodControlSystem = map<{
  isLoading: boolean;
  taskList: IPaginatedTaskResponse["data"];
  totalCount: number;
}>({
  isLoading: false,
  taskList: [],
  totalCount: 0,
});

export const sendRequest = async (props: TNfluence) => {
  try {
    await influence({
      ngdu: props.ngdu,
      field: props.field,
      area: props.area,
      bl: props.bl,
      strat: props.strat,
      calculationType: props.calculationType,
      radius: props.radius,
    });
    pushNotification({
      title: "Запрос успешно отправлен!",
      variant: "success",
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorResponse = await (error as any).response.json();

    // Выводим все сообщения об ошибках через уведомление
    if (errorResponse.message && Array.isArray(errorResponse.message)) {
      pushNotification({
        title: `Ошибка`,
        description: errorResponse.message.join(";  "),
        variant: "error",
      });
    } else {
      pushNotification({
        title: `Ошибка`,
        description: errorResponse.message || "Неизвестная ошибка",
        variant: "error",
      });
    }
    throw error;
  }
};
