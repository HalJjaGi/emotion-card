'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Emotion } from '@/types/emotion';
import DotDisplay from './DotDisplay';

interface EmotionCardPreviewProps {
  emotion: Emotion;
  reason: string;
  dotArt: string;
}

export default function EmotionCardPreview({ emotion, reason, dotArt }: EmotionCardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `emotion-card-${emotion.name}-${Date.now()}.png`;
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
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">{emotion.emoji}</span>
          <span
            className="text-xl font-semibold"
            style={{ color: emotion.color }}
          >
            {emotion.name}
          </span>
        </div>

        <DotDisplay dotArt={dotArt} color={emotion.color} />

        <p className="mt-4 text-gray-700 text-center font-medium">{reason}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
      >
        📷 이미지로 저장
      </button>
    </div>
  );
}
