import { useEffect, useRef, useState } from 'react';
import { beatInterval } from '../game/rhythm';

/**
 * Ticks a beat counter at the requested rate. The interval id lives in a ref
 * (rule #8 - refs for data used inside callbacks) and is cleared on unmount.
 */
export function useMetronome(targetBpm: number, running: boolean): { beat: number } {
  const [beat, setBeat] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (!running) {
      return undefined;
    }
    timer.current = setInterval(() => {
      setBeat(prev => prev + 1);
    }, beatInterval(targetBpm));

    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [targetBpm, running]);

  return { beat };
}

export default useMetronome;
