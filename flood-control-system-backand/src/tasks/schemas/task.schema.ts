import { Schema, Document, model } from 'mongoose';
import { UserDocument } from 'src/users/users.schema';

// Перечисление возможных статусов задачи
export enum TaskStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Перечисление типов задач (пока только один)
export enum TaskType {
  FLOODING_AUTOMATION = 'flooding_automation', // автоматизация заводнения
  // Можно добавить другие типы в будущем, например:
  // DATA_EXPORT = 'data_export',
  // REPORT_GENERATION = 'report_generation',
}

export interface ITaskDocument extends Document {
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
  createdBy: UserDocument['_id']; // Reference to User
}

export const TaskSchema = new Schema<ITaskDocument>(
  {
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    taskType: {
      type: String,
      enum: Object.values(TaskType),
      required: true,
      default: TaskType.FLOODING_AUTOMATION, // Установлен дефолтный тип
    },
    resultFileUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    startedAt: {
      type: Date,
      required: false,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Автоматически добавляет createdAt и updatedAt
  },
);

// Модель для экспорта
export const TaskModel = model<ITaskDocument>('Task', TaskSchema);
