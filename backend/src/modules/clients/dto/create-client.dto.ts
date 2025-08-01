import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ClientStatus } from '@prisma/client';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  billingAddress?: string;

  @IsOptional()
  @IsEnum(ClientStatus)
  status?: ClientStatus;
}