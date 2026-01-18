import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Validate } from 'class-validator';
import { IdentifierValidator } from 'src/shared/validators';

export class SendOtpRequest {
  @ApiProperty({
    description: 'The identifier to send the OTP to',
    example: '+380991234567',
  })
  @IsString()
  @Validate(IdentifierValidator)
  identifier: string;

  @ApiProperty({
    description: 'The type of the identifier',
    enum: ['phone', 'email'],
    example: 'phone',
  })
  @IsEnum(['phone', 'email'])
  type: 'phone' | 'email';
}
