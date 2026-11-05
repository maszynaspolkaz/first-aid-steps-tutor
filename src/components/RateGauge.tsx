import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { BPM_SAFE_MAX, BPM_SAFE_MIN } from '../constants/config';
import { gaugeFraction, zoneFor } from '../game/rhythm';
import theme from '../constants/theme';

type Props = {
  bpm: number;
  width: number;
};

const TRACK_H = 10;
const NEEDLE_W = 4;

export function RateGauge({ bpm, width }: Props) {
  const left = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // `left` is a layout prop, so the native driver must stay off (rule #8).
    Animated.timing(left, {
      toValue: gaugeFraction(bpm) * (width - NEEDLE_W),
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [left, bpm, width]);

  const zone = zoneFor(bpm);
  const color =
    zone === 'in' ? theme.colors.calm : zone === 'near' ? theme.colors.amber : theme.colors.rescue;

  const bandLeft = gaugeFraction(BPM_SAFE_MIN) * width;
  const bandWidth = gaugeFraction(BPM_SAFE_MAX) * width - bandLeft;

  return (
    <View style={{ width }}>
      <Text style={[styles.bpm, { color }]}>{bpm > 0 ? bpm : 0}</Text>
      <Text style={styles.unit}>COMPRESSIONS PER MINUTE</Text>

      <View style={[styles.track, { width }]}>
        <View style={[styles.band, { left: bandLeft, width: bandWidth }]} />
        <Animated.View
          pointerEvents="none"
          style={[styles.needle, { left, backgroundColor: theme.colors.text.primary }]}
        />
      </View>

      <View style={[styles.scaleRow, { width }]}>
        <Text style={styles.scaleText}>60</Text>
        <Text style={styles.scaleText}>100 - 120 TARGET</Text>
        <Text style={styles.scaleText}>180</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bpm: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  unit: {
    marginTop: 2,
    marginBottom: 12,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.8,
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
  track: {
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    backgroundColor: theme.colors.surfaceAlt,
    justifyContent: 'center',
  },
  band: {
    position: 'absolute',
    top: 0,
    height: TRACK_H,
    backgroundColor: 'rgba(31,138,112,0.25)',
  },
  needle: {
    position: 'absolute',
    top: -4,
    width: NEEDLE_W,
    height: 18,
    borderRadius: 2,
  },
  scaleRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleText: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: theme.colors.text.muted,
  },
});

export default RateGauge;
