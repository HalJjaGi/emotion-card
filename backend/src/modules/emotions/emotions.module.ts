import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from '../../database/entities/emotion.entity';
import { EmotionsController } from './emotions.controller';
import { EmotionsService } from './emotions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  controllers: [EmotionsController],
  providers: [EmotionsService],
  exports: [EmotionsService],
})
export class EmotionsModule {}
