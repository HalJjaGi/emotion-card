import { Controller, Get, Param } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { Emotion } from '../../database/entities/emotion.entity';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Get()
  async findAll(): Promise<Emotion[]> {
    return this.emotionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Emotion | null> {
    return this.emotionsService.findOne(id);
  }
}
