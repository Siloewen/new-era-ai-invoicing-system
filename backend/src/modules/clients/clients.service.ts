import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.findMany({
      include: {
        contracts: true,
        _count: {
          select: {
            contracts: true,
            invoices: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        contracts: true,
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }
}