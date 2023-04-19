import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

describe('[Testing with router] ProtectedRoute', () => {
  it('redirects to home if not authenticated', () => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/protected" element={<ProtectedRoute />}>
            <Route index element={<div>Protected Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders protected content if authenticated', () => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => 'token');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/protected" element={<ProtectedRoute />}>
            <Route index element={<div>Protected Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Page')).toBeInTheDocument();
  });
});
