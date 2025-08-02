import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type (images only)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!this.filesService.validateFileType(file, allowedTypes)) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!this.filesService.validateFileSize(file, maxSize)) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    const filePath = await this.filesService.saveFile(file, 'logos');
    
    return {
      filePath,
      url: this.filesService.getFileUrl(filePath),
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  @Post('upload/template')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTemplate(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type (PDFs and images)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!this.filesService.validateFileType(file, allowedTypes)) {
      throw new BadRequestException('Only PDF and image files are allowed');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!this.filesService.validateFileSize(file, maxSize)) {
      throw new BadRequestException('File size must be less than 10MB');
    }

    const filePath = await this.filesService.saveFile(file, 'templates');
    
    return {
      filePath,
      url: this.filesService.getFileUrl(filePath),
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  @Get(':folder/:filename')
  async getFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const filePath = `${folder}/${filename}`;
      const file = await this.filesService.getFile(filePath);
      
      // Set appropriate content type based on file extension
      const ext = filename.split('.').pop()?.toLowerCase();
      let contentType = 'application/octet-stream';
      
      switch (ext) {
        case 'pdf':
          contentType = 'application/pdf';
          break;
        case 'jpg':
        case 'jpeg':
          contentType = 'image/jpeg';
          break;
        case 'png':
          contentType = 'image/png';
          break;
        case 'gif':
          contentType = 'image/gif';
          break;
      }
      
      res.set({
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
      });
      
      res.send(file);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  @Delete(':folder/:filename')
  async deleteFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
  ) {
    try {
      const filePath = `${folder}/${filename}`;
      await this.filesService.deleteFile(filePath);
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}