import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';
import { Check, ICON_STROKE, X } from './icons';

const HIT = { top: 6, bottom: 6, left: 8, right: 8 };
const CARD_H = 64;

export type OrderCardVisual = 'idle' | 'placed' | 'correct' | 'wrong';

type Props = {
  text: string;
  slot: number;
  state: OrderCardVisual;
  width: number;
  onPress: () => void;
};

export function OrderCard({ text, slot, state, width, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      tension: PRESS_SPRING.tension,
      friction: PRESS_SPRING.friction,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: PRESS_SPRING.tension,
      friction: PRESS_SPRING.friction,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  let borderColor = theme.colors.border;
  let borderWidth = 1;
  let background = theme.colors.surface;
  if (state === 'placed') {
    borderColor = theme.colors.calm;
    borderWidth = 2;
  } else if (state === 'correct') {
    borderColor = theme.colors.calm;
    borderWidth = 2;
    background = 'rgba(31,138,112,0.06)';
  } else if (state === 'wrong') {
    borderColor = theme.colors.rescue;
    borderWidth = 2;
    background = 'rgba(198,47,59,0.05)';
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={text}
      style={[styles.press, { width, height: CARD_H }]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.card,
          {
            width,
            height: CARD_H,
            borderColor,
            borderWidth,
            backgroundColor: background,
            transform: [{ scale }],
          },
        ]}>
        <View style={styles.slot}>
          {slot > 0 ? <Text style={styles.slotNum}>{slot}</Text> : null}
        </View>
        <Text style={styles.text} numberOfLines={2}>
          {text}
        </Text>
        <View style={styles.mark}>
          {state === 'correct' ? (
            <Check size={18} color={theme.colors.calm} strokeWidth={2} />
          ) : null}
          {state === 'wrong' ? (
            <X size={18} color={theme.colors.rescue} strokeWidth={2} />
          ) : null}
          {state === 'idle' || state === 'placed' ? (
            <View style={styles.grip}>
              <View style={styles.gripLine} />
              <View style={styles.gripLine} />
              <View style={styles.gripLine} />
            </View>
          ) : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
  },
  slot: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.bg.primary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotNum: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    color: theme.colors.text.primary,
  },
  mark: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grip: {
    width: 12,
    height: 14,
    justifyContent: 'space-between',
  },
  gripLine: {
    width: 12,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: 'rgba(28,43,45,0.30)',
  },
});

export const ORDER_CARD_HEIGHT = CARD_H;
export const ORDER_CARD_STROKE = ICON_STROKE;

export default OrderCard;
