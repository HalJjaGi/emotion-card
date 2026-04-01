export interface Emotion {
  id: string;
  name: string;
  emoji: string;
  color: string;
  dotPattern: number[][];
  createdAt: string;
}

export interface EmotionLog {
  id: string;
  userId: string;
  emotionId: string;
  reason: string;
  dotArt: string;
  emotion: Emotion;
  createdAt: string;
}
