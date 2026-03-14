import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, Matches } from "class-validator";


export class InitPhoneChangeRequest {
  @ApiProperty({
    description: 'The phone to change',
    example: '+380991234567',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  @Matches(/^\+380\d{9}$/)
  phone: string;
}