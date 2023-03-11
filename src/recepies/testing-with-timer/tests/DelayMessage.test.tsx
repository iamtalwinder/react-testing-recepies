import { render, act } from '@testing-library/react';
import DelayMessage from '../DelayMessage';

jest.useFakeTimers();

describe('[Testing with timer] DelayMessage', () => {
  it('should show message after delay', () => {
    const { getByText } = render(<DelayMessage message="this is a message" delay={2000} />);

    act(() => {
      jest.advanceTimersByTime(2000); 
    });

    expect(getByText(`this is a message`)).toBeInTheDocument();
  })
});