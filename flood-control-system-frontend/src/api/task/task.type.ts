export enum TaskType {
  FLOODING_AUTOMATION = "flooding_automation",
  FORECAST_FOR_OPTIONS = "forecast_for_otions",
}
export enum TaskStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface ITaskFilterDto {
  skip?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus[];
  taskType?: TaskType[];
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
export interface ITaskDocument {
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  taskType: TaskType; // Тип задачи (обязательный)
  resultFileUrl?: string; // Ссылка на файл с результатом (необязательная)
  description?: string; // Описание задачи (необязательное)
  errorMessage?: string; // Сообщение об ошибке, если статус FAILED
  progress?: number; // Прогресс выполнения (0-100)
  startedAt?: Date; // Когда началось выполнение
  completedAt?: Date; // Когда завершилось выполнение
  createdBy: string; // Reference to User
}
export interface IPaginatedTaskResponse {
  data: ITaskDocument[];
  total: number;
  skip: number;
  limit: number;
}
