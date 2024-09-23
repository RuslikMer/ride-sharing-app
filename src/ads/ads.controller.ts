import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createAdDto: CreateAdDto) {
    try {
      return await this.adsService.create(createAdDto);
    } catch (error) {
      console.error('Error in AdsController:', error);
      throw new Error('Failed to create ad');
    }
  }

  @Get()
  async findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.adsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateAdDto: UpdateAdDto) {
    try {
      return await this.adsService.update(id, updateAdDto);
    } catch (error) {
      console.error('Error in AdsController:', error);
      throw new Error('Failed to update ad');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    try {
      return await this.adsService.remove(id);
    } catch (error) {
      console.error('Error in AdsController:', error);
      throw new Error('Failed to remove ad');
    }
  }
}