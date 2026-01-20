import { IsEmail, IsString, MinLength, IsEnum, IsOptional, Matches, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  password: string;

  @IsEnum(['admin', 'editor', 'customer'])
  @IsOptional()
  role?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại không hợp lệ' })
  phoneNumber?: string;

  @IsOptional()
  avatar?: {
    url: string;
    alt: string;
  };

  @IsOptional()
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @IsOptional()
  password?: string;

  @IsEnum(['admin', 'editor', 'customer'])
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại không hợp lệ' })
  phoneNumber?: string;

  @IsOptional()
  avatar?: {
    url: string;
    alt: string;
  };

  @IsOptional()
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
