import { IsString, MaxLength, IsOptional, IsEnum, IsArray, IsUUID, IsNumber, IsDateString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsString()
  @MaxLength(500, { message: 'Tóm tắt không được vượt quá 500 ký tự' })
  excerpt: string;

  @IsOptional()
  featuredImage?: {
    url: string;
    alt: string;
  };

  @IsOptional()
  @IsArray()
  images?: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;

  @IsUUID()
  authorId: string;

  @IsArray()
  @IsEnum(['design-tips', 'interior-trends', 'maintenance', 'decoration', 'space-planning'], { each: true })
  categories: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @IsOptional()
  metadata?: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    readingTime: number;
  };

  @IsOptional()
  stats?: {
    views: number;
    likes: number;
    shares: number;
  };
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @MaxLength(500, { message: 'Tóm tắt không được vượt quá 500 ký tự' })
  @IsOptional()
  excerpt?: string;

  @IsOptional()
  featuredImage?: {
    url: string;
    alt: string;
  };

  @IsOptional()
  @IsArray()
  images?: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;

  @IsUUID()
  @IsOptional()
  authorId?: string;

  @IsArray()
  @IsEnum(['design-tips', 'interior-trends', 'maintenance', 'decoration', 'space-planning'], { each: true })
  @IsOptional()
  categories?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @IsOptional()
  metadata?: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    readingTime: number;
  };

  @IsOptional()
  stats?: {
    views: number;
    likes: number;
    shares: number;
  };
}
