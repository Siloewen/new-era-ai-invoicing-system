import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class FilesService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');
  private readonly publicDir = path.join(process.cwd(), 'public');

  constructor() {
    this.ensureDirectoriesExist();
  }

  private async ensureDirectoriesExist() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.publicDir, { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'invoices'), { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'templates'), { recursive: true });
      await fs.mkdir(path.join(this.uploadDir, 'logos'), { recursive: true });
    } catch (error) {
      console.error('Error creating upload directories:', error);
    }
  }

  generateFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext);
    const hash = crypto.randomBytes(8).toString('hex');
    const timestamp = Date.now();
    return `${name}-${timestamp}-${hash}${ext}`;
  }

  async saveFile(file: Express.Multer.File, subfolder: string = ''): Promise<string> {
    const fileName = this.generateFileName(file.originalname);
    const targetDir = subfolder ? path.join(this.uploadDir, subfolder) : this.uploadDir;
    const filePath = path.join(targetDir, fileName);
    
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(filePath, file.buffer);
    
    return path.join(subfolder, fileName).replace(/\\/g, '/');
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async getFile(filePath: string): Promise<Buffer> {
    const fullPath = path.join(this.uploadDir, filePath);
    return fs.readFile(fullPath);
  }

  getFileUrl(filePath: string): string {
    return `/uploads/${filePath}`;
  }

  validateFileType(file: Express.Multer.File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.mimetype);
  }

  validateFileSize(file: Express.Multer.File, maxSizeInBytes: number): boolean {
    return file.size <= maxSizeInBytes;
  }
}