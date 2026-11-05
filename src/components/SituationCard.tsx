import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

type Props = {
  text: string;
  sprite: ImageSourcePropType;
  width: number;
};

/** Rule #18: the corner sprite uses positive insets so it never pokes out. */
export function SituationCard({ text, sprite, width }: Props) {
  return (
    <View style={[styles.card, theme.shadow.card, { width }]}>
      <Text style={styles.eyebrow}>SITUATION</Text>
      <Text style={styles.body}>{text}</Text>
      <Image source={sprite} style={styles.sprite} resizeMode="contain" />
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
    borderTopWidth: 3,
    borderTopColor: theme.colors.rescue,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 82,
    minHeight: 104,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.rescue,
  },
  body: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.text.primary,
  },
  sprite: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 56,
    height: 56,
  },
});

export default SituationCard;
