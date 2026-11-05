import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import PrimaryButton from '../components/PrimaryButton';
import SafetyFootnote from '../components/SafetyFootnote';
import SecondaryButton from '../components/SecondaryButton';
import StatCard from '../components/StatCard';
import { CheckCircle, Flame, RotateCcw, Target } from '../components/icons';
import theme from '../constants/theme';
import { RoundResult } from '../hooks/useDrillRound';
import useStaggeredEntry, { entryStyle } from '../hooks/useStaggeredEntry';
import { CARD_MAX_W } from '../utils/layout';

type Props = {
  result: RoundResult;
  onDrillAgain: () => void;
  onHome: () => void;
};

/** The mandatory result screen (rule #12). Primary CTA contains AGAIN (rule #11). */
export function GameOverScreen({ result, onDrillAgain, onHome }: Props) {
  const entries = useStaggeredEntry(3, 80);

  const pills = [
    {
      key: 'correct',
      Icon: CheckCircle,
      value: result.correct + '/' + result.total,
      label: 'correct',
      color: theme.colors.calm,
      show: result.correct > 0,
    },
    {
      key: 'accuracy',
      Icon: Target,
      value: result.accuracy + '%',
      label: 'accuracy',
      color: theme.colors.rescue,
      show: result.accuracy > 0,
    },
    {
      key: 'streak',
      Icon: Flame,
      value: String(result.streak),
      label: 'streak',
      color: theme.colors.text.primary,
      show: result.streak > 0,
    },
  ].filter(p => p.show);

  return (
    <AppShell variant="result">
      <View style={styles.body}>
        <Text style={styles.eyebrow}>DRILL COMPLETE</Text>

        <Animated.View pointerEvents="box-none" style={[styles.scoreBlock, entryStyle(entries[0], 10)]}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{result.correct}</Text>
            <Text style={styles.scoreTotal}> / {result.total}</Text>
          </View>
          <Text style={styles.scoreLabel}>STEPS ORDERED CORRECTLY</Text>
          <Text style={styles.points}>{result.score} POINTS</Text>
        </Animated.View>

        {pills.length >= 2 ? (
          <Animated.View
            pointerEvents="box-none"
            style={[styles.statsRow, entryStyle(entries[1], 14)]}>
            {pills.map(pill => (
              <View key={pill.key} style={styles.statSlot}>
                <StatCard
                  Icon={pill.Icon}
                  value={pill.value}
                  label={pill.label}
                  valueColor={pill.color}
                />
              </View>
            ))}
          </Animated.View>
        ) : null}

        <Animated.View pointerEvents="box-none" style={[styles.reviews, entryStyle(entries[2], 14)]}>
          <Text style={styles.reviewHead}>WHY IT MATTERS</Text>
          {result.reviews.map(review => (
            <View key={review.id} style={styles.reviewRow}>
              <View
                style={[
                  styles.reviewBadge,
                  {
                    backgroundColor: review.ok ? theme.colors.calmTint : theme.colors.rescueTint,
                  },
                ]}>
                <Text
                  style={[
                    styles.reviewNum,
                    { color: review.ok ? theme.colors.calm : theme.colors.rescue },
                  ]}>
                  {review.index}
                </Text>
              </View>
              <View style={styles.reviewText}>
                <Text style={styles.reviewStep} numberOfLines={1}>
                  {review.step}
                </Text>
                <Text style={styles.reviewReason} numberOfLines={2}>
                  {review.reason}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.spacer} />

        <View style={styles.cta}>
          <PrimaryButton
            label="DRILL AGAIN"
            Icon={RotateCcw}
            onPress={onDrillAgain}
            width={CARD_MAX_W}
            height={60}
          />
          <View style={styles.secondary}>
            <SecondaryButton
              label="BACK TO HOME"
              onPress={onHome}
              tone="plain"
              width={CARD_MAX_W}
              height={48}
            />
          </View>
          <View style={styles.footer}>
            <SafetyFootnote />
          </View>
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 20,
  },
  eyebrow: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: theme.colors.calm,
  },
  scoreBlock: {
    marginTop: 10,
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 56,
    lineHeight: 62,
    fontWeight: '800',
    letterSpacing: -2,
    color: theme.colors.text.primary,
  },
  scoreTotal: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.muted,
  },
  scoreLabel: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.colors.text.secondary,
  },
  points: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.6,
    color: theme.colors.rescue,
  },
  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  statSlot: {
    flex: 1,
  },
  reviews: {
    marginTop: 18,
  },
  reviewHead: {
    marginBottom: 8,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.4,
    color: theme.colors.text.secondary,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reviewBadge: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewNum: {
    fontSize: 12,
    fontWeight: '800',
  },
  reviewText: {
    flex: 1,
  },
  reviewStep: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  reviewReason: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.text.secondary,
  },
  spacer: {
    flex: 1,
    minHeight: 10,
  },
  cta: {
    paddingBottom: 22,
  },
  secondary: {
    marginTop: 10,
  },
  footer: {
    marginTop: 12,
  },
});

export default GameOverScreen;
