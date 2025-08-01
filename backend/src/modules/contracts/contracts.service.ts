import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.contract.findUnique({
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
  }
}