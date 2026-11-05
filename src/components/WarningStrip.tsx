import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { AlertTriangle, ICON_STROKE } from './icons';

type Props = {
  text: string;
  width?: number;
};

export function WarningStrip({ text, width }: Props) {
  return (
    <View style={[styles.wrap, width ? { width } : null]}>
      <AlertTriangle size={18} color={theme.colors.rescue} strokeWidth={ICON_STROKE} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.rescueTint,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.rescue,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    color: theme.colors.rescue,
  },
});

export default WarningStrip;
