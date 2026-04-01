'use client';

import { EmotionLog } from '@/types/emotion';
import DotDisplay from './DotDisplay';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EmotionCardProps {
  emotionLog: EmotionLog;
}

export default function EmotionCard({ emotionLog }: EmotionCardProps) {
  const { emotion, reason, dotArt, createdAt } = emotionLog;

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      style={{ borderLeft: `4px solid ${emotion.color}` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{emotion.emoji}</span>
          <span
            className="text-xl font-semibold"
            style={{ color: emotion.color }}
          >
            {emotion.name}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {format(new Date(createdAt), 'PPP', { locale: ko })}
        </span>
      </div>

      <DotDisplay dotArt={dotArt} color={emotion.color} />

      <p className="mt-4 text-gray-700 text-center font-medium">{reason}</p>
    </div>
  );
}
