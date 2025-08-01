import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
      include: {
        _count: {
          select: {
            contracts: true,
            invoices: true,
          },
        },
      },
    });
  }

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
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        contracts: true,
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
      include: {
        _count: {
          select: {
            contracts: true,
            invoices: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return this.prisma.client.delete({
      where: { id },
    });
  }
}