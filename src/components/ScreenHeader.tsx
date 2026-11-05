import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { ChevronLeft, ICON_STROKE } from './icons';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };

type Props = {
  title: string;
  onBack?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  /** 'eyebrow' is the left-flush home variant; 'title' is the centred one. */
  variant?: 'title' | 'eyebrow';
  transparent?: boolean;
};

/**
 * The one header used by every screen (shared-header rule).
 * 72px tall body plus paddingTop 44 under the status bar (rule #6).
 */
export function ScreenHeader({
  title,
  onBack,
  leftSlot,
  rightSlot,
  variant = 'title',
  transparent = false,
}: Props) {
  const eyebrow = variant === 'eyebrow';

  return (
    <View style={[styles.header, transparent ? styles.transparent : null]}>
      {eyebrow ? null : (
        <View style={styles.side}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              hitSlop={HIT}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backBtn}>
              <ChevronLeft size={22} color={theme.colors.text.primary} strokeWidth={ICON_STROKE} />
            </Pressable>
          ) : (
            leftSlot
          )}
        </View>
      )}

      <Text style={eyebrow ? styles.eyebrow : styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.sideRight}>{rightSlot}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 44,
    height: 116,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  side: {
    width: 56,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sideRight: {
    width: 56,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(28,43,45,0.04)',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2.6,
    color: theme.colors.text.primary,
  },
  eyebrow: {
    flex: 1,
    textAlign: 'left',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: theme.colors.calm,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomColor: theme.colors.hairline,
  },
});

export default ScreenHeader;
