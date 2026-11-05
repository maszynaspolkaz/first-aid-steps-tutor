import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';
import { CARD_MAX_W } from '../utils/layout';
import { AppIcon, ICON_STROKE } from './icons';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const ICON = 24;

type IconType = AppIcon;

type Props = {
  label: string;
  Icon?: IconType;
  onPress: () => void;
  tone?: 'calm' | 'plain';
  width?: number;
  height?: number;
};

/** h48 outline/tinted button. Same icon size on every secondary in a screen. */
export function SecondaryButton({
  label,
  Icon,
  onPress,
  tone = 'calm',
  width = CARD_MAX_W,
  height = 48,
}: Props) {
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

  const calm = tone === 'calm';
  const tint = calm ? theme.colors.calm : theme.colors.text.primary;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.press, { width, height }]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.fill,
          {
            width,
            height,
            transform: [{ scale }],
            backgroundColor: calm ? 'rgba(31,138,112,0.08)' : theme.colors.surface,
            borderColor: calm ? 'rgba(31,138,112,0.35)' : theme.colors.border,
          },
        ]}>
        <View style={styles.row}>
          {Icon ? <Icon size={ICON} color={tint} strokeWidth={ICON_STROKE} /> : null}
          <Text style={[styles.label, { color: tint }]}>{label}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    alignSelf: 'center',
  },
  fill: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    fontSize: 12,
    lineHeight: ICON,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default SecondaryButton;
