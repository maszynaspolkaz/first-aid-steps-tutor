import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const CHIP_H = 40;

type Props = {
  options: number[];
  value: number;
  width: number;
  gap?: number;
  onChange: (next: number) => void;
};

export function ChipRow({ options, value, width, gap = 10, onChange }: Props) {
  const chipW = Math.floor((width - gap * (options.length - 1)) / options.length);

  return (
    <View style={[styles.row, { width, gap }]}>
      {options.map(option => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            hitSlop={HIT}
            accessibilityRole="button"
            accessibilityLabel={String(option) + ' per minute'}
            style={[
              styles.chip,
              {
                width: chipW,
                height: CHIP_H,
                borderColor: active ? theme.colors.rescue : theme.colors.border,
                borderWidth: active ? 1.5 : 1,
                backgroundColor: active ? 'rgba(198,47,59,0.07)' : theme.colors.surface,
              },
            ]}>
            <Text
              style={[
                styles.text,
                { color: active ? theme.colors.rescue : theme.colors.text.secondary },
              ]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  chip: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default ChipRow;
