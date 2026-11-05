import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

type Props = {
  lines: string[];
  accentIndex: number;
  tagline: string;
};

/** Left-flush three-line editorial title with an accent word, rule and tagline. */
export function EditorialHero({ lines, accentIndex, tagline }: Props) {
  return (
    <View style={styles.wrap}>
      {lines.map((line, i) => (
        <Text
          key={line}
          style={[styles.line, i === accentIndex ? styles.accent : null]}>
          {line}
        </Text>
      ))}
      <View style={styles.rule} />
      <Text style={styles.tagline}>{tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start',
  },
  line: {
    fontSize: 42,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -1,
    color: theme.colors.text.primary,
  },
  accent: {
    color: theme.colors.rescue,
  },
  rule: {
    marginTop: 12,
    width: 48,
    height: 2,
    backgroundColor: theme.colors.rescue,
  },
  tagline: {
    marginTop: 14,
    maxWidth: 260,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.2,
    color: theme.colors.text.secondary,
  },
});

export default EditorialHero;
