import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AccountClientGrpc } from './account.grpc';
import { AuthGuard } from 'src/shared/guards';
import { PROTO_PATHS } from '@cinema-project-lynx/contracts';
import { RolesGuard } from 'src/shared/guards';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ACCOUNT_PACKAGE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'account.v1',
            protoPath:
              PROTO_PATHS.ACCOUNT,
            url: configService.getOrThrow<string>('ACCOUNT_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountClientGrpc, AuthGuard, RolesGuard],
})
export class AccountModule {}
