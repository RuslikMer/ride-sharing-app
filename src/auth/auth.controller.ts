import { Controller, Post, Get, UseGuards, Request, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';  // Guards для логина через email и password
import { JwtAuthGuard } from './jwt-auth.guard';  // Guard для защиты маршрутов с JWT
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Логин через email и password
  @Post('login')
  @UseGuards(LocalAuthGuard) // Используем LocalAuthGuard для логина
  async login(@Request() req) {
    return this.authService.login(req.user); // Регистрируем токен для пользователя, если аутентификация успешна
  }

  // Регистрация нового пользователя
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto); // Регистрация нового пользователя
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Проброс ошибки
    }
  }

  // Маршрут для получения профиля пользователя (защищенный)
  @Get('profile')
  @UseGuards(JwtAuthGuard) // Используем JwtAuthGuard для защиты маршрута
  getProfile(@Request() req) {
    return req.user; // Возвращаем информацию о пользователе, если токен валидный
  }
}