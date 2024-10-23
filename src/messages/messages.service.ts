import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';
import 'dotenv/config';

@Injectable()
export class MessagesService {
  private readonly encryptionKey: string;

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.encryptionKey = process.env.ENCRYPTION_KEY;
  }

  encrypt(text: string): string {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return iv.toString('hex') + ':' + encrypted; // Вернем IV и зашифрованный текст
  }

  decrypt(text: string): string {
      const [iv, encryptedText] = text.split(':');
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
  }

  async sendMessage(sender: User, receiver: User, content: string): Promise<Message> {
    const message = new Message();
    message.sender = sender;
    message.receiver = receiver;
    message.encryptedContent = this.encrypt(content); // шифруем текст сообщения
    message.sentAt = new Date();
    
    return await this.messageRepository.save(message);
  }

  async getChatHistory(senderId: number, receiverId: number): Promise<any[]> {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId } },
        { sender: { id: receiverId }, receiver: { id: senderId } },
      ],
      order: { sentAt: 'ASC' },
    });
  
    // Расшифруем сообщения перед возвращением
    return messages.map(message => ({
      ...message,
      content: this.decrypt(message.encryptedContent), // расшифруем
    }));
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}