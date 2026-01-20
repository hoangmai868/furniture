import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
    userId: string;
  };

  @Column({ type: 'json' })
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;

  @Column({ type: 'json', nullable: true })
  consultationDetails: {
    projectType: string;
    spaceSize: string;
    budget: number;
    requirements: string;
    preferredContactTime: Date;
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

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedStaffId' })
  assignedStaff: User;

  @Column({ nullable: true })
  assignedStaffId: string;

  @Column({ type: 'json', nullable: true })
  statusHistory: Array<{
    status: string;
    timestamp: Date;
    note: string;
    updatedBy: string;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
