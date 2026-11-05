import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { AppIcon, ICON_STROKE } from './icons';

type IconType = AppIcon;

type Props = {
  Icon: IconType;
  value: string;
  label: string;
  valueColor: string;
};

/**
 * The shared stat pill used on every screen that shows numbers.
 * Rule #19a: the card itself is width:'100%', never flex:1 inside a flex:1 slot.
 */
export function StatCard({ Icon, value, label, valueColor }: Props) {
  return (
    <View style={[styles.card, { borderTopColor: valueColor }]}>
      <View style={[styles.iconWrap, { backgroundColor: valueColor + '14' }]}>
        <Icon size={20} color={valueColor} strokeWidth={ICON_STROKE} />
      </View>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderTopWidth: 3,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  label: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: theme.colors.text.secondary,
  },
});

export default StatCard;
