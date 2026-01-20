import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsOptional()
  images?: Array<{
    url: string;
    alt: string;
    displayOrder: number;
  }>;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsOptional()
  specifications?: {
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    material?: string;
    color?: string;
    weight?: number;
  };

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(['draft', 'published', 'outOfStock'])
  @IsOptional()
  status?: string;

  @IsOptional()
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
}
