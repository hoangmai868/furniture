import { IsEnum, IsString, IsOptional, IsNumber, Min, IsArray, IsEmail, Matches, IsUUID, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsEnum(['purchase', 'consultation'])
  orderType: string;

  @IsOptional()
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
    userId?: string;
  };

  @IsOptional()
  @IsArray()
  items?: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;

  @IsOptional()
  consultationDetails?: {
    projectType: string;
    spaceSize: string;
    budget: number;
    requirements: string;
    preferredContactTime: Date;
  };

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsEnum(['pending', 'confirmed', 'processing', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsEnum(['unpaid', 'paid', 'refunded'])
  @IsOptional()
  paymentStatus?: string;

  @IsEnum(['cod', 'bank_transfer', 'credit_card'])
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  staffNotes?: string;

  @IsUUID()
  @IsOptional()
  assignedStaffId?: string;

  @IsOptional()
  @IsArray()
  statusHistory?: Array<{
    status: string;
    timestamp: Date;
    note: string;
    updatedBy: string;
  }>;
}

export class UpdateOrderDto {
  @IsEnum(['purchase', 'consultation'])
  @IsOptional()
  orderType?: string;

  @IsOptional()
  customer?: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
    userId?: string;
  };

  @IsOptional()
  @IsArray()
  items?: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;

  @IsOptional()
  consultationDetails?: {
    projectType: string;
    spaceSize: string;
    budget: number;
    requirements: string;
    preferredContactTime: Date;
  };

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsEnum(['pending', 'confirmed', 'processing', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsEnum(['unpaid', 'paid', 'refunded'])
  @IsOptional()
  paymentStatus?: string;

  @IsEnum(['cod', 'bank_transfer', 'credit_card'])
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  staffNotes?: string;

  @IsUUID()
  @IsOptional()
  assignedStaffId?: string;

  @IsOptional()
  @IsArray()
  statusHistory?: Array<{
    status: string;
    timestamp: Date;
    note: string;
    updatedBy: string;
  }>;
}
