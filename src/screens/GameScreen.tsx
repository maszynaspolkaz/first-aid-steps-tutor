import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import ChoiceCard, { ChoiceVisual } from '../components/ChoiceCard';
import ExplanationSheet from '../components/ExplanationSheet';
import OrderCard, { OrderCardVisual } from '../components/OrderCard';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import SituationCard from '../components/SituationCard';
import StatStrip, { StripItem } from '../components/StatStrip';
import { Check, ICON_STROKE, Target } from '../components/icons';
import theme from '../constants/theme';
import assets from '../assets';
import useDrillRound, { RoundResult } from '../hooks/useDrillRound';
import { CARD_MAX_W } from '../utils/layout';

const LETTERS = ['A', 'B', 'C', 'D'];
const SPRITES = [assets.sprite2, assets.sprite3, assets.sprite4, assets.sprite5, assets.sprite1];

type Props = {
  completed: string[];
  preferTopic?: string;
  onBack: () => void;
  onGameOver: (result: RoundResult) => void;
};

export function GameScreen({
  completed,
  preferTopic,
  onBack,
  onGameOver,
}: Props) {
  const round = useDrillRound(completed, preferTopic);
  const {
    scenario,
    index,
    total,
    cards,
    slotOf,
    tapCard,
    picked,
    pickOption,
    canCheck,
    phase,
    lastOk,
    score,
    correct,
    topicLabel,
    check,
    advance,
  } = round;

  const explained = phase === 'explained';

  const onContinue = useCallback(() => {
    const result = advance();
    if (result) {
      onGameOver(result);
    }
  }, [advance, onGameOver]);

  const stripItems: StripItem[] = [
    { key: 'drill', label: 'DRILL', value: index + 1 + '/' + total, color: theme.colors.text.primary },
    { key: 'correct', label: 'CORRECT', value: String(correct), color: theme.colors.calm },
    { key: 'topic', label: 'TOPIC', value: topicLabel, color: theme.colors.rescue },
  ];

  return (
    <AppShell variant="light">
      <ScreenHeader
        title="SCENARIO DRILL"
        onBack={onBack}
        rightSlot={
          <View style={styles.scorePill}>
            <Target size={16} color={theme.colors.calm} strokeWidth={ICON_STROKE} />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        }
      />

      <View style={styles.area}>
        <SituationCard
          text={scenario.text}
          sprite={SPRITES[index % SPRITES.length]}
          width={CARD_MAX_W}
        />

        <View style={styles.cards}>
          {scenario.mode === 'order'
            ? cards.map((card, i) => {
                const slot = slotOf(i);
                let state: OrderCardVisual = slot > 0 ? 'placed' : 'idle';
                if (explained) {
                  state = slot === card.canonical + 1 ? 'correct' : 'wrong';
                }
                return (
                  <OrderCard
                    key={card.key}
                    text={card.text}
                    slot={slot}
                    state={state}
                    width={CARD_MAX_W}
                    onPress={() => tapCard(i)}
                  />
                );
              })
            : scenario.options.map((option, i) => {
                let state: ChoiceVisual = picked === i ? 'selected' : 'idle';
                if (explained) {
                  if (i === scenario.correct) {
                    state = 'correct';
                  } else if (i === picked) {
                    state = 'wrong';
                  } else {
                    state = 'idle';
                  }
                }
                return (
                  <ChoiceCard
                    key={scenario.id + '-' + String(i)}
                    letter={LETTERS[i]}
                    text={option}
                    state={state}
                    width={CARD_MAX_W}
                    onPress={() => pickOption(i)}
                  />
                );
              })}
        </View>
      </View>

      <StatStrip items={stripItems} />

      <View style={styles.controls}>
        <Text style={styles.hint}>
          {scenario.mode === 'order' ? 'TAP THE STEPS IN ORDER' : 'PICK THE NEXT SAFE ACTION'}
        </Text>
        <PrimaryButton
          label="CHECK ANSWER"
          Icon={Check}
          onPress={check}
          disabled={!canCheck || explained}
          width={CARD_MAX_W}
          height={60}
        />
      </View>

      <ExplanationSheet
        visible={explained}
        correct={lastOk}
        title={lastOk ? 'CORRECT ORDER' : 'NOT QUITE'}
        body={scenario.reason}
        onContinue={onContinue}
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 20,
  },
  cards: {
    marginTop: 14,
  },
  scorePill: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.calmTint,
  },
  scoreText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
    color: theme.colors.calm,
  },
  controls: {
    paddingTop: 14,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  hint: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: theme.colors.text.secondary,
  },
});

export default GameScreen;
