'use client';

import { useState, useEffect } from 'react';
import { Emotion } from '@/types/emotion';
import { useEmotions } from '@/hooks/useEmotions';
import { useCreateEmotionLog } from '@/hooks/useCreateEmotionLog';
import EmotionSelector from '@/components/EmotionSelector';
import ReasonInput from '@/components/ReasonInput';
import DotDisplay from '@/components/DotDisplay';
import { DotService } from '@/lib/dotGenerator';

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [reason, setReason] = useState('');
  const [userId, setUserId] = useState('');
  const [previewDot, setPreviewDot] = useState('');

  const { data: emotions, isLoading, error } = useEmotions();
  const createMutation = useCreateEmotionLog();

  useEffect(() => {
    // Get or create temporary user ID from localStorage
    let tempUserId = localStorage.getItem('emotion_card_user_id');
    if (!tempUserId) {
      tempUserId = crypto.randomUUID();
      localStorage.setItem('emotion_card_user_id', tempUserId);
    }
    setUserId(tempUserId);
  }, []);

  useEffect(() => {
    if (selectedEmotion && selectedEmotion.dotPattern) {
      // Generate preview dot
      const dotService = new DotService();
      const preview = dotService.generateDot(selectedEmotion.dotPattern, 0.2);
      setPreviewDot(preview);
    }
  }, [selectedEmotion]);

  const handleSubmit = async () => {
    if (!selectedEmotion || !reason.trim()) {
      alert('감정과 이유를 모두 입력해주세요.');
      return;
    }

    try {
      await createMutation.mutateAsync({
        emotionId: selectedEmotion.id,
        reason: reason.trim(),
        userId,
      });

      alert('감정이 기록되었습니다! 🎉');
      setSelectedEmotion(null);
      setReason('');
      setPreviewDot('');
    } catch (error) {
      console.error('Failed to create emotion log:', error);
      alert('기록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-xl text-red-500">에러가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          🎨 오늘의 감정 카드
        </h1>

        {emotions && (
          <EmotionSelector
            emotions={emotions}
            selectedEmotion={selectedEmotion}
            onSelect={setSelectedEmotion}
          />
        )}

        <ReasonInput value={reason} onChange={setReason} maxLength={30} />

        {previewDot && selectedEmotion && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">미리보기</h2>
            <DotDisplay dotArt={previewDot} color={selectedEmotion.color} />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedEmotion || !reason.trim() || createMutation.isPending}
          className={`
            w-full py-4 rounded-lg font-semibold text-white
            transition-all duration-200
            ${
              selectedEmotion && reason.trim() && !createMutation.isPending
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          {createMutation.isPending ? '저장 중...' : '감정 카드 만들기 ✨'}
        </button>

        <div className="mt-8 text-center">
          <a
            href="/timeline"
            className="text-purple-600 hover:text-purple-800 underline"
          >
            내 타임라인 보기 →
          </a>
        </div>
      </main>
    </div>
  );
}
