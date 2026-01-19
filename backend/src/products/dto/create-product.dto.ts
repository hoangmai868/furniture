import { IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  material?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
