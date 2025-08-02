import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PdfService } from '../pdf/pdf.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
    private pdfService: PdfService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { lineItems, ...invoiceData } = createInvoiceDto;
    
    return this.prisma.invoice.create({
      data: {
        ...invoiceData,
        periodStart: new Date(invoiceData.periodStart),
        periodEnd: new Date(invoiceData.periodEnd),
        issueDate: new Date(invoiceData.issueDate),
        dueDate: new Date(invoiceData.dueDate),
        lineItems: {
          create: lineItems,
        },
      },
      include: {
        client: true,
        contract: true,
        lineItems: true,
      },
    });
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: {
        client: true,
        contract: true,
        lineItems: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        contract: true,
        lineItems: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.prisma.invoice.findUnique({ where: { id } });
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    const { lineItems, ...invoiceData } = updateInvoiceDto as any;
    const updateData: any = { ...invoiceData };

    if (invoiceData.periodStart) updateData.periodStart = new Date(invoiceData.periodStart);
    if (invoiceData.periodEnd) updateData.periodEnd = new Date(invoiceData.periodEnd);
    if (invoiceData.issueDate) updateData.issueDate = new Date(invoiceData.issueDate);
    if (invoiceData.dueDate) updateData.dueDate = new Date(invoiceData.dueDate);

    if (lineItems) {
      await this.prisma.invoiceLineItem.deleteMany({
        where: { invoiceId: id },
      });
      
      updateData.lineItems = {
        create: lineItems,
      };
    }

    return this.prisma.invoice.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
        contract: true,
        lineItems: true,
      },
    });
  }

  async remove(id: string) {
    const invoice = await this.prisma.invoice.findUnique({ where: { id } });
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return this.prisma.invoice.delete({
      where: { id },
    });
  }

  async generatePdf(id: string): Promise<string> {
    const invoice = await this.findOne(id);
    
    const invoiceData = {
      invoiceNumber: invoice.invoiceNumber,
      issueDate: invoice.issueDate.toISOString(),
      dueDate: invoice.dueDate.toISOString(),
      client: {
        name: invoice.client?.name || 'Unknown Client',
        contactName: invoice.client?.contactName,
        contactEmail: invoice.client?.contactEmail,
        billingAddress: invoice.client?.billingAddress,
      },
      lineItems: (invoice.lineItems || []).map(item => ({
        description: item.description,
        quantity: item.quantity.toString(),
        unitPrice: item.unitPrice.toString(),
        amount: item.amount.toString(),
      })),
      subtotal: invoice.subtotal.toString(),
      tax: invoice.tax.toString(),
      total: invoice.total.toString(),
    };

    const pdfPath = await this.pdfService.generateInvoicePdf(invoiceData);
    
    // Update invoice with PDF storage key
    await this.prisma.invoice.update({
      where: { id },
      data: { pdfStorageKey: pdfPath },
    });

    return pdfPath;
  }
}