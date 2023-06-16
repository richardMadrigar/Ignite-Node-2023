import {
  IVerifyIfEmailEqualWithId,
  IGetUserByEmail,
  IUsersRepository,
  IGetUserById,
  IDeleteById,
  IUpdateUser,
  ICreateUser,
  ICreateReturn,
} from '../IPrismaUsersRepository';
import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IGetAccountsDTO } from '../../../UseCases/Users/Get/DTO/IGetAccountsDTO';

@Injectable()
export class PrismaUsersRepositoryInMemory implements IUsersRepository {
  users: Users[] = [];

  async update(data: IUpdateUser): Promise<void> {
    this.users = this.users.filter((item) => item.id !== data.id);
    this.users.push({
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }

  async VerifyIfEmailEqualWithId(
    data: IVerifyIfEmailEqualWithId,
  ): Promise<Users> {
    const result = this.users.filter(
      (item) => item.email === data.email && item.id !== data.id,
    )[0];

    return result;
  }

  async deleteById(data: IDeleteById): Promise<void> {
    const resultReleases = this.users.filter((item) => item.id === data.id);

    const indexValue = this.users.indexOf(resultReleases[0]);

    this.users.splice(indexValue, 1);
  }

  async getById(data: IGetUserById): Promise<Users> {
    const resultGet = this.users.find((item) => item.id === data.id);

    return resultGet;
  }

  async getAll(data?: IGetAccountsDTO): Promise<Users[]> {
    const resultGet = this.users.filter((item) =>
      item.name.includes(data.name),
    );

    return resultGet;
  }

  async getByEmail(data: IGetUserByEmail): Promise<Users> {
    const resultGet = await this.users.find(
      (item) => item.email === data.email,
    );

    return resultGet;
  }

  async create(data: ICreateUser): Promise<ICreateReturn> {
    const id = randomUUID();
    this.users.push({
      ...data,
      id,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    return {
      id,
    };
  }
}
