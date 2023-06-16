import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';

import { HttpModuleServiceInMemory } from '../../../../infra/HttpModule/inMemory/index.inMemory';
import { HttpModuleServiceMethods } from '../../../../infra/HttpModule/types';
import { PrismaUsersRepositoryInMemory } from '../../../../repositories/Users/inMemory/PrismaUsersRepository.inMemory';
import { IUsersRepository } from '../../../../repositories/Users/IPrismaUsersRepository';
import { GetAccountsUseCase } from '../GetAccounts.UseCase';
import { CreateAccountUseCase } from '../../Create/CreateAccount.UseCase';

const dataCreateUser = {
  acceptedTermsAndConditions: true,
  birthdate: new Date('2000-01-20'),
  email: 'reis souza',
  name: 'reis souza',
  password: '123456',
  zipcode: '03928220',
  document: '0123123',
};

describe('GetAccount useCase', () => {
  let useCaseGet: GetAccountsUseCase;
  let useCaseCreate: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GetAccountsUseCase,
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
    useCaseGet = module.get<GetAccountsUseCase>(GetAccountsUseCase);
  });

  it('should get Account', async () => {
    await useCaseCreate.execute(dataCreateUser);

    const resultGet = await useCaseGet.execute({
      name: '',
    });

    const accounts = resultGet.data.accounts[0];

    expect(accounts).toHaveProperty('id');
    expect(accounts.state).toBeDefined();
    expect(accounts.password).toBeDefined();
    expect(accounts.street).toBeDefined();
    expect(accounts.name).toEqual(dataCreateUser.name);
    expect(accounts.createdAt).toBeDefined();
    expect(accounts.acceptedTermsAndConditions).toEqual(
      dataCreateUser.acceptedTermsAndConditions,
    );
  });
});
