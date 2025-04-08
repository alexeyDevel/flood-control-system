import { Injectable } from '@nestjs/common';
import { IStart } from '../app.type';
import { existsSync, mkdir, writeFile, copyFile } from 'node:fs';
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
      this.createPublicDir();
      const filePath = path.join(__dirname, '../public', fileName);

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

  async start(props: IStart): Promise<{ message: string }> {
    // await this.createJsonFile(props);

    try {
      await this.createCsvFile(props);
    } catch (error) {
      throw new Error(error);
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

    return { message: `Файл fileName создан успешно!` };
  }
}
