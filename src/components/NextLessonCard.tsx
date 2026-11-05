import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';
import { ICON_STROKE, iconFor } from './icons';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const CARD_H = 76;

type Props = {
  title: string;
  icon: string;
  steps: number;
  minutes: number;
  width: number;
  onPress: () => void;
};

export function NextLessonCard({ title, icon, steps, minutes, width, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const Icon = iconFor(icon);

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.98,
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

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={'Next lesson: ' + title}
      style={[styles.press, { width, height: CARD_H }]}>
      <Animated.View
        pointerEvents="box-none"
        style={[styles.card, theme.shadow.card, { width, height: CARD_H, transform: [{ scale }] }]}>
        <View style={styles.iconSquare}>
          <Icon size={22} color={theme.colors.rescue} strokeWidth={ICON_STROKE} />
        </View>
        <View style={styles.text}>
          <Text style={styles.eyebrow}>NEXT LESSON</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.meta}>
            {steps} steps - {minutes} min
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconSquare: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.rescueTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.colors.text.muted,
  },
  title: {
    marginTop: 2,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  meta: {
    marginTop: 1,
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
});

export default NextLessonCard;
