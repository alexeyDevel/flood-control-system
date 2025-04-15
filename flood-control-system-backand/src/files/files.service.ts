import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { TFileList } from './files.type';

@Injectable()
export class FilesService {
  private readonly publicDir =
    process.env.FCS_RESULT_FILES_PATH || path.join(__dirname, '../public');

  async getListOfFiles(): Promise<Array<TFileList>> {
    if (!fs.existsSync(this.publicDir)) {
      return [];
    }

    const fileNames = fs.readdirSync(this.publicDir);
    const filesWithStats = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(this.publicDir, fileName);
        const stats = await fsPromises.stat(filePath);
        const fileNameSplitted = fileName.split('-');
        return {
          fullname: fileName,
          name: fileNameSplitted[0],
          createdAt: stats.birthtime,
          requestDate: fileNameSplitted[1].split('.')[0],
        };
      }),
    );

    // Сортировка по времени создания (новые сначала)
    return filesWithStats.sort(
      (a, b) => Number(b.requestDate) - Number(a.requestDate),
    );
  }

  getFilePath(fileName: string): string {
    const filePath = path.join(this.publicDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error('Файл не найден');
    }
    return filePath;
  }
}
