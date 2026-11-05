import React from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import assets from '../assets';
import AppShell from '../components/AppShell';
import EditorialHero from '../components/EditorialHero';
import NextLessonCard from '../components/NextLessonCard';
import PrimaryButton from '../components/PrimaryButton';
import ProgressLine from '../components/ProgressLine';
import SafetyFootnote from '../components/SafetyFootnote';
import ScreenHeader from '../components/ScreenHeader';
import SecondaryButton from '../components/SecondaryButton';
import { HeartPulse, ICON_STROKE, ListChecks, Play, ShieldAlert } from '../components/icons';
import theme from '../constants/theme';
import { Topic } from '../game/content';
import useStaggeredEntry, { entryStyle } from '../hooks/useStaggeredEntry';
import { CARD_MAX_W } from '../utils/layout';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const HALF_W = Math.floor((CARD_MAX_W - 10) / 2);

type Props = {
  nextTopic: Topic;
  completed: number;
  totalTopics: number;
  onStartLesson: () => void;
  onBrowseTopics: () => void;
  onPractice: () => void;
  onRhythm: () => void;
  onGuides: () => void;
  onKit: () => void;
  onSafety: () => void;
};

export function MenuScreen({
  nextTopic,
  completed,
  totalTopics,
  onStartLesson,
  onBrowseTopics,
  onPractice,
  onRhythm,
  onGuides,
  onKit,
  onSafety,
}: Props) {
  const entries = useStaggeredEntry(4);

  return (
    <AppShell variant="light">
      <ScreenHeader
        title="READINESS"
        variant="eyebrow"
        transparent
        rightSlot={
          <Pressable
            onPress={onSafety}
            hitSlop={HIT}
            accessibilityRole="button"
            accessibilityLabel="Safety notice"
            style={styles.shieldBtn}>
            <ShieldAlert size={20} color={theme.colors.rescue} strokeWidth={ICON_STROKE} />
          </Pressable>
        }
      />

      <View style={styles.body}>
        <Animated.View pointerEvents="box-none" style={[styles.heroWrap, entryStyle(entries[0])]}>
          <EditorialHero
            lines={['FIRST', 'AID', 'STEPS']}
            accentIndex={2}
            tagline="SHORT LESSONS - REAL SCENARIOS - OFFLINE"
          />
          <Image
            source={assets.sprite1}
            style={styles.heroArt}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.progressWrap}>
          <ProgressLine
            label="TOPICS COMPLETED"
            value={completed}
            total={totalTopics}
            width={CARD_MAX_W}
          />
        </View>

        <View style={styles.spacer} />

        <Animated.View pointerEvents="box-none" style={entryStyle(entries[1])}>
          <NextLessonCard
            title={nextTopic.title}
            icon={nextTopic.icon}
            steps={nextTopic.steps.length}
            minutes={nextTopic.minutes}
            width={CARD_MAX_W}
            onPress={onBrowseTopics}
          />
        </Animated.View>

        <Text style={styles.hint}>PICK UP WHERE YOU LEFT OFF</Text>

        <Animated.View pointerEvents="box-none" style={entryStyle(entries[2])}>
          <PrimaryButton
            label="START LESSON"
            Icon={Play}
            onPress={onStartLesson}
            width={CARD_MAX_W}
            height={64}
          />
        </Animated.View>

        <Animated.View
          pointerEvents="box-none"
          style={[styles.row, entryStyle(entries[3])]}>
          <SecondaryButton
            label="PRACTICE"
            Icon={ListChecks}
            onPress={onPractice}
            width={HALF_W}
          />
          <SecondaryButton
            label="RHYTHM"
            Icon={HeartPulse}
            onPress={onRhythm}
            width={HALF_W}
          />
        </Animated.View>

        <View style={styles.row}>
          <SecondaryButton
            label="QUICK GUIDES"
            onPress={onGuides}
            tone="plain"
            width={HALF_W}
            height={44}
          />
          <SecondaryButton
            label="KIT CHECKLIST"
            onPress={onKit}
            tone="plain"
            width={HALF_W}
            height={44}
          />
        </View>

        <View style={styles.footer}>
          <SafetyFootnote />
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  shieldBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(198,47,59,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrap: {
    marginTop: 22,
  },
  heroArt: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 128,
    height: 128,
    opacity: 0.95,
  },
  progressWrap: {
    marginTop: 22,
  },
  spacer: {
    flex: 1,
    minHeight: 14,
  },
  hint: {
    marginTop: 14,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: theme.colors.text.secondary,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  footer: {
    marginTop: 12,
    marginBottom: 14,
  },
});

export default MenuScreen;
