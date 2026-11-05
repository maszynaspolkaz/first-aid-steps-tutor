import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import assets from '../assets';
import AppShell from '../components/AppShell';
import SafetyFootnote from '../components/SafetyFootnote';
import ScreenHeader from '../components/ScreenHeader';
import SecondaryButton from '../components/SecondaryButton';
import { AlertTriangle, ICON_STROKE } from '../components/icons';
import theme from '../constants/theme';
import { CARD_MAX_W } from '../utils/layout';

const PARAGRAPHS = [
  'This app is educational. It supplements, and does not replace, certified first aid training from a recognised provider.',
  'In a real emergency, call your local emergency services first and follow the instructions the operator gives you.',
  'The content is general guidance and may differ from the protocols used where you live or work.',
  'The rhythm trainer is a pacing aid for practice only. It is not a certification and it does not assess technique.',
];

type Props = {
  onBack: () => void;
};

export function SafetyNoticeScreen({ onBack }: Props) {
  return (
    <AppShell variant="light">
      <ScreenHeader title="SAFETY NOTICE" onBack={onBack} />

      <View style={styles.body}>
        <Text style={styles.heading}>SAFETY</Text>
        <Text style={styles.headingAccent}>NOTICE</Text>
        <View style={styles.rule} />

        {PARAGRAPHS.map(text => (
          <Text key={text} style={styles.paragraph}>
            {text}
          </Text>
        ))}

        <View style={styles.callout}>
          <AlertTriangle size={18} color={theme.colors.rescue} strokeWidth={ICON_STROKE} />
          <Text style={styles.calloutText}>
            IF SOMEONE IS UNRESPONSIVE - CALL EMERGENCY SERVICES NOW
          </Text>
        </View>

        <Image source={assets.iconHome} style={styles.mark} resizeMode="contain" />

        <View style={styles.spacer} />

        <SecondaryButton
          label="BACK TO HOME"
          onPress={onBack}
          tone="plain"
          width={CARD_MAX_W}
          height={56}
        />
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  heading: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: theme.colors.text.primary,
  },
  headingAccent: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: theme.colors.rescue,
  },
  rule: {
    marginTop: 10,
    marginBottom: 16,
    width: 48,
    height: 2,
    backgroundColor: theme.colors.rescue,
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(28,43,45,0.80)',
  },
  callout: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.rescueTint,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.rescue,
  },
  calloutText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: theme.colors.rescue,
  },
  mark: {
    marginTop: 18,
    alignSelf: 'center',
    width: 56,
    height: 56,
    opacity: 0.35,
  },
  spacer: {
    flex: 1,
    minHeight: 10,
  },
  footer: {
    marginTop: 12,
  },
});

export default SafetyNoticeScreen;
