import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from './database/prisma.service';
import { CreateAccountController } from './UseCases/Users/Create/CreateAccount.controller';
import { CreateAccountUseCase } from './UseCases/Users/Create/CreateAccount.UseCase';
import { HttpModuleService } from './infra/HttpModule';
import { AllExceptionsFilter } from './shared/middleware/AllExceptionsFilter';
import { GetAccountsUseCase } from './UseCases/Users/Get/GetAccounts.UseCase';
import { GetAccountsController } from './UseCases/Users/Get/GetAccounts.controller';
import { GetAccountController } from './UseCases/Users/GetByIdAccount/GetByIdAccount.controller';
import { GetAccountByIdUseCase } from './UseCases/Users/GetByIdAccount/GetByIdAccount.UseCase';
import { DeleteAccountByIdUseCase } from './UseCases/Users/Delete/DeleteAccountById.UseCase';
import { DeleteAccountByIdController } from './UseCases/Users/Delete/DeleteAccountById.controller';
import { UpdateAccountController } from './UseCases/Users/Update/UpdateAccount.controller';
import { UpdateAccountUseCase } from './UseCases/Users/Update/UpdateAccount.UseCase';
import { HttpModuleServiceMethods } from './infra/HttpModule/types';
import { IUsersRepository } from './repositories/Users/IPrismaUsersRepository';
import { PrismaUsersRepository } from './repositories/Users/Prisma/PrismaUsersRepository';

@Module({
  imports: [HttpModule],

  controllers: [
    DeleteAccountByIdController,
    UpdateAccountController,
    CreateAccountController,
    GetAccountsController,
    GetAccountController,
  ],
  providers: [
    DeleteAccountByIdUseCase,
    GetAccountByIdUseCase,
    UpdateAccountUseCase,
    CreateAccountUseCase,
    GetAccountsUseCase,
    HttpModuleService,
    PrismaService,
    {
      provide: IUsersRepository, // quando alguém usar esse
      useClass: PrismaUsersRepository, // aplica essa dependência
    },
    {
      provide: HttpModuleServiceMethods, // quando alguém usar esse
      useClass: HttpModuleService, // aplica essa dependência
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
