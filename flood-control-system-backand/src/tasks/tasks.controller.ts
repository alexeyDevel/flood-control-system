import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Post('list')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Body() filterDto: TaskFilterDto) {
    return this.tasksService.findAll(filterDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.tasksService.findById(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(id);
  }
}
