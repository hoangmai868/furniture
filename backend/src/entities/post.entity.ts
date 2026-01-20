import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
@Index(['title', 'content'], { fulltext: true })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 500 })
  excerpt: string;

  @Column({ type: 'json', nullable: true })
  featuredImage: {
    url: string;
    alt: string;
  };

  @Column({ type: 'json', nullable: true })
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;

  @Column({ type: 'int', nullable: true })
  authorId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ type: 'simple-array' })
  categories: string[];

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'json', nullable: true })
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    readingTime?: number;
  };

  @Column({ type: 'json', nullable: true })
  stats: {
    views: number;
    likes: number;
    shares: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
