import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Emotion 테이블
export const emotions = sqliteTable('emotions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  emoji: text('emoji').notNull(),
  color: text('color').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// EmotionLog 테이블
export const emotionLogs = sqliteTable('emotion_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  emotionId: integer('emotion_id')
    .notNull()
    .references(() => emotions.id),
  reason: text('reason').notNull(),
  dotArt: text('dot_art').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// TypeScript 타입
export type Emotion = typeof emotions.$inferSelect;
export type NewEmotion = typeof emotions.$inferInsert;
export type EmotionLog = typeof emotionLogs.$inferSelect;
export type NewEmotionLog = typeof emotionLogs.$inferInsert;
