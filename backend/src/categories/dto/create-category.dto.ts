import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  parentId?: number;

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
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
}
