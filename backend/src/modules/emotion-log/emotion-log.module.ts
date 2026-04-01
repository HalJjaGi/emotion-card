import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionLog } from '../../database/entities/emotion-log.entity';
import { Emotion } from '../../database/entities/emotion.entity';
import { EmotionLogController } from './emotion-log.controller';
import { EmotionLogService } from './emotion-log.service';
import { DotModule } from '../dot/dot.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmotionLog, Emotion]), DotModule],
  controllers: [EmotionLogController],
  providers: [EmotionLogService],
  exports: [EmotionLogService],
})
export class EmotionLogModule {}
