import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ unique: true, length: 255 })
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
    caption: string;
  }>;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: string;

  @Column({ type: 'json' })
  categories: string[];

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'json', nullable: true })
  metadata: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    readingTime: number;
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
