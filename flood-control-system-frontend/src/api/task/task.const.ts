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

export const TASK_TYPE_MAP: Record<TaskType, string> = {
  flooding_automation: "Оптимизация заводнения",
  forecast_for_otions: 'Прогноз по вариантам с "ограничениями"',
};

export const TASK_STATUS_MAP: Record<TaskStatus, string> = {
  pending: "Ожидание",
  processing: "Выполняется",
  [TaskStatus.COMPLETED]: "Завершено успешно",
  [TaskStatus.FAILED]: "Завершено с ошибкой",
};
