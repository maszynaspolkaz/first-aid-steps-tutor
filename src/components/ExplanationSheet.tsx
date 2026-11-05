import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SHEET_IN_MS } from '../constants/config';
import theme from '../constants/theme';
import { CARD_MAX_W } from '../utils/layout';
import { Check, X } from './icons';
import PrimaryButton from './PrimaryButton';

type Props = {
  visible: boolean;
  correct: boolean;
  title: string;
  body: string;
  onContinue: () => void;
};

/**
 * Slide-up verdict panel. The Animated.View is the parent of a Pressable,
 * so it carries pointerEvents="box-none" (dead-button rule).
 */
export function ExplanationSheet({ visible, correct, title, body, onContinue }: Props) {
  const slide = useRef(new Animated.Value(240)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: visible ? 0 : 240,
      duration: SHEET_IN_MS,
      useNativeDriver: true,
    }).start();
  }, [slide, visible]);

  if (!visible) {
    return null;
  }

  const tint = correct ? theme.colors.calm : theme.colors.rescue;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.sheet,
        theme.shadow.sheet,
        { borderTopColor: tint, transform: [{ translateY: slide }] },
      ]}>
      <View style={styles.headRow}>
        <View style={[styles.badge, { backgroundColor: tint + '1A' }]}>
          {correct ? (
            <Check size={22} color={tint} strokeWidth={2} />
          ) : (
            <X size={22} color={tint} strokeWidth={2} />
          )}
        </View>
        <Text style={[styles.verdict, { color: tint }]}>{title}</Text>
      </View>

      <Text style={styles.body}>{body}</Text>

      <View style={styles.cta}>
        <PrimaryButton
          label="CONTINUE"
          onPress={onContinue}
          tone={correct ? 'green' : 'red'}
          width={CARD_MAX_W}
          height={52}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 200,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    borderTopWidth: 2,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verdict: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  body: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(28,43,45,0.78)',
  },
  cta: {
    marginTop: 16,
  },
});

export default ExplanationSheet;
