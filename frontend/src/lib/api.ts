import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export interface CreateEmotionLogDto {
  emotionId: string;
  reason: string;
  userId: string;
}

// Emotions API
export const emotionsApi = {
  getAll: () => api.get<Emotion[]>('/emotions'),
  getOne: (id: string) => api.get<Emotion>(`/emotions/${id}`),
};

// Emotion Log API
export const emotionLogApi = {
  create: (data: CreateEmotionLogDto) => api.post<EmotionLog>('/emotion-log', data),
  getTimeline: (userId: string, page = 1, limit = 10) =>
    api.get<[EmotionLog[], number]>(`/emotion-log/timeline`, {
      params: { userId, page, limit },
    }),
  getOne: (id: string) => api.get<EmotionLog>(`/emotion-log/${id}`),
  delete: (id: string) => api.delete(`/emotion-log/${id}`),
};

// Dot API
export const dotApi = {
  generate: (pattern: number[][], variationAmount = 0.3) =>
    api.post<{ dotArt: string }>('/dot/generate', { pattern, variationAmount }),
};
