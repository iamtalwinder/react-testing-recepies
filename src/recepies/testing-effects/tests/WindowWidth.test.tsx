import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import WindowWidth, { handleResize } from '../WindowWidth';

describe('[Testing effects] WindowWidth', () => {
  beforeAll(() => {
    // Mock window.addEventListener and window.removeEventListener
    global.addEventListener = jest.fn();
    global.removeEventListener = jest.fn();
  });

  afterEach(cleanup);

  test('call setWidth on resize', () => {
    const setWidth = jest.fn();
    const resizeHandler = handleResize(setWidth);

    // Simulate window resize
    global.innerWidth = 500;
    resizeHandler();

    expect(setWidth).toHaveBeenCalledWith(500);
  });

  test('attaches resize listener on mount', () => {
    render(<WindowWidth />);
    expect(global.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('removes resize listener on unmount', () => {
    const { unmount } = render(<WindowWidth />);
    unmount();
    expect(global.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('updates width on resize', async () => {
    render(<WindowWidth />);

    // Change the innerWidth property and dispatch a resize event
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    // Wait for the state update to occur
    await waitFor(() => {
      expect(screen.getByText('Window width: 500')).toBeInTheDocument();
    });
  });
});
