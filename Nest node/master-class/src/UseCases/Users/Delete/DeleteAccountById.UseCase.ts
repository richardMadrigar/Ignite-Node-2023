import { IUsersRepository } from '../../../repositories/Users/IPrismaUsersRepository';
import { IDeleteAccountByIdDTO } from './DTO/IDeleteAccountByIdDTO';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteAccountByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, accessToken }: IDeleteAccountByIdDTO) {
    const isValidToken = accessToken?.split(' ')[1];

    if (isValidToken !== process.env.SECRET_DELETE) {
      throw new NotFoundException('Usuário não tem autorização');
    }

    const resultGet = await this.usersRepository.getById({ id });

    if (!resultGet) {
      throw new NotFoundException('Usuário não existe');
    }

    await this.usersRepository.deleteById({ id });

    return {
      message: 'success',
    };
  }
}
