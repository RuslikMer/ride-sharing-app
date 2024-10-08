import { DataSource } from 'typeorm';
import { Ad } from './src/ads/ad.entity';
import { User } from './src/users/user.entity'; // Убедитесь, что путь корректный
import { Rating } from './src/ratings/rating.entity';
import { Message } from './src/messages/message.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Ad, User, Rating, Message], // Все сущности должны быть здесь
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});