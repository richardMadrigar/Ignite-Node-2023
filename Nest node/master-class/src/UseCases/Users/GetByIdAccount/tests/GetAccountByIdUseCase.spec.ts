import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';

import { HttpModuleServiceInMemory } from '../../../../infra/HttpModule/inMemory/index.inMemory';
import { HttpModuleServiceMethods } from '../../../../infra/HttpModule/types';
import { PrismaUsersRepositoryInMemory } from '../../../../repositories/Users/inMemory/PrismaUsersRepository.inMemory';
import { IUsersRepository } from '../../../../repositories/Users/IPrismaUsersRepository';
import { CreateAccountUseCase } from '../../Create/CreateAccount.UseCase';
import { GetAccountByIdUseCase } from '../GetByIdAccount.UseCase';

const dataCreateUser = {
  acceptedTermsAndConditions: true,
  birthdate: new Date('2000-01-20'),
  email: 'reis souza',
  name: 'reis souza',
  password: '123456',
  zipcode: '03928220',
  document: '0123123',
};

describe('GetAccountById useCase', () => {
  let useCaseGet: GetAccountByIdUseCase;
  let useCaseCreate: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GetAccountByIdUseCase,
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

    useCaseCreate = module.get<CreateAccountUseCase>(CreateAccountUseCase);
    useCaseGet = module.get<GetAccountByIdUseCase>(GetAccountByIdUseCase);
  });

  it('should get Account by id', async () => {
    const resultCreate = await useCaseCreate.execute(dataCreateUser);

    const resultGet = await useCaseGet.execute({
      id: resultCreate.id,
    });

    const accounts = resultGet.account;

    expect(accounts).toHaveProperty('id');
    expect(accounts.state).toBeDefined();
    expect(accounts.password).toBeDefined();
    expect(accounts.createdAt).toBeDefined();
    expect(accounts.street).toBeDefined();
    expect(accounts.zipcode).toEqual(Number(dataCreateUser.zipcode));
    expect(accounts.email).toEqual(dataCreateUser.email);
    expect(accounts.name).toEqual(dataCreateUser.name);
    expect(accounts.acceptedTermsAndConditions).toEqual(
      dataCreateUser.acceptedTermsAndConditions,
    );
  });
});
