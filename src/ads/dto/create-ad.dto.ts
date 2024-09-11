import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateAdDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @IsNotEmpty()
  readonly travelDate: Date;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  readonly availableSeats: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly departureLocation: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationLocation: string;
}