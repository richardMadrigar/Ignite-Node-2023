import { Injectable, NotFoundException } from '@nestjs/common';

import { IViaCepResponse } from '../types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpModuleServiceInMemory {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<IViaCepResponse> {
    try {
      const returnData: IViaCepResponse = {
        bairro: 'abc',
        cep,
        complemento: 'aa',
        localidade: 'asjhdbvasjh',
        logradouro: 'kjabsduisa',
        uf: 'sp',
        ddd: '123',
        gia: '124',
        ibge: '12341',
        siafi: '12312',
      };

      return returnData;
    } catch (error) {
      if (error.response.status) {
        throw new NotFoundException('Cep não encontrado');
      }
    }
  }
}
