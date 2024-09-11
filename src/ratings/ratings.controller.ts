import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './rating.entity';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // Создание новой оценки
  @Post()
  async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsService.create(createRatingDto);
  }

  // Получение всех оценок
  @Get()
  async findAll(): Promise<Rating[]> {
    return this.ratingsService.findAll();
  }

  // Получение оценки по ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rating> {
    return this.ratingsService.findOne(id);
  }

  // Обновление оценки по ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRatingDto: UpdateRatingDto): Promise<Rating> {
    return this.ratingsService.update(id, updateRatingDto);
  }

  // Удаление оценки по ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.ratingsService.remove(id);
  }
}