import { useCallback, useRef, useState } from 'react';
import { TAP_PUSH_THROTTLE_MS, TAP_WINDOW } from '../constants/config';
import { bpmFromIntervals } from '../game/rhythm';

/**
 * Rolling tap rate. Timestamps live in refs so the callback never re-creates
 * itself and never re-renders on every tap; state is pushed at most every 150ms.
 */
export function useTapRate(): {
  bpm: number;
  taps: number;
  registerTap: () => void;
  reset: () => void;
} {
  const stamps = useRef<number[]>([]);
  const lastPush = useRef(0);
  const [bpm, setBpm] = useState(0);
  const [taps, setTaps] = useState(0);

  const registerTap = useCallback(() => {
    const now = Date.now();
    const list = stamps.current;
    list.push(now);
    if (list.length > TAP_WINDOW + 1) {
      list.shift();
    }
    setTaps(prev => prev + 1);

    if (list.length < 2) {
      return;
    }
    const intervals: number[] = [];
    for (let i = 1; i < list.length; i += 1) {
      intervals.push(list[i] - list[i - 1]);
    }
    if (now - lastPush.current < TAP_PUSH_THROTTLE_MS) {
      return;
    }
    lastPush.current = now;
    setBpm(bpmFromIntervals(intervals));
  }, []);

  const reset = useCallback(() => {
    stamps.current = [];
    lastPush.current = 0;
    setBpm(0);
    setTaps(0);
  }, []);

  return { bpm, taps, registerTap, reset };
}

export default useTapRate;
