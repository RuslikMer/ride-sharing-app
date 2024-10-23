import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('messages')
@UseGuards(JwtAuthGuard)  // Чат доступен только для авторизованных пользователей
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post(':receiverId')
  async sendMessage(
    @CurrentUser() sender: User,
    @Param('receiverId') receiverId: number,
    @Body('content') content: string,
  ) {
    console.log('Received request to send message:', { sender, receiverId, content });
    const receiver = await this.messageService.findUserById(receiverId);
    return this.messageService.sendMessage(sender, receiver, content);
  }

  @Get(':receiverId')
  async getChatHistory(
    @CurrentUser() user: User,
    @Param('receiverId') receiverId: number,
  ) {
    return this.messageService.getChatHistory(user.id, receiverId);
  }
}