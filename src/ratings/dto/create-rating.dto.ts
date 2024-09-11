import { IsNumber, IsNotEmpty, Min, Max, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly userId: string; // ID пользователя, которому ставят рейтинг

  @IsString()
  @IsNotEmpty()
  readonly adId: string; // ID объявления, к которому относится рейтинг

  @IsString()
  @IsNotEmpty()
  readonly comment: string; // Комментарий к рейтингу (опционально)
}