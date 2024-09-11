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
    const ad = this.adsRepository.create(createAdDto);
    return this.adsRepository.save(ad);
  }

  async update(id: number, updateAdDto: any): Promise<void> {
    await this.adsRepository.update(id, updateAdDto);
  }

  async remove(id: number): Promise<void> {
    await this.adsRepository.delete(id);
  }
}