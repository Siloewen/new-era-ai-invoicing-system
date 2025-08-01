import { IsString, IsObject } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString()
  storageKey: string;

  @IsObject()
  variablesSchema: Record<string, any>;

  @IsString()
  createdById: string;
}