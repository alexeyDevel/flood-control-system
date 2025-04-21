import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ITaskDocument, TaskType } from '../schemas/task.schema'; // Предполагается, что enum берутся из схемы

export class CreateTaskDto
  implements Pick<ITaskDocument, 'taskType' | 'description' | 'createdBy'>
{
  @IsString()
  createdBy: string;

  @IsEnum(TaskType)
  taskType: TaskType; // Тип задачи (обязательный)

  @IsOptional()
  @IsString()
  description?: string; // Описание (необязательное)

  // Остальные поля обычно не нужны при создании,
  // т. к. статус и даты устанавливаются автоматически
}
