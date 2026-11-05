import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../constants/theme';

type Props = {
  count: number;
  active: number;
};

/** Static-width dots: the active one is a wider pill. No layout animation needed. */
export function StepDots({ count, active }: Props) {
  const items: number[] = [];
  for (let i = 0; i < count; i += 1) {
    items.push(i);
  }
  return (
    <View style={styles.row}>
      {items.map(i => (
        <View key={i} style={i === active ? styles.active : styles.dot} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.surfaceAlt,
  },
  active: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.rescue,
  },
});

export default StepDots;
