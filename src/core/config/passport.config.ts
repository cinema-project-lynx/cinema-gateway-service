import { ConfigService } from '@nestjs/config';
import { PassportOptions } from '@cinema-project-lynx/passport';

export function getPasportConfig(
  configService: ConfigService,
): PassportOptions {
  return {
    secretKey: configService.getOrThrow<string>('PASSPORT_SECRET_KEY'),
  };
}
