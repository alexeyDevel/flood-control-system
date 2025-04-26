import { fetchTasks } from "src/api/task";
import { $tasks } from "./tasks";
import { ITaskFilterDto } from "src/api/task/task.type";

const loadTasks = async (params: ITaskFilterDto = {}) => {
  try {
    const response = await fetchTasks(params);
    $tasks.setKey("taskList", response.data);
    $tasks.setKey("totalCount", response.total);
  } catch (e) {
    console.error(e);
  }
};

export const tasksActions = { loadTasks };
