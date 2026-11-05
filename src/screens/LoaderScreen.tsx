import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import assets from '../assets';
import AppShell from '../components/AppShell';
import SafetyFootnote from '../components/SafetyFootnote';
import { LOADER_DURATION_MS, LOADER_FADE_MS } from '../constants/config';
import theme from '../constants/theme';

const BAR_W = 180;

type Props = {
  onFinish: () => void;
};

/**
 * Rule #13: exactly 8000ms. Rule #14: a deliberately dark shell so the Loader
 * never perceptually matches the Menu.
 */
export function LoaderScreen({ onFinish }: Props) {
  const mark = useRef(new Animated.Value(0)).current;
  const title = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const entry = Animated.sequence([
      Animated.delay(120),
      Animated.parallel([
        Animated.timing(mark, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(mark, {
          toValue: 1,
          tension: 48,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(title, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
    entry.start();

    // width is a layout prop: native driver stays off (rule #8).
    const grow = Animated.timing(bar, {
      toValue: BAR_W,
      duration: LOADER_DURATION_MS,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    grow.start();

    const timer = setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: LOADER_FADE_MS,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, LOADER_DURATION_MS);

    return () => {
      clearTimeout(timer);
      entry.stop();
      grow.stop();
    };
  }, [mark, title, bar, fade, onFinish]);

  const markStyle = {
    opacity: mark,
    transform: [
      { scale: mark.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) },
    ],
  };
  const titleStyle = {
    opacity: title,
    transform: [
      { translateY: title.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
    ],
  };

  return (
    <AppShell variant="dark">
      <Animated.View pointerEvents="box-none" style={[styles.root, { opacity: fade }]}>
        <View style={styles.center}>
          <View style={styles.crossRule} />

          <Animated.View pointerEvents="box-none" style={[styles.frame, markStyle]}>
            <Image source={assets.logo} style={styles.logo} resizeMode="contain" />
          </Animated.View>

          <View style={styles.crossRule} />

          <Animated.View pointerEvents="box-none" style={[styles.titleBlock, titleStyle]}>
            <Text style={styles.titleOne}>FIRST AID</Text>
            <Text style={styles.titleTwo}>STEPS TUTOR</Text>
            <Text style={styles.subtitle}>LEARN THE FIRST THREE STEPS</Text>
          </Animated.View>

          <View style={styles.barBlock}>
            <View style={styles.track}>
              <Animated.View pointerEvents="none" style={[styles.fillWrap, { width: bar }]}>
                <LinearGradient
                  colors={theme.gradients.progress}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fill}
                />
              </Animated.View>
            </View>
            <Text style={styles.loading}>LOADING...</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <SafetyFootnote variant="dark" />
        </View>
      </Animated.View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossRule: {
    width: 72,
    height: 1,
    marginVertical: 24,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  frame: {
    width: 168,
    height: 168,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 128,
    height: 128,
  },
  titleBlock: {
    alignItems: 'center',
  },
  titleOne: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: 5,
    color: theme.colors.text.onDark,
  },
  titleTwo: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: 7,
    color: theme.colors.text.onDarkMuted,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.4,
    color: theme.colors.calm,
  },
  barBlock: {
    marginTop: 44,
    alignItems: 'center',
  },
  track: {
    width: BAR_W,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  fillWrap: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  loading: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 3,
    color: theme.colors.text.onDarkFaint,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 72,
    alignItems: 'center',
  },
});

export default LoaderScreen;
