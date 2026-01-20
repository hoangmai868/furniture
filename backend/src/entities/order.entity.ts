import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['purchase', 'consultation']
  })
  orderType: string;

  @Column({ type: 'json' })
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: {
      street?: string;
      city?: string;
      province?: string;
      postalCode?: string;
    };
    userId?: number;
  };

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'json', nullable: true })
  consultationDetails: {
    projectType?: string;
    spaceSize?: string;
    budget?: number;
    requirements?: string;
    preferredContactTime?: Date;
  };

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  })
  paymentStatus: string;

  @Column({
    type: 'enum',
    enum: ['cod', 'bank_transfer', 'credit_card'],
    default: 'cod'
  })
  paymentMethod: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  staffNotes: string;

  @Column({ type: 'int', nullable: true })
  assignedStaffId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedStaffId' })
  assignedStaff: User;

  @Column({ type: 'json', nullable: true })
  statusHistory: Array<{
    status: string;
    timestamp: Date;
    note?: string;
    updatedBy?: number;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
