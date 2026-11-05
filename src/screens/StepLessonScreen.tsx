import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AppShell from '../components/AppShell';
import SafetyFootnote from '../components/SafetyFootnote';
import ScreenHeader from '../components/ScreenHeader';
import SecondaryButton from '../components/SecondaryButton';
import StepCard from '../components/StepCard';
import StepDots from '../components/StepDots';
import { Play } from '../components/icons';
import { LESSON_FOOTNOTE } from '../constants/config';
import theme from '../constants/theme';
import { Topic } from '../game/content';
import { stepSprites } from '../assets';
import { CARD_MAX_W } from '../utils/layout';

const BACK_W = Math.floor((CARD_MAX_W - 12) * 0.38);
const NEXT_W = CARD_MAX_W - 12 - BACK_W;

type Props = {
  topic: Topic;
  onBack: () => void;
  onComplete: (topicId: string) => void;
};

export function StepLessonScreen({ topic, onBack, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const total = topic.steps.length;
  const step = topic.steps[index];
  const isLast = index === total - 1;

  const goBack = useCallback(() => {
    if (index === 0) {
      onBack();
      return;
    }
    setIndex(prev => prev - 1);
  }, [index, onBack]);

  const goNext = useCallback(() => {
    if (isLast) {
      onComplete(topic.id);
      return;
    }
    setIndex(prev => prev + 1);
  }, [isLast, onComplete, topic.id]);

  return (
    <AppShell variant="light">
      <ScreenHeader
        title={topic.title.toUpperCase()}
        onBack={onBack}
        rightSlot={
          <Text style={styles.counter}>
            {index + 1}/{total}
          </Text>
        }
      />

      <View style={styles.body}>
        <StepCard
          index={index}
          sprite={stepSprites[index % stepSprites.length]}
          heading={step.heading}
          body={step.body}
          warning={step.warning}
          width={CARD_MAX_W}
        />

        <View style={styles.dots}>
          <StepDots count={total} active={index} />
        </View>
      </View>

      <View style={styles.controls}>
        <Text style={styles.hint}>
          {isLast ? 'LAST STEP - THEN PRACTISE IT' : 'READ, THEN MOVE ON'}
        </Text>
        <View style={styles.row}>
          <SecondaryButton
            label="BACK"
            onPress={goBack}
            tone="plain"
            width={BACK_W}
            height={52}
          />
          <PrimaryButton
            label={isLast ? 'START DRILL' : 'NEXT STEP'}
            Icon={isLast ? Play : undefined}
            onPress={goNext}
            width={NEXT_W}
            height={52}
          />
        </View>
        <View style={styles.footer}>
          <SafetyFootnote text={LESSON_FOOTNOTE} />
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dots: {
    marginTop: 16,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.calm,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  hint: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: theme.colors.text.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  footer: {
    marginTop: 12,
  },
});

export default StepLessonScreen;
