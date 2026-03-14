import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type {
  AccountServiceClient,
  ConfirmEmailChangeRequest,
  ConfirmEmailChangeResponse,
  ConfirmPhoneChangeRequest,
  ConfirmPhoneChangeResponse,
  GetAccountRequest,
  GetAccountResponse,
  InitEmailChangeRequest,
  InitEmailChangeResponse,
  InitPhoneChangeRequest,
  InitPhoneChangeResponse,
} from '@cinema-project-lynx/contracts/gen/account';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
  private accountService: AccountServiceClient;

  constructor(@Inject('ACCOUNT_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.accountService =
      this.client.getService<AccountServiceClient>('AccountService');
  }

  getAccount(request: GetAccountRequest): Promise<GetAccountResponse> {
    return lastValueFrom(this.accountService.getAccount(request));
  }

  initEmailChange(request: InitEmailChangeRequest): Promise<InitEmailChangeResponse> {
    return lastValueFrom(this.accountService.initEmailChange(request));
  }

  confirmEmailChange(request: ConfirmEmailChangeRequest): Promise<ConfirmEmailChangeResponse> {
    return lastValueFrom(this.accountService.confirmEmailChange(request));
  }

  initPhoneChange(request: InitPhoneChangeRequest): Promise<InitPhoneChangeResponse> {  
    return lastValueFrom(this.accountService.initPhoneChange(request));
  }

  confirmPhoneChange(request: ConfirmPhoneChangeRequest): Promise<ConfirmPhoneChangeResponse> {
    return lastValueFrom(this.accountService.confirmPhoneChange(request));
  }
}
