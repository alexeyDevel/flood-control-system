import { map } from "nanostores";
import { IPaginatedTaskResponse } from "src/api/task/task.type";

export const $tasks = map<{
  taskList: IPaginatedTaskResponse["data"];
  totalCount: number;
}>({
  taskList: [],
  totalCount: 0,
});
