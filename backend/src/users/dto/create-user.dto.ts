import { IsEmail, IsString, MinLength, IsOptional, IsEnum, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'editor', 'customer'])
  role?: string;

  @IsString({ message: 'Tên là bắt buộc' })
  firstName: string;

  @IsString({ message: 'Họ là bắt buộc' })
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
    street?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
}
