import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

export type StripItem = {
  key: string;
  label: string;
  value: string;
  color: string;
};

type Props = {
  items: StripItem[];
};

/** The thin G3 strip. Rule #21: fewer than 2 items means no strip at all. */
export function StatStrip({ items }: Props) {
  if (items.length < 2) {
    return null;
  }
  return (
    <View style={styles.strip}>
      {items.map(item => (
        <View key={item.key} style={styles.item}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={[styles.value, { color: item.color }]} numberOfLines={1}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.6,
    color: theme.colors.text.secondary,
  },
  value: {
    marginTop: 1,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default StatStrip;
