import { BadRequestException, Injectable } from '@nestjs/common';
import { IStart } from '../app.type';
import {
  existsSync,
  mkdir,
  writeFile,
  copyFile,
  mkdirSync,
  promises,
} from 'node:fs';
import * as path from 'node:path';
import { ProcessService } from './process.service';
import * as process from 'process';
import * as dotenv from 'dotenv';
import { UploadForecastDto } from '../dto/uploadForecast.dto';

dotenv.config();

@Injectable()
export class AppService {
  constructor(private readonly processService: ProcessService) {}
  private readonly allowedExtensions = ['xlsx', 'xls', 'csv'];
  getHello(): string {
    return 'Hello World!';
  }

  async createCsvFile(props: IStart): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const fileName = `/sql.csv`;
      const filePath = path.join(process.env.FCS_REQUEST ?? '', fileName);

      const header = Object.keys(props).join(';');

      const values = Object.values(props)
        .map((value) => {
          const escapedValue = String(value).replace(/"/g, '""');
          return `"${escapedValue}"`;
        })
        .join(';');

      const content = `${header}\n${values}\n`;

      writeFile(filePath, content, (err) => {
        if (err) {
          console.error(err);
          reject(err); // Reject the promise if an error occurs
        } else {
          console.log(`Файл ${fileName} создан успешно!`);
          resolve({ message: `Файл ${fileName} создан успешно!` });
        }
      });
    });
  }

  async optimize(props: IStart): Promise<{ message: string; pid: number }> {
    // await this.createJsonFile(props);
    const isProcessRunning = await this.processService.isProcessRunning(
      process.env.FCS_PROCESS_NAME || '',
    );
    if (isProcessRunning) {
      throw new BadRequestException(
        `Процесс уже запущен. Идут вычисления. Повторите попытку позднее.`,
      );
    }

    try {
      await this.createCsvFile(props);
    } catch (error) {
      throw new BadRequestException('Ошибка при создании файла');
    }

    try {
      const proc = await this.processService.launchExe(
        process.env.FCS_EXE_FILE_PATH || '',
      );
      return { message: 'Процесс запущен успешно!', pid: proc };
    } catch (error) {
      throw new BadRequestException(
        'Ошибка запуска файла. Проверьте существование файла.',
      );
    }
  }

  private ensureUploadDirectoryExists(uploadDir: string): void {
    if (!uploadDir) {
      throw new Error(
        'Проверьте на существование дирректорию для загрузки файлов',
      );
    }

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
  }

  async forecastForOptionsWithLimitations(
    dto: UploadForecastDto,
  ): Promise<{ message: string; pid: number }> {
    // Проверка данных
    if (!dto.fileData || !dto.fileName) {
      throw new BadRequestException('File data and name are required');
    }

    const isProcessRunning = await this.processService.isProcessRunning(
      process.env.FCS_FORECAST_FOR_OPTIONS_PROCESS || '',
    );
    if (isProcessRunning) {
      throw new BadRequestException(
        `Процесс уже запущен. Идут вычисления. Повторите попытку позднее.`,
      );
    }

    // Проверка расширения
    const lastDotIndex = dto.fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      throw new BadRequestException('File has no extension');
    }

    const fileExtension = dto.fileName.split('.').pop()?.toLowerCase() || '';
    console.log(fileExtension);
    if (!this.allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Invalid file extension. Allowed: ${this.allowedExtensions.join(', ')}`,
      );
    }

    // Декодирование base64
    const buffer = Buffer.from(dto.fileData, 'base64');

    // Генерация уникального имени
    const uniqueName = `forecast_${Date.now()}.${fileExtension}`;
    const filePath = path.join(
      process.env.FCS_FORECAST_FOR_OPTIONS_PUBLIC ?? '',
      uniqueName,
    );

    // Сохранение файла
    try {
      await promises.writeFile(filePath, buffer);
    } catch (error) {
      throw new BadRequestException(error);
    }

    try {
      const proc = await this.processService.launchExe(
        process.env.FCS_FORECAST_FOR_OPTIONS_EXE_PATH || '',
      );
      return { message: 'Процесс запущен успешно!', pid: proc };
    } catch (error) {
      throw new BadRequestException(
        'Ошибка запуска файла. Проверьте существование файла.',
      );
    }
  }
}
