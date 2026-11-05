import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ENTRY_SPRING, STAGGER_MS } from '../constants/config';

/**
 * Returns `count` Animated.Values that run 0 -> 1 in sequence on mount.
 * Only transform/opacity are driven from these, so the native driver is safe.
 */
export function useStaggeredEntry(count: number, delay: number = STAGGER_MS) {
  const values = useRef<Animated.Value[]>(
    Array.from({ length: count }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = values.map(v =>
      Animated.spring(v, {
        toValue: 1,
        tension: ENTRY_SPRING.tension,
        friction: ENTRY_SPRING.friction,
        useNativeDriver: true,
      }),
    );
    const sequence = Animated.stagger(delay, animations);
    sequence.start();
    return () => {
      sequence.stop();
    };
  }, [values, delay]);

  return values;
}

/** Common style for a staggered item: fade in plus a short rise. */
export function entryStyle(value: Animated.Value, rise: number = 16) {
  return {
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [rise, 0],
        }),
      },
    ],
  };
}

export default useStaggeredEntry;
