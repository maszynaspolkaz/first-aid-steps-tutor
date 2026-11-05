import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';
import { ICON_STROKE, iconFor } from './icons';

const HIT = { top: 6, bottom: 6, left: 6, right: 6 };
const TILE_H = 104;

type Props = {
  title: string;
  icon: string;
  active: boolean;
  width: number;
  onPress: () => void;
};

export const GuideTile = React.memo(function GuideTile({
  title,
  icon,
  active,
  width,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const Icon = iconFor(icon);

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

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={title + ' guide'}
      style={[styles.press, { width, height: TILE_H }]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.tile,
          {
            width,
            height: TILE_H,
            transform: [{ scale }],
            borderColor: active ? theme.colors.rescue : theme.colors.border,
            borderWidth: active ? 1.5 : 1,
          },
        ]}>
        <Icon
          size={22}
          color={active ? theme.colors.rescue : theme.colors.calm}
          strokeWidth={ICON_STROKE}
        />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.meta}>1 PAGE</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  press: {
    marginBottom: 12,
  },
  tile: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  meta: {
    marginTop: 2,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: theme.colors.text.muted,
  },
});

export default GuideTile;
