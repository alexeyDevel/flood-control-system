import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  skip: number;
  limit: number;
}
