import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounceEffect } from '../../../src/hooks/useDebounceEffect';

jest.useFakeTimers();

describe('Test in useDebounceEffect', () => {
  test('should call useDebounceEffect after wait time', () => {
    const fn = jest.fn();
    const waitTime = 1000;

    const { result, unmount } = renderHook(() =>
      useDebounceEffect(fn, waitTime)
    );

    act(() => {
      setTimeout(() => {
        result.current;
      }, 500);
    });

    jest.advanceTimersByTime(waitTime);

    expect(fn).toHaveBeenCalledTimes(1);
    unmount();
  });
});
