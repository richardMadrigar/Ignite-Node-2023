import { Injectable, NotFoundException } from '@nestjs/common';

import { IGetAccountByIdDTO } from './DTO/IGetByIdAccountDTO';
import { IUsersRepository } from '../../../repositories/Users/IPrismaUsersRepository';

@Injectable()
export class GetAccountByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id }: IGetAccountByIdDTO) {
    const resultGet = await this.usersRepository.getById({ id });

    if (!resultGet) {
      throw new NotFoundException('Usuário não existe');
    }

    return {
      account: resultGet,
      message: 'success',
    };
  }
}
