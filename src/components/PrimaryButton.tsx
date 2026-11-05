import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  disabled?: boolean;
  tone?: 'red' | 'green';
  width?: number;
  height?: number;
};

/**
 * Pressable is the PARENT, the Animated.View scales INSIDE it (rule #8).
 * Explicit width and height, fixed 24x24 icon, label lineHeight 24 (rule #20).
 */
export function PrimaryButton({
  label,
  Icon,
  onPress,
  disabled = false,
  tone = 'red',
  width = CARD_MAX_W,
  height = 60,
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

  const colors = tone === 'green' ? theme.gradients.calm : theme.gradients.rescue;
  const shadow = tone === 'green' ? theme.shadow.ctaCalm : theme.shadow.cta;

  if (disabled) {
    return (
      <View style={[styles.disabled, { width, height }]}>
        <View style={styles.row}>
          {Icon ? <Icon size={ICON} color={theme.colors.text.muted} strokeWidth={ICON_STROKE} /> : null}
          <Text style={[styles.label, styles.labelDisabled]}>{label}</Text>
        </View>
      </View>
    );
  }

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
        style={[styles.anim, shadow, { width, height, transform: [{ scale }] }]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width, height }]}>
          <View style={styles.row}>
            {Icon ? <Icon size={ICON} color="#FFFFFF" strokeWidth={ICON_STROKE} /> : null}
            <Text style={styles.label}>{label}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    alignSelf: 'center',
  },
  anim: {
    borderRadius: theme.radius.lg,
  },
  fill: {
    borderRadius: theme.radius.lg,
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
    fontSize: 15,
    lineHeight: ICON,
    fontWeight: '800',
    letterSpacing: 1.6,
    color: '#FFFFFF',
  },
  labelDisabled: {
    color: theme.colors.text.muted,
  },
  disabled: {
    alignSelf: 'center',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrimaryButton;
