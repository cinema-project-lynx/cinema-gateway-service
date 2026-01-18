import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HealthResponse } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Welcome to the Gateway Service',
    description: 'This is the welcome message for the Gateway Service',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Health check',
    description: 'This is the health check for the Gateway Service',
  })
  @ApiOkResponse({
    type: HealthResponse,
  })
  @Get('health')
  health() {
    return this.appService.health();
  }
}
