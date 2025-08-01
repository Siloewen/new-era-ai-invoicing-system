import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async create(createContractDto: CreateContractDto) {
    return this.prisma.contract.create({
      data: {
        ...createContractDto,
        nextInvoiceDate: new Date(createContractDto.nextInvoiceDate),
      },
      include: {
        client: true,
        _count: {
          select: {
            usageRecords: true,
            invoices: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.contract.findMany({
      include: {
        client: true,
        _count: {
          select: {
            usageRecords: true,
            invoices: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        client: true,
        usageRecords: {
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    return contract;
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    const updateData: any = { ...updateContractDto };
    if (updateContractDto.nextInvoiceDate) {
      updateData.nextInvoiceDate = new Date(updateContractDto.nextInvoiceDate);
    }

    return this.prisma.contract.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
        _count: {
          select: {
            usageRecords: true,
            invoices: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const contract = await this.prisma.contract.findUnique({ where: { id } });
    
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    return this.prisma.contract.delete({
      where: { id },
    });
  }
}