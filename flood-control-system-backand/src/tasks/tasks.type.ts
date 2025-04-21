import { ITaskDocument, TaskStatus, TaskType } from './schemas/task.schema';

export interface ITaskQuery {
  status?: { $in: TaskStatus[] };
  taskType?: { $in: TaskType[] };
  createdBy?: string;
  $or?: Array<{
    description?: { $regex: string; $options: string };
    errorMessage?: { $regex: string; $options: string };
  }>;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export interface IPaginatedTaskResponse {
  data: ITaskDocument[];
  total: number;
  skip: number;
  limit: number;
}
