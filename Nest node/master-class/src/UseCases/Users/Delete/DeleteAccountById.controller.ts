import { Controller, Delete, Param, Req } from '@nestjs/common';
import { IDeleteAccountByIdDTO } from './DTO/IDeleteAccountByIdDTO';
import { DeleteAccountByIdUseCase } from './DeleteAccountById.UseCase';
import { Request } from 'express';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('Account')
@ApiBearerAuth()
export class DeleteAccountByIdController {
  constructor(private deleteAccountByIdUseCase: DeleteAccountByIdUseCase) {}
  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: String })
  async GetAccounts(
    @Param() Params: IDeleteAccountByIdDTO,
    @Req() request: Request,
  ) {
    const { id } = Params;
    const accessToken = request.headers.authorization;

    const resultDelete = await this.deleteAccountByIdUseCase.execute({
      id,
      accessToken,
    });

    return resultDelete;
  }
}
