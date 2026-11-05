import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { Check } from './icons';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const ROW_H = 56;

type Props = {
  label: string;
  qty: string;
  checked: boolean;
  width: number;
  onToggle: () => void;
};

export const ChecklistRow = React.memo(function ChecklistRow({
  label,
  qty,
  checked,
  width,
  onToggle,
}: Props) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={HIT}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      style={[styles.row, { width, height: ROW_H }]}>
      <View style={[styles.box, checked ? styles.boxOn : styles.boxOff]}>
        {checked ? <Check size={16} color="#FFFFFF" strokeWidth={2.5} /> : null}
      </View>
      <Text style={[styles.label, checked ? styles.labelDone : null]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.qty}>{qty}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOff: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  boxOn: {
    backgroundColor: theme.colors.calm,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  labelDone: {
    color: theme.colors.text.muted,
  },
  qty: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
});

export default ChecklistRow;
