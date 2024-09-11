import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
  ) {}

  // Создание новой оценки
  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingsRepository.create(createRatingDto);
    return this.ratingsRepository.save(rating);
  }

  // Получение всех оценок
  async findAll(): Promise<Rating[]> {
    return this.ratingsRepository.find();
  }

  // Получение оценки по ID
  async findOne(id: number): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne({
      where: { id },
      relations: ['user'], // Загружаем связанные сущности
    });
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    return rating;
  }

  // Обновление оценки по ID
  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.findOne(id); // Проверяем существование оценки
    Object.assign(rating, updateRatingDto); // Обновляем поля
    return this.ratingsRepository.save(rating);
  }

  // Удаление оценки по ID
  async remove(id: number): Promise<void> {
    const result = await this.ratingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
  }
}