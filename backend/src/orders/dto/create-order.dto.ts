import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsEnum(['purchase', 'consultation'])
  orderType: string;

  @IsOptional()
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsOptional()
  items?: OrderItemDto[];

  @IsOptional()
  consultationDetails?: {
    projectType?: string;
    spaceSize?: string;
    budget?: number;
    requirements?: string;
    preferredContactTime?: Date;
  };

  @IsNumber()
  @Min(0)
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

  @IsNumber()
  @IsOptional()
  assignedStaffId?: number;
}
