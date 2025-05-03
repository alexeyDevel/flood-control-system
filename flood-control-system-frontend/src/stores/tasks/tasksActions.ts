import { fetchTasks } from "src/api/task";
import { $tasks } from "./tasks";
import { ITaskFilterDto } from "src/api/task/task.type";
import { pushNotification } from "../notification";

const loadTasks = async (params: ITaskFilterDto = {}) => {
  try {
    $tasks.setKey("isLoading", true);
    const response = await fetchTasks(params);
    $tasks.setKey("taskList", response.data);
    $tasks.setKey("totalCount", response.total);
  } catch {
    pushNotification({
      title: "Не удалось загрузить статус задач",
      variant: "error",
    });
  }
  $tasks.setKey("isLoading", false);
};

export const tasksActions = { loadTasks };
