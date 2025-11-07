import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_PASSWORD_LENGTH } from '@the-marketplace/shared';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'demo@example.com',
    format: 'email',
    maxLength: 255,
  })
  @Transform(({ value }) => value?.trim())
  @IsEmail({}, { message: 'Must be a valid email address' })
  @MaxLength(255, { message: 'Email must be less than 255 characters' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    format: 'password',
    minLength: 6,
    maxLength: MAX_PASSWORD_LENGTH,
  })
  @IsString({ message: 'Password must be a valid string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: `Password must be less than ${MAX_PASSWORD_LENGTH} characters`,
  })
  password: string;
}
