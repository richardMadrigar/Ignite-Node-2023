import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';

import { HttpModuleServiceInMemory } from '../../../../infra/HttpModule/inMemory/index.inMemory';
import { HttpModuleServiceMethods } from '../../../../infra/HttpModule/types';
import { PrismaUsersRepositoryInMemory } from '../../../../repositories/Users/inMemory/PrismaUsersRepository.inMemory';
import { IUsersRepository } from '../../../../repositories/Users/IPrismaUsersRepository';
import { DeleteAccountByIdUseCase } from '../DeleteAccountById.UseCase';
import { CreateAccountUseCase } from '../../Create/CreateAccount.UseCase';
import { ConfigModule } from '@nestjs/config';

const dataCreateUser = {
  acceptedTermsAndConditions: true,
  birthdate: new Date('2000-01-20'),
  email: 'reis souza',
  name: 'reis souza',
  password: '123456',
  zipcode: '03928220',
  document: '0123123',
};

describe('Delete Account useCase', () => {
  let useCaseDelete: DeleteAccountByIdUseCase;
  let useCaseCreate: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [
        DeleteAccountByIdUseCase,
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
    useCaseDelete = module.get<DeleteAccountByIdUseCase>(
      DeleteAccountByIdUseCase,
    );
  });

  it('should Delete Account By Id', async () => {
    const resultCreate = await useCaseCreate.execute(dataCreateUser);

    const resultGet = await useCaseDelete.execute({
      id: resultCreate.id,
      accessToken: 'Bearer meegu',
    });

    expect(resultGet.message).toBe('success');
  });
});
