import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmotionLog } from '../../database/entities/emotion-log.entity';
import { CreateEmotionLogDto } from './dto/create-emotion-log.dto';
import { DotService } from '../dot/dot.service';

@Injectable()
export class EmotionLogService {
  constructor(
    @InjectRepository(EmotionLog)
    private emotionLogRepository: Repository<EmotionLog>,
    private dotService: DotService,
  ) {}

  async create(
    createEmotionLogDto: CreateEmotionLogDto,
    emotionDotPattern: number[][],
  ): Promise<EmotionLog> {
    const dotArt = this.dotService.generateDot(emotionDotPattern);

    const emotionLog = this.emotionLogRepository.create({
      ...createEmotionLogDto,
      dotArt,
    });

    return this.emotionLogRepository.save(emotionLog);
  }

  async findAll(userId: string, page = 1, limit = 10): Promise<[EmotionLog[], number]> {
    return this.emotionLogRepository.findAndCount({
      where: { userId },
      relations: ['emotion'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<EmotionLog | null> {
    return this.emotionLogRepository.findOne({
      where: { id },
      relations: ['emotion'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.emotionLogRepository.delete(id);
  }
}
