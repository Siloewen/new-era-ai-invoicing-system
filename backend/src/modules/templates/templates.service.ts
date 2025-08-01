import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async create(createTemplateDto: CreateTemplateDto) {
    return this.prisma.invoiceTemplate.create({
      data: createTemplateDto,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.invoiceTemplate.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.invoiceTemplate.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    const template = await this.prisma.invoiceTemplate.findUnique({ where: { id } });
    
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    return this.prisma.invoiceTemplate.update({
      where: { id },
      data: updateTemplateDto,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const template = await this.prisma.invoiceTemplate.findUnique({ where: { id } });
    
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    return this.prisma.invoiceTemplate.delete({
      where: { id },
    });
  }
}