import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString, IsUUID,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";
import { Match } from '../../../common/decorators/match.decorator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  dob: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  wallBg: string;

  @IsOptional()
  hash: string;

  @IsBoolean()
  status = true;
}

export class EditUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  dob: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  wallBg: string;

  @IsOptional()
  hash: string;
}

export class UpdatePasswordDTO {
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  rePassword: string;
}
