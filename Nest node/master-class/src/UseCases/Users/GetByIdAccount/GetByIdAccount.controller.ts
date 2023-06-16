import { Controller, Get, Param } from '@nestjs/common';
import { IGetAccountByIdDTO } from './DTO/IGetByIdAccountDTO';
import { GetAccountByIdUseCase } from './GetByIdAccount.UseCase';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class GetAccountController {
  constructor(private getAccountByIdUseCase: GetAccountByIdUseCase) {}

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: String })
  async GetAccounts(@Param() Params: IGetAccountByIdDTO) {
    const { id } = Params;

    const resultGet = await this.getAccountByIdUseCase.execute({
      id,
    });

    return resultGet;
  }
}
