import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmotionLog } from './emotion-log.entity';

@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  emoji: string;

  @Column()
  color: string;

  @Column({ name: 'dot_pattern', type: 'jsonb', nullable: true })
  dotPattern: number[][];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => EmotionLog, (emotionLog) => emotionLog.emotion)
  emotionLogs: EmotionLog[];
}
