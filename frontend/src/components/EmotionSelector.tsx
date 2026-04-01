'use client';

import { Emotion } from '@/types/emotion';

interface EmotionSelectorProps {
  emotions: Emotion[];
  selectedEmotion: Emotion | null;
  onSelect: (emotion: Emotion) => void;
}

export default function EmotionSelector({
  emotions,
  selectedEmotion,
  onSelect,
}: EmotionSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">오늘의 감정을 선택하세요</h2>
      <div className="grid grid-cols-4 gap-3">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onSelect(emotion)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg
              transition-all duration-200 hover:scale-105
              ${
                selectedEmotion?.id === emotion.id
                  ? 'ring-2 ring-offset-2 shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100'
              }
            `}
            style={{
              backgroundColor:
                selectedEmotion?.id === emotion.id
                  ? emotion.color + '20'
                  : undefined,
              borderColor:
                selectedEmotion?.id === emotion.id
                  ? emotion.color
                  : undefined,
              ['--tw-ring-color' as string]: selectedEmotion?.id === emotion.id
                ? emotion.color
                : undefined,
            }}
          >
            <span className="text-4xl mb-1">{emotion.emoji}</span>
            <span className="text-sm font-medium">{emotion.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
