import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status?: string;
}
