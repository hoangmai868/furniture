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
import { Category } from './category.entity';

@Entity('products')
@Index(['name', 'description'], { fulltext: true })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'json', nullable: true })
  images: Array<{
    url: string;
    alt: string;
    displayOrder: number;
  }>;

  @Column({ type: 'int', nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'json', nullable: true })
  specifications: {
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    material?: string;
    color?: string;
    weight?: number;
  };

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'outOfStock'],
    default: 'draft',
  })
  status: string;

  @Column({ type: 'json', nullable: true })
  metadata: {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
