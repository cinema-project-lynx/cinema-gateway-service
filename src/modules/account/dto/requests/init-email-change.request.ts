import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class InitEmailChangeRequest {
  @ApiProperty({
    description: 'The email to change',
    example: 'test@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}