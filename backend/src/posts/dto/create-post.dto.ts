import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsString()
  @MaxLength(500)
  excerpt: string;

  @IsOptional()
  featuredImage?: {
    url: string;
    alt: string;
  };

  @IsArray()
  @IsOptional()
  images?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;

  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsArray()
  @IsEnum(
    [
      'design-tips',
      'interior-trends',
      'maintenance',
      'decoration',
      'space-planning',
    ],
    { each: true },
  )
  categories: string[];

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;

  @IsOptional()
  publishedAt?: Date;

  @IsOptional()
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    readingTime?: number;
  };

  @IsOptional()
  stats?: {
    views: number;
    likes: number;
    shares: number;
  };
}
