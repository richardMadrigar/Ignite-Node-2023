import { Test, TestingModule } from '@nestjs/testing';

import { CreateAccountUseCase } from '../CreateAccount.UseCase';
import { HttpModule } from '@nestjs/axios';

import { HttpModuleServiceInMemory } from '../../../../infra/HttpModule/inMemory/index.inMemory';
import { HttpModuleServiceMethods } from '../../../../infra/HttpModule/types';
import { PrismaUsersRepositoryInMemory } from '../../../../repositories/Users/inMemory/PrismaUsersRepository.inMemory';
import { IUsersRepository } from '../../../../repositories/Users/IPrismaUsersRepository';

describe('CreateAccount useCase', () => {
  let useCase: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CreateAccountUseCase,
        HttpModuleServiceInMemory,
        {
          provide: IUsersRepository,
          useClass: PrismaUsersRepositoryInMemory,
        },
        {
          provide: HttpModuleServiceMethods,
          useClass: HttpModuleServiceInMemory,
        },
      ],
    }).compile();

    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it('should create Account success', async () => {
    const resultCreate = await useCase.execute({
      acceptedTermsAndConditions: true,
      birthdate: new Date('2000-01-20'),
      email: 'reis souza',
      name: 'reis souza',
      password: '123456',
      zipcode: '03928220',
      document: '0123123',
    });

    expect(resultCreate.message).toBe('success');
  });
});
