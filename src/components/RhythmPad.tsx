import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { PAD_SIZE } from '../utils/layout';
import { HeartPulse, ICON_STROKE } from './icons';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };

type Props = {
  beat: number;
  running: boolean;
  onTap: () => void;
};

/** Pressable is the parent; the pulsing Animated.View lives inside it. */
export function RhythmPad({ beat, running, onTap }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!running || beat === 0) {
      return;
    }
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.06, duration: 90, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 110, useNativeDriver: true }),
    ]).start();
  }, [beat, running, scale]);

  const pressIn = useCallback(() => {
    Animated.timing(scale, { toValue: 0.96, duration: 70, useNativeDriver: true }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.timing(scale, { toValue: 1, duration: 110, useNativeDriver: true }).start();
  }, [scale]);

  return (
    <Pressable
      onPress={onTap}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel="Tap with the beat"
      style={[styles.press, { width: PAD_SIZE, height: PAD_SIZE }]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.pad,
          { width: PAD_SIZE, height: PAD_SIZE, borderRadius: PAD_SIZE / 2, transform: [{ scale }] },
        ]}>
        <View style={styles.inner}>
          <HeartPulse size={56} color={theme.colors.rescue} strokeWidth={ICON_STROKE} />
          <Text style={styles.hint}>TAP WITH THE BEAT</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    alignSelf: 'center',
  },
  pad: {
    backgroundColor: 'rgba(198,47,59,0.08)',
    borderWidth: 2,
    borderColor: theme.colors.rescue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.colors.text.secondary,
  },
});

export default RhythmPad;
