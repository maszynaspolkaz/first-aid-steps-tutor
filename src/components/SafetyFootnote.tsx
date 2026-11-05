import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SAFETY_LINE, SAFETY_LINE_DARK } from '../constants/config';
import theme from '../constants/theme';

type Props = {
  variant?: 'light' | 'dark';
  text?: string;
};

/** The recurring supplements-does-not-replace line. */
export function SafetyFootnote({ variant = 'light', text }: Props) {
  const body = text ? text : variant === 'dark' ? SAFETY_LINE_DARK : SAFETY_LINE;
  return (
    <Text style={[styles.base, variant === 'dark' ? styles.dark : styles.light]}>{body}</Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  light: {
    color: theme.colors.text.muted,
  },
  dark: {
    color: theme.colors.text.onDarkFaint,
  },
});

export default SafetyFootnote;
