import { IsEmail, IsString } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  password_repeat: string

  @IsString()
  full_name: string
}
