import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type {
  AuthServiceClient,
  SendOtpRequest,
  VerifyOtpRequest,
  RefreshRequest,
} from '@cinema-project-lynx/contracts/gen/auth';
import type { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('AuthService');
  }

  sendOtp(request: SendOtpRequest) {
    return this.authService.sendOtp(request);
  }

  verifyOtp(request: VerifyOtpRequest) {
    return this.authService.verifyOtp(request);
  }

  refresh(request: RefreshRequest) {
    return this.authService.refresh(request);
  }
}
