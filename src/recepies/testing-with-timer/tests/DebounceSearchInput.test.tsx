import { render, act, fireEvent, screen } from '@testing-library/react';
import DebounceSearchInput from '../DebounceSearchInput';

jest.useFakeTimers();

describe('[Testing with timer] DebounceSearchInput', () => {
  it('should show message after delay', () => {
    const onChangeMock = jest.fn();
    render(<DebounceSearchInput onChange={onChangeMock}/>);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' }});
    expect(onChangeMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onChangeMock).toHaveBeenCalledWith('react');
  })
});
