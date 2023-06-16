import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  Length,
  IsDate,
  IsString,
  IsBoolean,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class ICreateUserDTO {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  @ApiProperty({ example: 'reis' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'reis@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ example: '1999-05-17' })
  birthdate: Date;

  @IsString()
  @ApiProperty()
  document?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  acceptedTermsAndConditions: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  @ApiProperty({ example: '01310904' })
  zipcode: string;
}
