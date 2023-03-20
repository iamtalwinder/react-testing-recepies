import { render, act, screen } from '@testing-library/react';
import Countdown from '../Countdown';

jest.useFakeTimers();

describe('[Testing with timer] Countdown', () => {
  it('should down from the initial count', () => {
    render(<Countdown initialCount={10} />);

    for (let i = 1; i <= 6; i++) {
      act(() => {
        // Advance time by 1 second, inside loop because we are using new timer to advance each second
        jest.advanceTimersByTime(1000);
      });
    }
    expect(screen.getByText(`Time left: 4 seconds`)).toBeInTheDocument();
  })


});
