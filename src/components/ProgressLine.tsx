import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

type Props = {
  label: string;
  value: number;
  total: number;
  width: number;
  tone?: 'calm' | 'rescue';
};

/** Label row plus a 4px animated track. Width is a layout prop: native driver OFF. */
export function ProgressLine({ label, value, total, width, tone = 'calm' }: Props) {
  const fraction = total > 0 ? Math.min(value / total, 1) : 0;
  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(grow, {
      toValue: fraction * width,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [grow, fraction, width]);

  const color = tone === 'calm' ? theme.colors.calm : theme.colors.rescue;

  return (
    <View style={{ width }}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color }]}>
          {value} / {total}
        </Text>
      </View>
      <View style={[styles.track, { width }]}>
        <Animated.View
          pointerEvents="none"
          style={[styles.fill, { width: grow, backgroundColor: color }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.colors.text.secondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: 'hidden',
  },
  fill: {
    height: 4,
    borderRadius: 2,
  },
});

export default ProgressLine;
