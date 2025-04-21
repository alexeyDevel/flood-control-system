import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsUrl,
} from 'class-validator';
import { TaskStatus, TaskType } from '../schemas/task.schema';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; // Новый статус

  @IsOptional()
  @IsString()
  errorMessage?: string; // Сообщение об ошибке

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number; // Прогресс (0-100)

  @IsOptional()
  @IsUrl()
  resultFileUrl?: string; // Ссылка на файл (валидация URL)

  @IsOptional()
  @IsString()
  description?: string; // Обновлённое описание
}
