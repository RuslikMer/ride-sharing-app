import { IsString, IsOptional, IsDate, IsNumber, Min, Max } from 'class-validator';

export class FilterAdsDto {
  @IsString()
  @IsOptional()
  departureLocation?: string;

  @IsString()
  @IsOptional()
  destinationLocation?: string;

  @IsDate()
  @IsOptional()
  travelDate?: Date;

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceMin?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceMax?: number;
}