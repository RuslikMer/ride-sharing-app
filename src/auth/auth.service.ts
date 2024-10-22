import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('Login user:', user);
    console.log('JWT Secret:', process.env.JWT_SECRET);
    const payload = { username: user.username, sub: user.id };
    console.log('JWT_SECRET during token creation:', process.env.JWT_SECRET);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async register(createUserDto: CreateUserDto): Promise<User> {
    console.log('DTO received:', createUserDto);
  
    const { username, email, password} = createUserDto;
  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
  
    try {
      const newUser = await this.usersService.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log('User created:', newUser);
      return newUser;
    } catch (error) {
      console.error('Error in AuthService register:', error);
      throw error;
    }
  }
}