import { map } from "nanostores";
import { IPaginatedTaskResponse } from "src/api/task/task.type";

export const $tasks = map<{
  isLoading: boolean;
  taskList: IPaginatedTaskResponse["data"];
  totalCount: number;
}>({
  isLoading: false,
  taskList: [],
  totalCount: 0,
});
