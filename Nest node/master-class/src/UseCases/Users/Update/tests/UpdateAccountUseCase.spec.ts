import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';

import { HttpModuleServiceInMemory } from '../../../../infra/HttpModule/inMemory/index.inMemory';
import { HttpModuleServiceMethods } from '../../../../infra/HttpModule/types';
import { PrismaUsersRepositoryInMemory } from '../../../../repositories/Users/inMemory/PrismaUsersRepository.inMemory';
import { IUsersRepository } from '../../../../repositories/Users/IPrismaUsersRepository';
import { UpdateAccountUseCase } from '../UpdateAccount.UseCase';
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

const dataCreateUserUpdate = {
  acceptedTermsAndConditions: true,
  birthdate: new Date('2000-01-20'),
  email: 'reis souza',
  name: 'reis souza',
  password: '123456',
  zipcode: '03928220',
  document: '0123123',
};

describe('Update Account useCase', () => {
  let useCaseGet: UpdateAccountUseCase;
  let useCaseCreate: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UpdateAccountUseCase,
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
    useCaseGet = module.get<UpdateAccountUseCase>(UpdateAccountUseCase);
  });

  it('should get Account', async () => {
    const resultCreate = await useCaseCreate.execute(dataCreateUser);

    const resultGet = await useCaseGet.execute({
      id: resultCreate.id,
      ...dataCreateUserUpdate,
    });

    expect(resultGet.message).toBe('success');
  });
});
