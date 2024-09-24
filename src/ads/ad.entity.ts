import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Rating } from '../ratings/rating.entity';

@Entity('ads')
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lookingFor: string;

  @Column()
  departureCountry: string;

  @Column()
  departureCity: string;

  @Column()
  destinationCountry: string;

  @Column()
  destinationCity: string;

  @Column()
  departureDate: Date;

  @Column({ default: false })
  isAlreadyOnVacation: boolean;

  @Column()
  daysCount: number;

  @Column({ nullable: true })
  paymentOption?: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.ads)
  user: User;

  @OneToMany(() => Rating, (rating) => rating.ad)
  ratings: Rating[];
}