import { renderHook, waitFor } from '@testing-library/react';
import useFetchData from '../useFetchData';

// Mock the global fetch API
global.fetch = jest.fn();

describe('[Testing Custom Hooks] useFetchData', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches data successfully', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' })
      })
    );

    const { result } = renderHook(() => useFetchData('https://example.com/data'));


    await waitFor(() => {
      expect(result.current.data).toEqual({ message: 'Success' });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({})
      })
    );

    const { result } = renderHook(() => useFetchData('https://example.com/data'));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});
