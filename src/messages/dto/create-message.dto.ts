import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  readonly senderId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly receiverId: number;

  @IsString()
  @IsNotEmpty()
  readonly message: string;
}