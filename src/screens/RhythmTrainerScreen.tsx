import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import ChipRow from '../components/ChipRow';
import PrimaryButton from '../components/PrimaryButton';
import RateGauge from '../components/RateGauge';
import RhythmPad from '../components/RhythmPad';
import ScreenHeader from '../components/ScreenHeader';
import { HeartPulse, ICON_STROKE, Play, Timer } from '../components/icons';
import { BPM_TARGETS, DEFAULT_BPM_TARGET } from '../constants/config';
import theme from '../constants/theme';
import useMetronome from '../hooks/useMetronome';
import useTapRate from '../hooks/useTapRate';
import { CARD_MAX_W } from '../utils/layout';

type Props = {
  onBack: () => void;
};

export function RhythmTrainerScreen({ onBack }: Props) {
  const [target, setTarget] = useState<number>(DEFAULT_BPM_TARGET);
  const [running, setRunning] = useState(false);
  const { beat } = useMetronome(target, running);
  const { bpm, registerTap, reset } = useTapRate();

  const toggle = useCallback(() => {
    setRunning(prev => {
      if (prev) {
        return false;
      }
      reset();
      return true;
    });
  }, [reset]);

  const changeTarget = useCallback(
    (next: number) => {
      setTarget(next);
      reset();
    },
    [reset],
  );

  return (
    <AppShell variant="light">
      <ScreenHeader
        title="RHYTHM TRAINER"
        onBack={onBack}
        rightSlot={
          <View style={styles.pill}>
            <HeartPulse size={16} color={theme.colors.rescue} strokeWidth={ICON_STROKE} />
            <Text style={styles.pillText}>{bpm > 0 ? bpm : target}</Text>
          </View>
        }
      />

      <View style={styles.area}>
        <RhythmPad beat={beat} running={running} onTap={registerTap} />

        <View style={styles.gauge}>
          <RateGauge bpm={bpm} width={CARD_MAX_W} />
        </View>

        <View style={styles.chips}>
          <Text style={styles.chipsLabel}>TARGET RATE</Text>
          <ChipRow
            options={BPM_TARGETS.slice()}
            value={target}
            width={CARD_MAX_W}
            onChange={changeTarget}
          />
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            PRACTICE ONLY - TAKE A CERTIFIED CPR COURSE
          </Text>
        </View>
        <PrimaryButton
          label={running ? 'STOP' : 'START RHYTHM'}
          Icon={running ? Timer : Play}
          onPress={toggle}
          tone={running ? 'green' : 'red'}
          width={CARD_MAX_W}
          height={60}
        />
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  gauge: {
    marginTop: 20,
  },
  chips: {
    marginTop: 18,
    alignItems: 'center',
  },
  chipsLabel: {
    marginBottom: 8,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.4,
    color: theme.colors.text.secondary,
  },
  pill: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.rescueTint,
  },
  pillText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
    color: theme.colors.rescue,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  disclaimer: {
    marginBottom: 12,
    padding: 10,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(198,47,59,0.07)',
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: theme.colors.rescue,
  },
});

export default RhythmTrainerScreen;
