import { IsString, IsDecimal, IsEnum, IsDateString, IsBoolean, IsOptional } from 'class-validator';
import { DataRateType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateContractDto {
  @IsString()
  clientId: string;

  @IsString()
  planName: string;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  flatMonthlyFee: Decimal;

  @IsEnum(DataRateType)
  dataRateType: DataRateType;

  @Transform(({ value }) => new Decimal(value))
  @IsDecimal()
  dataRatePrice: Decimal;

  @IsDateString()
  nextInvoiceDate: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}