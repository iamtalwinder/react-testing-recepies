import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Profile from '../Profile';

describe('[Testing with router] Profile', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches and displays profile data based on URL params', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'John Doe',
        username: 'john.doe',
        email: 'john.doe@example.com',
      }),
    });

    render(
      <MemoryRouter initialEntries={['/profile/1']}>
        <Routes>
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Username: john.doe')).toBeInTheDocument();
    });
  });
});
