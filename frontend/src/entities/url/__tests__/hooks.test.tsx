import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUrls, useShortenUrl } from '../hooks';
import * as api from '../../../shared/lib/api';

vi.mock('../../../shared/lib/api', () => ({
  fetcher: vi.fn(),
  API_BASE_URL: 'http://127.0.0.1:5000'
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('URL Hooks', () => {
  it('useGetUrls fetches data successfully', async () => {
    const mockUrls = [{ short_url: 'abc', long_url: 'https://example.com' }];
    vi.mocked(api.fetcher).mockResolvedValueOnce(mockUrls);

    const { result } = renderHook(() => useGetUrls(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUrls);
  });
});
