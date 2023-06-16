import * as dayjs from 'dayjs';

import { ICreateUserDTO } from './DTO/ICreateAccountDTO';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpModuleServiceMethods } from '../../../infra/HttpModule/types';
import { IUsersRepository } from '../../../repositories/Users/IPrismaUsersRepository';

@Injectable()
export class CreateAccountUseCase {
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
  }: ICreateUserDTO) {
    if (dayjs().diff(birthdate, 'year') < 18) {
      throw new NotFoundException('Você precisa ter 18 anos');
    }

    const resultGetByEmail = await this.usersRepository.getByEmail({
      email,
    });
    if (resultGetByEmail) {
      throw new NotFoundException('Usuário com este email já existe');
    }
    const resGetAddressByCep = await this.httpModuleService.getAddressByCep(
      zipcode,
    );

    const resultCreate = await this.usersRepository.create({
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
    });

    return {
      message: 'success',
      id: resultCreate.id,
    };
  }
}
