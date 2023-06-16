import { IsNotEmpty, IsString } from 'class-validator';

export class IGetAccountByIdDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
