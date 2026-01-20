import { IsString, IsOptional, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsOptional()
  image?: {
    url: string;
    alt: string;
  };

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  metadata?: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  };
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  image?: {
    url: string;
    alt: string;
  };

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  metadata?: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  };
}
