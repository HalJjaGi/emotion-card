import { useQuery } from '@tanstack/react-query';
import { emotionLogApi } from '../lib/api';

export function useTimeline(userId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['timeline', userId, page, limit],
    queryFn: async () => {
      const response = await emotionLogApi.getTimeline(userId, page, limit);
      return {
        logs: response.data[0],
        total: response.data[1],
      };
    },
    enabled: !!userId,
  });
}
