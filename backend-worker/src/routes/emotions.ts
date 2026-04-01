import { Hono } from 'hono';
import { eq, desc } from 'drizzle-orm';
import { emotions, emotionLogs } from '../db/schema';
import { generateDotArt } from '../services/dotGenerator';
import type { AppContext } from '../db';

const app = new Hono<AppContext>();

// 감정 목록 조회
app.get('/', async (c) => {
  const db = c.get('db');
  const allEmotions = await db.select().from(emotions);
  return c.json(allEmotions);
});

// 감정 기록 생성
app.post('/log', async (c) => {
  const db = c.get('db');
  const body = await c.req.json<{ emotionId: number; reason: string }>();

  // 감정 조회
  const [emotion] = await db
    .select()
    .from(emotions)
    .where(eq(emotions.id, body.emotionId));

  if (!emotion) {
    return c.json({ error: 'Emotion not found' }, 404);
  }

  // 도트 생성
  const dotArt = generateDotArt(emotion.name);

  // 기록 저장
  const [log] = await db
    .insert(emotionLogs)
    .values({
      emotionId: body.emotionId,
      reason: body.reason,
      dotArt,
    })
    .returning();

  return c.json({
    ...log,
    emotion,
  });
});

// 타임라인 조회
app.get('/timeline', async (c) => {
  const db = c.get('db');

  const logs = await db
    .select({
      id: emotionLogs.id,
      reason: emotionLogs.reason,
      dotArt: emotionLogs.dotArt,
      createdAt: emotionLogs.createdAt,
      emotion: emotions,
    })
    .from(emotionLogs)
    .innerJoin(emotions, eq(emotionLogs.emotionId, emotions.id))
    .orderBy(desc(emotionLogs.createdAt))
    .limit(50);

  return c.json(logs);
});

// 단일 기록 조회
app.get('/log/:id', async (c) => {
  const db = c.get('db');
  const id = parseInt(c.req.param('id'));

  const [log] = await db
    .select({
      id: emotionLogs.id,
      reason: emotionLogs.reason,
      dotArt: emotionLogs.dotArt,
      createdAt: emotionLogs.createdAt,
      emotion: emotions,
    })
    .from(emotionLogs)
    .innerJoin(emotions, eq(emotionLogs.emotionId, emotions.id))
    .where(eq(emotionLogs.id, id));

  if (!log) {
    return c.json({ error: 'Log not found' }, 404);
  }

  return c.json(log);
});

// 기록 삭제
app.delete('/log/:id', async (c) => {
  const db = c.get('db');
  const id = parseInt(c.req.param('id'));

  const [deleted] = await db
    .delete(emotionLogs)
    .where(eq(emotionLogs.id, id))
    .returning();

  if (!deleted) {
    return c.json({ error: 'Log not found' }, 404);
  }

  return c.json({ success: true });
});

export default app;
