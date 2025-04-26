import { TaskStatus, TaskType } from "src/api/task/task.type";

export interface IFilters {
  search?: string;
  status?: TaskStatus[];
  taskType?: TaskType[];
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ICompactFiltersProps {
  filters: IFilters;
  handleFilterChange: <K extends keyof IFilters>(
    name: K,
    value: IFilters[K]
  ) => void;
  clearFilters: () => void;
}
