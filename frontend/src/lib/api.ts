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
  create: (data: CreateEmotionLogDto) => api.post<EmotionLog>('/emotions/log', data),
  getTimeline: (userId: string, page = 1, limit = 10) =>
    api.get<EmotionLog[]>(`/emotions/timeline`),
  getOne: (id: string) => api.get<EmotionLog>(`/emotions/log/${id}`),
  delete: (id: string) => api.delete(`/emotions/log/${id}`),
};

// Dot API (클라이언트에서 생성)
export const dotApi = {
  generate: (pattern: number[][], variationAmount = 0.3) =>
    Promise.resolve({ data: { dotArt: '' } }), // 클라이언트에서 생성하므로 더미
};
