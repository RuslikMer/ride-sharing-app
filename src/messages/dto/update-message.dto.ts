import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsNumber()
  readonly senderId?: number;

  @IsOptional()
  @IsNumber()
  readonly receiverId?: number;

  @IsOptional()
  @IsString()
  readonly message?: string;
}