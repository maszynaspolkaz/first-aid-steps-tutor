import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import assets from '../assets';
import theme from '../constants/theme';

export type ShellVariant = 'light' | 'dark' | 'result';

const OVERLAYS: Record<ShellVariant, string[]> = {
  light: ['rgba(247,250,250,0.92)', 'rgba(236,244,244,0.95)', 'rgba(220,234,234,0.97)'],
  dark: ['rgba(13,32,34,0.94)', 'rgba(18,46,46,0.90)', 'rgba(28,43,45,0.96)'],
  result: ['rgba(247,250,250,0.94)', 'rgba(228,240,238,0.96)', 'rgba(214,234,230,0.97)'],
};

type Props = {
  variant?: ShellVariant;
  children: React.ReactNode;
};

/**
 * The single background used by every screen: bg_game plus a per-screen
 * gradient overlay (rule #14 - Loader is deliberately much darker).
 */
export function AppShell({ variant = 'light', children }: Props) {
  const isDark = variant === 'dark';
  const start = isDark ? { x: 0, y: 0 } : { x: 0, y: 0 };
  const end = isDark ? { x: 1, y: 1 } : { x: 0, y: 1 };

  return (
    <ImageBackground source={assets.bgGame} style={styles.bg} resizeMode="cover">
      <LinearGradient
        colors={OVERLAYS[variant]}
        start={start}
        end={end}
        style={StyleSheet.absoluteFill}
      />
      {isDark ? null : <Decor variant={variant} />}
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

function Decor({ variant }: { variant: ShellVariant }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={variant === 'result' ? styles.blobResult : styles.blobOne} />
      <View style={styles.blobTwo} />
      <View style={[styles.rule, { top: 182 }]} />
      <View style={[styles.rule, { top: 404 }]} />
      <View style={[styles.rule, { top: 626 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  content: {
    flex: 1,
  },
  blobOne: {
    position: 'absolute',
    top: -60,
    right: -70,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(31,138,112,0.07)',
  },
  blobResult: {
    position: 'absolute',
    top: -70,
    alignSelf: 'center',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(31,138,112,0.10)',
  },
  blobTwo: {
    position: 'absolute',
    bottom: 120,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(198,47,59,0.05)',
  },
  rule: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: theme.colors.hairlineFaint,
  },
});

export default AppShell;
