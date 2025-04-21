// src/tasks/dto/task-filter.dto.ts
import {
  IsOptional,
  IsNumber,
  Min,
  IsString,
  IsArray,
  IsEnum,
  IsDate,
} from 'class-validator';
import { TaskStatus, TaskType } from '../schemas/task.schema'; // Предполагая, что enum'ы определены здесь
import { Type } from 'class-transformer';

export class TaskFilterDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  status?: TaskStatus[];

  @IsOptional()
  @IsArray()
  @IsEnum(TaskType, { each: true })
  taskType?: TaskType[];

  @IsOptional()
  @IsString()
  createdBy?: string; // ID пользователя

  @IsOptional()
  @IsDate()
  @Type(() => Date) // Не забудьте import { Type } from 'class-transformer';
  dateFrom?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateTo?: Date;
}
