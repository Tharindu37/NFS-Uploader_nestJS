import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [UploadModule, ServeStaticModule.forRoot({
    rootPath: '/mnt/nfs-storage/uploads', // Directory to serve static files
    serveRoot: '/uploads', // Expose via '/uploads'
    // Set index files to false to prevent it from looking for index.html
    exclude: ['/uploads/*'],
  }),],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule { }
