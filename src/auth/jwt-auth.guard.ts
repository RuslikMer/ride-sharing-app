import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  // Переопределяем canActivate, чтобы добавить дополнительные проверки или логирование
  canActivate(context: ExecutionContext): boolean {
    console.log('Checking JWT auth...');
    const request = context.switchToHttp().getRequest();
    
    // Логирование токена из запроса, если нужно
    const token = request.headers.authorization?.split(' ')[1];
    console.log('Received Token:', token);

    return super.canActivate(context) as boolean;
  }

  // Переопределяем handleRequest, чтобы добавить подробное логирование ошибок
  handleRequest(err: any, user: any, info: any): any {
    if (err || !user) {
      // Логируем причину ошибки
      console.error('JWT auth failed:', err, info);

      // Проверка причины ошибки
      if (info && info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      } else if (info && info.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }

      // Общая ошибка для прочих случаев
      throw new UnauthorizedException('Authentication failed');
    }

    // Логирование успешной аутентификации
    console.log('JWT auth successful for user:', user);
    return user;
  }
}