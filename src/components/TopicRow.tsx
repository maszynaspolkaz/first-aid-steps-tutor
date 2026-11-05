import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';
import { Check, ICON_STROKE, iconFor } from './icons';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const ROW_H = 72;

type Props = {
  title: string;
  icon: string;
  tone: 'critical' | 'calm';
  steps: number;
  minutes: number;
  done: boolean;
  width: number;
  onPress: () => void;
};

export const TopicRow = React.memo(function TopicRow({
  title,
  icon,
  tone,
  steps,
  minutes,
  done,
  width,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const Icon = iconFor(icon);
  const tint = tone === 'critical' ? theme.colors.rescue : theme.colors.calm;

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
      accessibilityLabel={title}
      style={[styles.press, { width, height: ROW_H }]}>
      <Animated.View
        pointerEvents="box-none"
        style={[styles.row, { width, height: ROW_H, transform: [{ scale }] }]}>
        <View style={[styles.iconSquare, { backgroundColor: tint + '14' }]}>
          <Icon size={22} color={tint} strokeWidth={ICON_STROKE} />
        </View>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.meta}>
            {steps} steps - {minutes} min
          </Text>
        </View>
        {done ? (
          <Check size={20} color={theme.colors.calm} strokeWidth={2} />
        ) : (
          <View style={styles.emptyMark} />
        )}
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  press: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  row: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  meta: {
    marginTop: 2,
    fontSize: 11,
    color: theme.colors.text.secondary,
  },
  emptyMark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
});

export default TopicRow;
