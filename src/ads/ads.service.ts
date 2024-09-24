import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './ad.entity';
import { CreateAdDto } from './dto/create-ad.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adsRepository: Repository<Ad>,
  ) {}

  async findAll(): Promise<Ad[]> {
    return this.adsRepository.find();
  }

  async findOne(id: number): Promise<Ad> {
    return this.adsRepository.findOne({ where: { id } });
  }

  async create(createAdDto: CreateAdDto): Promise<Ad> {
    try {
      const ad = this.adsRepository.create(createAdDto);
      return await this.adsRepository.save(ad);
    } catch (error) {
      console.error('Error creating ad:', error);
      throw new Error('Error creating ad');
    }
  }

  async update(id: number, updateAdDto: any): Promise<void> {
    try {
      await this.adsRepository.update(id, updateAdDto);
    } catch (error) {
      console.error('Error updating ad:', error);
      throw new Error('Error updating ad');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.adsRepository.delete(id);
    } catch (error) {
      console.error('Error removing ad:', error);
      throw new Error('Error removing ad');
    }
  }
}