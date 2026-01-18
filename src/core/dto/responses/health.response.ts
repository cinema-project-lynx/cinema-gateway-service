import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({
    description: 'The status of the health check',
    example: 'ok',
  })
  status: string;

  @ApiProperty({
    description: 'The timestamp of the health check',
    example: '2021-01-01T00:00:00.000Z',
  })
  timestamp: string;
}
