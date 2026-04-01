import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emotion } from '../../database/entities/emotion.entity';

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion)
    private emotionRepository: Repository<Emotion>,
  ) {}

  async findAll(): Promise<Emotion[]> {
    return this.emotionRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Emotion | null> {
    return this.emotionRepository.findOne({ where: { id } });
  }
}
