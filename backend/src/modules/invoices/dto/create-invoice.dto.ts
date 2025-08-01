import { IsString, IsDateString, IsDecimal, IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { InvoiceStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateInvoiceLineItemDto {
  @IsString()
  description: string;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  quantity: Decimal;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  unitPrice: Decimal;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  amount: Decimal;
}

export class CreateInvoiceDto {
  @IsString()
  clientId: string;

  @IsString()
  contractId: string;

  @IsString()
  invoiceNumber: string;

  @IsDateString()
  periodStart: string;

  @IsDateString()
  periodEnd: string;

  @IsDateString()
  issueDate: string;

  @IsDateString()
  dueDate: string;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  subtotal: Decimal;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  tax: Decimal;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  total: Decimal;

  @IsOptional()
  @IsString()
  pdfStorageKey?: string;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceLineItemDto)
  lineItems: CreateInvoiceLineItemDto[];
}