import { render, act } from '@testing-library/react';
import Countdown from '../Countdown';

jest.useFakeTimers();

describe('[Testing with timer] Countdown', () => {
  it('should down from the initial count', () => {
    const { getByText } = render(<Countdown initialCount={10} />);

    for (let i = 1; i <= 6; i++) {
      act(() => {
        // Advance time by 1 second, inside loop because we are using new timer to advance each second
        jest.advanceTimersByTime(1000); 
      });
    }
    expect(getByText(`Time left: 4 seconds`)).toBeInTheDocument();
  })


});