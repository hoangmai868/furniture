import { IsString, IsNumber, Min, IsOptional, IsBoolean, IsEnum, IsUUID, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0, { message: 'Giá sản phẩm không thể âm' })
  price: number;

  @IsOptional()
  @IsArray()
  images?: Array<{
    url: string;
    alt: string;
    displayOrder: number;
  }>;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  specifications?: {
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    material: string;
    color: string;
    weight: number;
  };

  @IsNumber()
  @Min(0, { message: 'Số lượng tồn kho không thể âm' })
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(['draft', 'published', 'outOfStock'])
  @IsOptional()
  status?: string;

  @IsOptional()
  metadata?: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  };
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: 'Giá sản phẩm không thể âm' })
  @IsOptional()
  price?: number;

  @IsOptional()
  @IsArray()
  images?: Array<{
    url: string;
    alt: string;
    displayOrder: number;
  }>;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsOptional()
  specifications?: {
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    material: string;
    color: string;
    weight: number;
  };

  @IsNumber()
  @Min(0, { message: 'Số lượng tồn kho không thể âm' })
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(['draft', 'published', 'outOfStock'])
  @IsOptional()
  status?: string;

  @IsOptional()
  metadata?: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  };
}
