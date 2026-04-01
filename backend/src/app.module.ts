import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { EmotionsModule } from './modules/emotions/emotions.module';
import { EmotionLogModule } from './modules/emotion-log/emotion-log.module';
import { DotModule } from './modules/dot/dot.module';
import { Emotion } from './database/entities/emotion.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Emotion]),
    EmotionsModule,
    EmotionLogModule,
    DotModule,
  ],
})
export class AppModule {}
