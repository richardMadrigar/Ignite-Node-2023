import { Body, Controller, Put, Param } from '@nestjs/common';
import { IUpdateAccountDTO } from './DTO/IUpdateAccountDTO';
import { UpdateAccountUseCase } from './UpdateAccount.UseCase';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class UpdateAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  @Put(':id')
  @ApiParam({ name: 'id', required: true, type: String })
  async UpdateAccount(
    @Body() body: IUpdateAccountDTO,
    @Param() Params: { id: string },
  ) {
    const {
      acceptedTermsAndConditions,
      birthdate,
      document,
      password,
      zipcode,
      email,
      name,
    } = body;

    const resultUpdate = await this.updateAccountUseCase.execute({
      acceptedTermsAndConditions,
      id: Params.id,
      birthdate,
      document,
      password,
      zipcode,
      email,
      name,
    });

    return resultUpdate;
  }
}
