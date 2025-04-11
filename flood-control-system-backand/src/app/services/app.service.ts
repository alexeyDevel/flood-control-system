import { BadRequestException, Injectable } from '@nestjs/common';
import { IStart } from '../app.type';
import { existsSync, mkdir, writeFile, copyFile } from 'node:fs';
import * as path from 'node:path';
import { ProcessService } from './process.service';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService {
  constructor(private readonly processService: ProcessService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // createPublicDir() {
  //   if (!existsSync(path.join(__dirname, '../', 'public'))) {
  //     mkdir(
  //       path.join(__dirname, '../', 'public'),
  //       { recursive: true },
  //       (err) => {
  //         if (err) {
  //           console.error('Ошибка создания папки public:', err);
  //         } else {
  //           console.log('Папка public создана успешно');
  //         }
  //       },
  //     );
  //   }
  // }

  // async createJsonFile(props: IStart): Promise<{ message: string }> {
  //   return new Promise((resolve, reject) => {
  //     const currentDate = Date.now();
  //     const fileName = `${props.area}-${currentDate}.json`;
  //     this.createPublicDir();
  //     const filePath = path.join(__dirname, '../public', fileName);

  //     const content = JSON.stringify(props, null, 2);

  //     writeFile(filePath, content, (err) => {
  //       if (err) {
  //         console.error(err);
  //         reject(err); // Reject the promise if an error occurs
  //       } else {
  //         console.log(`Файл ${fileName} создан успешно!`);
  //         resolve({ message: `Файл ${fileName} создан успешно!` });
  //       }
  //     });
  //   });
  // }

  async createCsvFile(props: IStart): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const currentDate = Date.now();
      const fileName = `${props.area}-${currentDate}.csv`;
      // this.createPublicDir();
      // const filePath = path.join(__dirname, '../public', fileName);
      const filePath = path.join(
        process.env.FCS_REQUEST ?? '',
        '../public',
        fileName,
      );

      const header = Object.keys(props).join(';');

      const values = Object.values(props)
        .map((value) => {
          // Escape double quotes within the value
          const escapedValue = String(value).replace(/"/g, '""');
          // Enclose each value in double quotes
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

  async start(props: IStart): Promise<{ message: string; pid: number }> {
    // await this.createJsonFile(props);
    const isProcessRunning =
      await this.processService.isProcessRunning('RGBFusion.exe');
    if (isProcessRunning) {
      throw new BadRequestException(
        `Процесс уже запущен. Идут вычисления. Попробуйте позднее.`,
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

    // const currentDate = Date.now();
    // const fileName = `${props.name}-${currentDate}.xlsm`;
    // console.log(__dirname);
    // this.createPublicDir();
    // const filePath = path.join(__dirname, '../public', fileName);
    // const sourceFilePath = path.join(__dirname, '../../files/result.xlsm');

    // if (!existsSync(sourceFilePath)) {
    //   console.error('Файл result.csv не найден');
    //   return { message: 'Файл result.csv не найден' };
    // }

    // copyFile(sourceFilePath, filePath, (err) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(`Файл ${fileName} создан успешно!`);
    //   }
    // });
  }
}
