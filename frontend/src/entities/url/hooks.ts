import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../shared/lib/api';

export interface UrlData {
  short_url: string;
  long_url: string;
}

export const useGetUrls = () => {
  return useQuery<UrlData[]>({
    queryKey: ['urls'],
    queryFn: () => fetcher('/api/urls'),
  });
};

export const useShortenUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (long_url: string) =>
      fetcher<UrlData>('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ long_url }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    },
  });
};
