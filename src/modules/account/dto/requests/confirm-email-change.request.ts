import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";


export class ConfirmEmailChangeRequest {
  @ApiProperty({
    description: 'The email to change',
    example: 'test@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}   