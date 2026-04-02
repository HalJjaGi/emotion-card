'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { EmotionLog } from '@/types/emotion';
import DotDisplay from './DotDisplay';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EmotionCardProps {
  emotionLog: EmotionLog;
  showDownload?: boolean;
}

export default function EmotionCard({ emotionLog, showDownload = true }: EmotionCardProps) {
  const { emotion, reason, dotArt, createdAt } = emotionLog;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // 고해상도
      });

      const link = document.createElement('a');
      link.download = `emotion-card-${format(new Date(createdAt), 'yyyy-MM-dd-HHmm')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  return (
    <div className="relative">
      <div
        ref={cardRef}
        className="bg-white rounded-lg shadow-md p-6"
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

      {showDownload && (
        <button
          onClick={handleDownload}
          className="absolute top-2 right-2 px-3 py-1 bg-white/80 hover:bg-white rounded-full shadow-sm text-sm text-purple-600 hover:text-purple-800 transition-colors"
          title="이미지로 저장"
        >
          📷 저장
        </button>
      )}
    </div>
  );
}
