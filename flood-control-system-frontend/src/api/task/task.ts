import { api } from "../config";
import { IPaginatedTaskResponse, ITaskFilterDto } from "./task.type";

export const fetchTasks = async (
  params: ITaskFilterDto
): Promise<IPaginatedTaskResponse> => {
  return await api.post(`tasks/list`, { json: params }).json();
};
