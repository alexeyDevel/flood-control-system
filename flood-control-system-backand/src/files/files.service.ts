import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  private readonly publicDir =
    process.env.FCS_RESULT_FILES_PATH || path.join(__dirname, '../public');

  getListOfFiles(): string[] {
    if (!fs.existsSync(this.publicDir)) {
      return [];
    }
    return fs.readdirSync(this.publicDir);
  }

  getFilePath(fileName: string): string {
    const filePath = path.join(this.publicDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error('Файл не найден');
    }
    return filePath;
  }

  // create(createFileDto: CreateFileDto) {
  //   return 'This action adds a new file';
  // }
  // findAll() {
  //   return `This action returns all files`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} file`;
  // }
  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
