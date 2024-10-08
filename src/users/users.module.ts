import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CloudinaryModule,
  ],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // Экспортируем UsersService, чтобы другие модули могли его использовать
  controllers: [UsersController],
})
export class UsersModule {}