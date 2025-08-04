export enum TaskType {
  FLOODING_AUTOMATION = "flooding_automation",
  FORECAST_FOR_OPTIONS = "forecast_for_otions",
  INFLUENCE_OF_WELLS = "influence_of_wells",
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
  influence_of_wells: "Взаимовлияние скважин",
};

export const TASK_STATUS_MAP: Record<TaskStatus, string> = {
  pending: "Ожидание",
  processing: "Выполняется",
  [TaskStatus.COMPLETED]: "Завершено успешно",
  [TaskStatus.FAILED]: "Завершено с ошибкой",
};
