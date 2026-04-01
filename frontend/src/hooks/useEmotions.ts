import { useQuery } from '@tanstack/react-query';
import { emotionsApi } from '../lib/api';

export function useEmotions() {
  return useQuery({
    queryKey: ['emotions'],
    queryFn: async () => {
      const response = await emotionsApi.getAll();
      return response.data;
    },
  });
}
