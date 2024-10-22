import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext): boolean {
    console.log('Checking JWT auth...');
    return super.canActivate(context) as boolean;
  }

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

      throw new UnauthorizedException();
    }

    // Логирование успешной аутентификации
    console.log('JWT auth successful for user:', user);
    return user;
  }
}