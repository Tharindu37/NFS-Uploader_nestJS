import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadService } from './upload.service';
  import { File } from 'multer';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: File): Promise<any> {
    const downloadUrl = await this.uploadService.uploadFile(file);
    return {
      message: 'File uploaded successfully',
      downloadUrl,
    };
  }
}
