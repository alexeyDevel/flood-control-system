import { Controller, Get, Post, Body, Res, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TFileList } from './files.type';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFiles(): Promise<TFileList[]> {
    return await this.filesService.getListOfFiles();
  }

  @UseGuards(JwtAuthGuard)
  @Post('download')
  downloadFile(@Body() data: { fullName: string }, @Res() res: Response) {
    try {
      const filePath = this.filesService.getFilePath(data.fullName);
      if (!fs.existsSync(filePath)) {
        res.status(404).send('Файл не найден');
        return;
      }
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      const encodedFileName = encodeURIComponent(fileName);
      res.set({
        'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`,
        'Content-Type': 'application/octet-stream',
      });
      res.send(fileBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка скачивания файла');
    }
  }

  // @Post()
  // create(@Body() createFileDto: CreateFileDto) {
  //   return this.filesService.create(createFileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.filesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.filesService.update(+id, updateFileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filesService.remove(+id);
  // }
}
