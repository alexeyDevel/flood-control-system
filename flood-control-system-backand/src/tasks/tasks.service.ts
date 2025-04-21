import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITaskDocument, TaskStatus } from './schemas/task.schema';
import { UsersService } from 'src/users/users.service';
import { TaskFilterDto } from './dto/task-filter.dto';
import { IPaginatedTaskResponse, ITaskQuery } from './tasks.type';

@Injectable()
export class TasksService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel('Task') private taskModel: Model<ITaskDocument>,
  ) {}

  // 1. Создание задачи
  async create(createTaskDto: CreateTaskDto): Promise<ITaskDocument> {
    const user = await this.usersService.findUserById(createTaskDto.createdBy);
    console.log('user, ', user);
    if (!user)
      throw new BadRequestException(`Пользователь с  заданным id не найден`);

    const newTask = new this.taskModel({
      ...createTaskDto,
      status: TaskStatus.PENDING, // Статус по умолчанию
      progress: 0, // Прогресс по умолчанию
    });
    return newTask.save();
  }

  // 2. Обновление задачи
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ITaskDocument | null> {
    if (updateTaskDto.createdBy) {
      const user = await this.usersService.findUserById(
        updateTaskDto.createdBy,
      );
      if (!user)
        throw new BadRequestException(`Пользователь с  заданным id не найден`);
    }

    const updates: Partial<ITaskDocument> = { ...updateTaskDto };

    // Автоматическое обновление дат при изменении статуса
    if (updateTaskDto.status === TaskStatus.PROCESSING && !updates.startedAt) {
      updates.startedAt = new Date();
    } else if (
      (updateTaskDto.status === TaskStatus.COMPLETED ||
        updateTaskDto.status === TaskStatus.FAILED) &&
      !updates.completedAt
    ) {
      updates.completedAt = new Date();
    }

    return await this.taskModel
      .findByIdAndUpdate(id, updates, { new: true }) // { new: true } возвращает обновленный документ
      .exec();
  }

  // 3. Получение задачи по ID
  async findById(id: string): Promise<ITaskDocument | null> {
    return this.taskModel.findById(id).exec();
  }

  // 4. Получение списка всех задач (с пагинацией)
  async findAll(filterDto: TaskFilterDto): Promise<IPaginatedTaskResponse> {
    const {
      skip = 0,
      limit = 10,
      search,
      status,
      taskType,
      createdBy,
      dateFrom,
      dateTo,
    } = filterDto;

    // Инициализация query с правильным типом
    const query: ITaskQuery = {};

    // Добавление условий фильтрации с проверкой типов
    if (status?.length) {
      query.status = { $in: status };
    }

    if (taskType?.length) {
      query.taskType = { $in: taskType };
    }

    if (createdBy) {
      query.createdBy = createdBy;
    }

    if (search) {
      query.$or = [
        { description: { $regex: search, $options: 'i' } },
        { errorMessage: { $regex: search, $options: 'i' } },
      ];
    }

    // Типобезопасная работа с датами
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) {
        query.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query.createdAt.$lte = new Date(dateTo);
      }
    }

    const [data, total] = await Promise.all([
      this.taskModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'username email')
        .exec(),
      this.taskModel.countDocuments(query).exec(),
    ]);

    return {
      data,
      total,
      skip,
      limit,
    };
  }

  // 5. Удаление задачи
  async remove(id: string): Promise<ITaskDocument | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  // 6. Получение задач по статусу (например, для обработки очереди)
  async findByStatus(status: TaskStatus): Promise<ITaskDocument[]> {
    return this.taskModel.find({ status }).exec();
  }
}
