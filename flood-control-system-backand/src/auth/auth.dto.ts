import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4) // Minimum password length (adjust as needed)
  @MaxLength(32) // Maximum password length (adjust as needed)
  readonly password: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  readonly access_token: string;

  @IsOptional()
  @IsString()
  readonly refresh_token?: string; // Optional refresh token

  @IsNotEmpty()
  @IsNumber()
  readonly expires_in: number; // Token expiration time in seconds

  @IsOptional()
  @IsString()
  readonly token_type?: string; //Optional
}
