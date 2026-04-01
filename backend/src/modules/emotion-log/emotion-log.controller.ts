import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { EmotionLogService } from './emotion-log.service';
import { CreateEmotionLogDto } from './dto/create-emotion-log.dto';
import { Emotion } from '../../database/entities/emotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('emotion-log')
export class EmotionLogController {
  constructor(
    private readonly emotionLogService: EmotionLogService,
    @InjectRepository(Emotion)
    private emotionRepository: Repository<Emotion>,
  ) {}

  @Post()
  async create(@Body() createEmotionLogDto: CreateEmotionLogDto) {
    const emotion = await this.emotionRepository.findOne({
      where: { id: createEmotionLogDto.emotionId },
    });

    if (!emotion) {
      throw new NotFoundException('Emotion not found');
    }

    return this.emotionLogService.create(createEmotionLogDto, emotion.dotPattern || []);
  }

  @Get('timeline')
  async getTimeline(
    @Query('userId') userId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.emotionLogService.findAll(
      userId,
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.emotionLogService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.emotionLogService.remove(id);
    return { message: 'Emotion log deleted successfully' };
  }
}
