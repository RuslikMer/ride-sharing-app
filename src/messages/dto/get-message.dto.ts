import { IsNumber, IsString, IsOptional } from 'class-validator';

export class GetMessageDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

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