import * as dayjs from 'dayjs';

import { IUpdateAccountDTO } from './DTO/IUpdateAccountDTO';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '../../../repositories/Users/IPrismaUsersRepository';
import { HttpModuleServiceMethods } from '../../../infra/HttpModule/types';

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    private httpModuleService: HttpModuleServiceMethods,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    acceptedTermsAndConditions,
    birthdate,
    password,
    document,
    zipcode,
    email,
    name,
    id,
  }: IUpdateAccountDTO) {
    if (dayjs().diff(birthdate, 'year') < 18) {
      throw new NotFoundException('Você precisa ter 18 anos');
    }

    const resultGetByEmail =
      await this.usersRepository.VerifyIfEmailEqualWithId({
        email,
        id,
      });
    if (resultGetByEmail) {
      throw new NotFoundException('Usuário com este email já existe');
    }

    const resGetAddressByCep = await this.httpModuleService.getAddressByCep(
      zipcode,
    );

    await this.usersRepository.update({
      neighborhood: resGetAddressByCep.bairro,
      street: resGetAddressByCep.logradouro,
      city: resGetAddressByCep.localidade,
      birthdate: new Date(birthdate),
      state: resGetAddressByCep.uf,
      acceptedTermsAndConditions,
      zipcode: Number(zipcode),
      document,
      password,
      email,
      name,
      id,
    });

    return {
      message: 'success',
    };
  }
}
