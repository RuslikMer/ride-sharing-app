import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    console.log('JwtStrategy initialized');
    console.log('JWT_SECRET from env:', process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // Используй переменные окружения для секретного ключа
    });
  }

  async validate(payload: any): Promise<User> {
    console.log('JWT Secret:', process.env.JWT_SECRET);
    console.log('Payload from JWT:', payload);
    const user = await this.usersService.findOne(payload.sub); // payload.sub - ID пользователя из токена
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('User found:', user);
    return user;
  }
}