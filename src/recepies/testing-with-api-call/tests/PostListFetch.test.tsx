import { render, waitFor, screen } from '@testing-library/react';
import PostListFetch from '../PostListFetch';

// Mock global fetch API
global.fetch = jest.fn() as jest.Mock;

const mockedFetch = fetch as jest.Mock;

describe("[Testing with API call] PostListFetch", () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  test("successfully fetches and displays posts", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: "Test Post" }],
    });

    render(<PostListFetch />);

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
    });
  });

  test("displays an error message on fetch failure", async () => {
    mockedFetch.mockResolvedValueOnce({ ok: false });

    render(<PostListFetch />);

    await waitFor(() => {
      expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });
  });
});
