import { IsOptional, IsString, Length } from 'class-validator';

export class IGetAccountsDTO {
  @Length(0, 100)
  @IsString()
  @IsOptional()
  name: string;
}
