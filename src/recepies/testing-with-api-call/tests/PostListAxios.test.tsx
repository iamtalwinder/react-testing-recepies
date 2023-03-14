import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import PostListAxios from '../PostListAxios';

// Mock the entire Axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('[Testing with API call] PostListAxios', () => {
  afterEach(() => {
      // Clear any mocked data after each test
      jest.clearAllMocks();
  });

  test('successfully fetches and displays posts', async () => {
      // Setup the mock to resolve with some data
      mockedAxios.get.mockResolvedValue({
          data: [{ id: 1, title: 'Test Post' }]
      });

      render(<PostListAxios />);

      await waitFor(() => {
          expect(screen.getByText('Test Post')).toBeInTheDocument();
      });
  });

  test('displays an error message on fetch failure', async () => {
      // Setup the mock to reject with an error
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      render(<PostListAxios />);

      await waitFor(() => {
          expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      });
  });
});

