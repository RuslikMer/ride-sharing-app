import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Rating } from '../ratings/rating.entity';

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  departureDate: Date;

  @Column()
  destination: string;

  @Column()
  seatsAvailable: number;

  @ManyToOne(() => User, (user) => user.ads)
  user: User;

  @OneToMany(() => Rating, (rating) => rating.ad)
  ratings: Rating[];
}