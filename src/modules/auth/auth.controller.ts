import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthClientGrpc } from './auth.grpc';
import { SendOtpRequest } from './dto';
import { VerifyOtpRequest } from './dto';
import type { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';``
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly client: AuthClientGrpc,
    private readonly configService: ConfigService
  ) {}

  @Post('otp/send')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpRequest) {
    return this.client.sendOtp(dto);
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() dto: VerifyOtpRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, accessToken } = await lastValueFrom(
      this.client.verifyOtp(dto),
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
      domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  
    return accessToken;
  }

  @ApiOperation({ 
    summary: 'Refresh the access token', 
    description: 'Refresh the access token by sending the refresh token in the cookies'
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refreshToken;
    const { accessToken, refreshToken: newRefreshToken  } = await lastValueFrom(
      this.client.refresh({ refreshToken }),
    );

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
      domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @ApiOperation({ 
    summary: 'Logout the user', 
    description: 'Logout the user by deleting the refresh token from the cookies' 
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response
  ) { 
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
      domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
      sameSite: 'lax',
      expires: new Date(0),
    });

    return { ok: true }
  }

}
