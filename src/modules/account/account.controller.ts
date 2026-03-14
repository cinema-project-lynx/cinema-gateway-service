import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountClientGrpc } from './account.grpc';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser, Protected } from 'src/shared/decorators';
import { ConfirmEmailChangeResponse, ConfirmPhoneChangeResponse, InitEmailChangeResponse, InitPhoneChangeResponse, Role } from '@cinema-project-lynx/contracts/gen/account';
import { Body } from '@nestjs/common';
import { ConfirmEmailChangeRequest, ConfirmPhoneChangeRequest, InitEmailChangeRequest, InitPhoneChangeRequest } from './dto';

@Controller('account')
export class AccountController {
  constructor(private readonly client: AccountClientGrpc) {}
  
  @Post('/email/init')
  @ApiOperation({ summary: 'Init email change', description: 'Sends confirmation code to the new email' })
  @ApiBearerAuth()
  @Protected()
  async initEmailChange(
    @Body() dto: InitEmailChangeRequest,
    @CurrentUser() userId: string
  ): Promise<InitEmailChangeResponse> {
    return await this.client.initEmailChange({...dto, userId});
  }

  @Post('/email/confirm')
  @ApiOperation({ summary: 'Confirm email change', description: 'Confirms the new email' })
  @ApiBearerAuth()
  @Protected()
  async confirmEmailChange(
    @Body() dto: ConfirmEmailChangeRequest,
    @CurrentUser() userId: string
  ): Promise<ConfirmEmailChangeResponse> {
    return await this.client.confirmEmailChange({...dto, userId});
  }

  @Post('/phone/init')
  @ApiOperation({ summary: 'Init phone change', description: 'Sends confirmation code to the new phone' })
  @ApiBearerAuth()
  @Protected()
  async initPhoneChange(
    @Body() dto: InitPhoneChangeRequest,
    @CurrentUser() userId: string
  ): Promise<InitPhoneChangeResponse> {
    return await this.client.initPhoneChange({...dto, userId});
  }

  @Post('/phone/confirm')
  @ApiOperation({ summary: 'Confirm phone change', description: 'Confirms the new phone' })
  @ApiBearerAuth()
  @Protected()
  async confirmPhoneChange(
    @Body() dto: ConfirmPhoneChangeRequest,
    @CurrentUser() userId: string
  ): Promise<ConfirmPhoneChangeResponse> {
    return await this.client.confirmPhoneChange({...dto, userId});
  }
}
