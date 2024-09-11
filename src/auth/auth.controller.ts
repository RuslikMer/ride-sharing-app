import { Controller, Post, Get, UseGuards, Request, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Проброс ошибки, чтобы она обрабатывалась глобально
    }
  }

  // Новый маршрут для получения профиля
  @Get('profile')
  @UseGuards(JwtAuthGuard) // Используем JWT Guard для защиты маршрута
  getProfile(@Request() req) {
    return req.user; // Возвращаем информацию о пользователе
  }
}