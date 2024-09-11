import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from './ad.entity';  // Убедитесь, что путь к `ad.entity` правильный
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ad])],
  providers: [AdsService],
  controllers: [AdsController],
  exports: [AdsService],  // Если `AdsService` нужен в других модулях
})
export class AdsModule {}