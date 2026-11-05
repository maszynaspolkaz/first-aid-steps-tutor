import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import WarningStrip from './WarningStrip';

type Props = {
  index: number;
  sprite: ImageSourcePropType;
  heading: string;
  body: string;
  warning?: string;
  width: number;
};

/**
 * Rule #17: the big numeral sits in its own band at the top; the heading starts
 * well below it, so no stroke ever crosses a letter.
 */
export function StepCard({ index, sprite, heading, body, warning, width }: Props) {
  const numeral = index < 9 ? '0' + String(index + 1) : String(index + 1);
  return (
    <View style={[styles.card, theme.shadow.card, { width }]}>
      <View style={styles.numeralBand}>
        <Text style={styles.numeral}>{numeral}</Text>
      </View>

      <Image source={sprite} style={styles.sprite} resizeMode="contain" />

      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.body}>{body}</Text>

      {warning ? (
        <View style={styles.warningWrap}>
          <WarningStrip text={warning} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    alignItems: 'center',
  },
  numeralBand: {
    alignSelf: 'stretch',
    height: 48,
    justifyContent: 'center',
  },
  numeral: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '800',
    letterSpacing: -1,
    color: 'rgba(198,47,59,0.18)',
  },
  sprite: {
    width: 132,
    height: 132,
    marginTop: 4,
  },
  heading: {
    marginTop: 12,
    maxWidth: 300,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  body: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: 'rgba(28,43,45,0.78)',
  },
  warningWrap: {
    alignSelf: 'stretch',
    marginTop: 14,
  },
});

export default StepCard;
