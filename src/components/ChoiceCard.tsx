import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';
import { Check, X } from './icons';

const HIT = { top: 6, bottom: 6, left: 8, right: 8 };
const CARD_H = 72;

export type ChoiceVisual = 'idle' | 'selected' | 'correct' | 'wrong';

type Props = {
  letter: string;
  text: string;
  state: ChoiceVisual;
  width: number;
  onPress: () => void;
};

export function ChoiceCard({ letter, text, state, width, onPress }: Props) {
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
  let badgeTint = theme.colors.calm;

  if (state === 'selected') {
    borderColor = theme.colors.calm;
    borderWidth = 2;
    background = 'rgba(31,138,112,0.06)';
  } else if (state === 'correct') {
    borderColor = theme.colors.calm;
    borderWidth = 2;
    background = 'rgba(31,138,112,0.08)';
  } else if (state === 'wrong') {
    borderColor = theme.colors.rescue;
    borderWidth = 2;
    background = 'rgba(198,47,59,0.06)';
    badgeTint = theme.colors.rescue;
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={letter + '. ' + text}
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
        <View style={[styles.badge, { backgroundColor: badgeTint + '1A' }]}>
          <Text style={[styles.badgeText, { color: badgeTint }]}>{letter}</Text>
        </View>
        <Text style={styles.text} numberOfLines={3}>
          {text}
        </Text>
        <View style={styles.mark}>
          {state === 'correct' ? (
            <Check size={18} color={theme.colors.calm} strokeWidth={2} />
          ) : null}
          {state === 'wrong' ? (
            <X size={18} color={theme.colors.rescue} strokeWidth={2} />
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
  badge: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '800',
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    color: theme.colors.text.primary,
  },
  mark: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const CHOICE_CARD_HEIGHT = CARD_H;

export default ChoiceCard;
