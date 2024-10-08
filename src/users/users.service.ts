import { Injectable, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    try {
      const user = this.usersRepository.create({
        username,
        email,
        password,
      });
      console.log('User to be saved:', user);
      const savedUser = await this.usersRepository.save(user);
      console.log('User saved:', savedUser);

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      }
      throw new Error('Failed to create user');
    }
  }

  async update(id: number, updateUserDto: any): Promise<void> {
    await this.usersRepository.update(id, updateUserDto);
  }

  // Обновление профиля с загрузкой фото
  async updateProfilePicture(id: number, file: Express.Multer.File): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file.buffer);
    user.profilePicture = uploadResult.secure_url;

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}