import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'json', nullable: true })
  images: Array<{
    url: string;
    alt: string;
    displayOrder: number;
  }>;

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @Column({ type: 'json', nullable: true })
  specifications: {
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    material: string;
    color: string;
    weight: number;
  };

  @Column({ default: 0 })
  stock: number;

  @Column({ default: false })
  featured: boolean;

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'outOfStock'],
    default: 'draft'
  })
  status: string;

  @Column({ type: 'json', nullable: true })
  metadata: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
