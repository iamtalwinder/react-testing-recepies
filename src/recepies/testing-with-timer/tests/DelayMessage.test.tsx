import { render, act, screen } from '@testing-library/react';
import DelayMessage from '../DelayMessage';

jest.useFakeTimers();

describe('[Testing with timer] DelayMessage', () => {
  it('should show message after delay', () => {
    render(<DelayMessage message="this is a message" delay={2000} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(`this is a message`)).toBeInTheDocument();
  })
});
