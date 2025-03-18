import { Injectable } from '@nestjs/common';
import { IStart } from './app.type';
import { existsSync, mkdir, writeFile } from 'node:fs';
import { copyFile } from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createPublicDir() {
    if (!existsSync(path.join(__dirname, '../', 'public'))) {
      mkdir(
        path.join(__dirname, '../', 'public'),
        { recursive: true },
        (err) => {
          if (err) {
            console.error('Ошибка создания папки public:', err);
          } else {
            console.log('Папка public создана успешно');
          }
        },
      );
    }
  }

  // async start(props: IStart): Promise<{ message: string }> {
  //   const currentDate = Date.now();
  //   const fileName = `${props.name}-${currentDate}.txt`;
  //   console.log(__dirname);
  //   this.createPublicDir();
  //   const filePath = path.join(__dirname, '../public', fileName);
  //   const content = 'Привет, мир!';

  //   writeFile(filePath, content, (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log(`Файл ${fileName} создан успешно!`);
  //     }
  //   });

  //   return new Promise((resolve) => {
  //     resolve({ message: `Файл ${fileName} создан успешно!` });
  //   });
  // }

  async start(props: IStart): Promise<{ message: string }> {
    const currentDate = Date.now();
    const fileName = `${props.name}-${currentDate}.csv`;
    console.log(__dirname);
    this.createPublicDir();
    const filePath = path.join(__dirname, '../public', fileName);
    const sourceFilePath = path.join(__dirname, '../../files/result.csv');

    if (!existsSync(sourceFilePath)) {
      console.error('Файл result.csv не найден');
      return { message: 'Файл result.csv не найден' };
    }

    copyFile(sourceFilePath, filePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Файл ${fileName} создан успешно!`);
      }
    });

    return new Promise((resolve) => {
      resolve({ message: `Файл ${fileName} создан успешно!` });
    });
  }
}
