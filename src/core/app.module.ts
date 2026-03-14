import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AccountModule } from 'src/modules/account/account.module';
import { PassportModule } from '@cinema-project-lynx/passport';
import { ConfigService } from '@nestjs/config';
import { getPasportConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AccountModule,
    PassportModule.registerAsync({
      useFactory: getPasportConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
