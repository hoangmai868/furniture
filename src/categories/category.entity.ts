import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true })
  image: {
    url: string;
    alt: string;
  };

  @ManyToOne(() => Category, category => category.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

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
