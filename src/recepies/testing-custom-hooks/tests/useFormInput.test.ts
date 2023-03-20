import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react';
import useFormInput from '../useFormInput';

describe('[Testing Custom Hooks] useFormInput', () => {
  it('updates value on change', () => {
    const { result } = renderHook(() => useFormInput(''));

    act(() => {
      result.current.onChange({ target: { value: 'John Doe' } } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('John Doe');
  });
});
