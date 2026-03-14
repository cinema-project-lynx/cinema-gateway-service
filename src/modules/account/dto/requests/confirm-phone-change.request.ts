import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, Length, Matches } from "class-validator";

    
export class ConfirmPhoneChangeRequest {
  @ApiProperty({
    description: 'The phone to change',
    example: '+380991234567',
  })
  @IsNotEmpty()
  @Matches(/^\+380\d{9}$/)
  phone: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}   