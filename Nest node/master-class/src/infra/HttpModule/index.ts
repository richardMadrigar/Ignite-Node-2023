import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { HttpModuleServiceMethods, IViaCepResponse } from './types';

@Injectable()
export class HttpModuleService implements HttpModuleServiceMethods {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<IViaCepResponse> {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;

      const responseGet = this.httpService.get(url);
      const response = await lastValueFrom(responseGet);

      return response.data;
    } catch (error) {
      if (error.response.status) {
        throw new NotFoundException('Cep não encontrado');
      }
    }
  }
}
