import { IsNotEmpty, IsString } from 'class-validator';

export class IDeleteAccountByIdDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  accessToken: string;
}
