'use client';

import { useState, useEffect } from 'react';
import { useTimeline } from '@/hooks/useTimeline';
import EmotionCard from '@/components/EmotionCard';

export default function TimelinePage() {
  const [userId, setUserId] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const tempUserId = localStorage.getItem('emotion_card_user_id');
    if (tempUserId) {
      setUserId(tempUserId);
    }
  }, []);

  const { data, isLoading, error } = useTimeline(userId, page, 10);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-xl">사용자 정보를 불러오는 중...</div>
      </div>
    );
  }

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

  const logs = data?.logs || [];
  const total = data?.total || 0;
  const hasMore = logs.length < total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">📅 내 감정 타임라인</h1>
          <a
            href="/"
            className="text-purple-600 hover:text-purple-800 underline"
          >
            ← 감정 기록하기
          </a>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-gray-600 mb-2">
              아직 기록된 감정이 없습니다.
            </p>
            <a
              href="/"
              className="text-purple-600 hover:text-purple-800 underline"
            >
              첫 번째 감정을 기록해보세요! →
            </a>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {logs.map((log) => (
                <EmotionCard key={log.id} emotionLog={log} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-purple-600 font-medium"
                >
                  더 보기
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
