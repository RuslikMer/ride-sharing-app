import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateAdDto {
  @IsString()
  @IsNotEmpty()
  readonly lookingFor: string;

  @IsString()
  @IsNotEmpty()
  readonly departureCountry: string;

  @IsString()
  @IsNotEmpty()
  readonly departureCity: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationCountry: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationCity: string;

  @IsNumber()
  @IsNotEmpty()
  readonly departureDate: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isAlreadyOnVacation: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly daysCount: number;

  @IsString()
  @IsOptional()
  readonly paymentOption?: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}