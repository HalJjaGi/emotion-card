import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emotionLogApi, CreateEmotionLogDto } from '../lib/api';

export function useCreateEmotionLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmotionLogDto) => emotionLogApi.create(data),
    onSuccess: () => {
      // Invalidate timeline queries to refetch
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
  });
}
