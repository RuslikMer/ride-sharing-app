import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Создание нового сообщения
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  // Получение сообщения по ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Message> {
    return this.messagesService.findOne(id);
  }

  // Обновление сообщения по ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto): Promise<Message> {
    return this.messagesService.update(id, updateMessageDto);
  }

  // Удаление сообщения по ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.messagesService.remove(id);
  }
}