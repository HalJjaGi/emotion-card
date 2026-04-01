import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Emotion } from './emotion.entity';

@Entity('emotion_logs')
@Index('idx_user_created', ['userId', 'createdAt'])
export class EmotionLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'emotion_id' })
  emotionId: string;

  @Column({ length: 30 })
  reason: string;

  @Column({ name: 'dot_art', type: 'text' })
  dotArt: string;

  @ManyToOne(() => User, (user) => user.emotionLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Emotion, (emotion) => emotion.emotionLogs)
  @JoinColumn({ name: 'emotion_id' })
  emotion: Emotion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
