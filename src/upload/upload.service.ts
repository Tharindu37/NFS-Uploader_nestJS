import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';
import { File } from 'multer';
@Injectable()
export class UploadService {
    private readonly storagePath = '/mnt/nfs-storage/uploads'; // NFS storage directory

  constructor() {}

  async uploadFile(file: File): Promise<string> {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const fileExtension = path.extname(file.originalname);
    const filename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(this.storagePath, filename);

    try {
      // Ensure storage directory exists
      await fs.mkdir(this.storagePath, { recursive: true });

      // Save the file to NFS
      await fs.writeFile(filePath, file.buffer);

      // Return the file URL
      return `http://localhost:3000/uploads/${filename}`;
    } catch (error) {
      throw new HttpException(
        'Failed to upload file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
