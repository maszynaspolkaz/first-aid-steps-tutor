/**
 * FirstAidStepsTutor - offline first aid step trainer.
 * App.tsx is the state machine only (rule #2); no gameplay lives here.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';
import { SCREEN_FADE_MS } from './src/constants/config';
import theme from './src/constants/theme';
import { TOPICS, Topic, topicById } from './src/game/content';
import { RoundResult } from './src/hooks/useDrillRound';
import GameOverScreen from './src/screens/GameOverScreen';
import KitChecklistScreen from './src/screens/KitChecklistScreen';
import LoaderScreen from './src/screens/LoaderScreen';
import MenuScreen from './src/screens/MenuScreen';
import QuickGuidesScreen from './src/screens/QuickGuidesScreen';
import RhythmTrainerScreen from './src/screens/RhythmTrainerScreen';
import SafetyNoticeScreen from './src/screens/SafetyNoticeScreen';
import GameScreen from './src/screens/GameScreen';
import StepLessonScreen from './src/screens/StepLessonScreen';
import TopicListScreen from './src/screens/TopicListScreen';

type Screen =
  | 'loader'
  | 'menu'
  | 'topics'
  | 'lesson'
  | 'game'
  | 'gameover'
  | 'rhythm'
  | 'guides'
  | 'kit'
  | 'safety';

function nextUncompleted(completed: string[]): Topic {
  const found = TOPICS.find(t => completed.indexOf(t.id) < 0);
  return found ? found : TOPICS[0];
}

/** Cross-fade wrapper. box-none so the fade never swallows a tap. */
function ScreenFade({ screenKey, children }: { screenKey: string; children: React.ReactNode }) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    const anim = Animated.timing(fade, {
      toValue: 1,
      duration: SCREEN_FADE_MS,
      useNativeDriver: true,
    });
    anim.start();
    return () => {
      anim.stop();
    };
  }, [fade, screenKey]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.fade,
        {
          opacity: fade,
          transform: [
            { translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
}

function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('loader');
  const [completed, setCompleted] = useState<string[]>([]);
  const [lessonTopicId, setLessonTopicId] = useState<string>(TOPICS[0].id);
  const [drillTopicId, setDrillTopicId] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [drillRun, setDrillRun] = useState(0);

  const nextTopic = nextUncompleted(completed);

  const goMenu = useCallback(() => setScreen('menu'), []);

  const openLesson = useCallback((topicId: string) => {
    setLessonTopicId(topicId);
    setScreen('lesson');
  }, []);

  const startNextLesson = useCallback(() => {
    setLessonTopicId(nextTopic.id);
    setScreen('lesson');
  }, [nextTopic.id]);

  const startDrill = useCallback((topicId?: string) => {
    setDrillTopicId(topicId);
    setDrillRun(prev => prev + 1);
    setScreen('game');
  }, []);

  const finishLesson = useCallback(
    (topicId: string) => {
      setCompleted(prev => (prev.indexOf(topicId) >= 0 ? prev : prev.concat(topicId)));
      startDrill(topicId);
    },
    [startDrill],
  );

  /** The round is over: App leaves 'game' for the discrete 'gameover' screen (rule #12). */
  const handleGameOver = useCallback((round: RoundResult) => {
    setResult(round);
    setScreen('gameover');
  }, []);

  let body: React.ReactNode = null;

  if (screen === 'loader') {
    body = <LoaderScreen onFinish={goMenu} />;
  } else if (screen === 'menu') {
    body = (
      <MenuScreen
        nextTopic={nextTopic}
        completed={completed.length}
        totalTopics={TOPICS.length}
        onStartLesson={startNextLesson}
        onBrowseTopics={() => setScreen('topics')}
        onPractice={() => startDrill(undefined)}
        onRhythm={() => setScreen('rhythm')}
        onGuides={() => setScreen('guides')}
        onKit={() => setScreen('kit')}
        onSafety={() => setScreen('safety')}
      />
    );
  } else if (screen === 'topics') {
    body = (
      <TopicListScreen completed={completed} onBack={goMenu} onOpenTopic={openLesson} />
    );
  } else if (screen === 'lesson') {
    body = (
      <StepLessonScreen
        topic={topicById(lessonTopicId)}
        onBack={() => setScreen('topics')}
        onComplete={finishLesson}
      />
    );
  } else if (screen === 'game') {
    body = (
      <GameScreen
        key={'game-' + String(drillRun)}
        completed={completed}
        preferTopic={drillTopicId}
        onBack={goMenu}
        onGameOver={handleGameOver}
      />
    );
  } else if (screen === 'gameover' && result) {
    body = (
      <GameOverScreen
        result={result}
        onDrillAgain={() => startDrill(drillTopicId)}
        onHome={goMenu}
      />
    );
  } else if (screen === 'rhythm') {
    body = <RhythmTrainerScreen onBack={goMenu} />;
  } else if (screen === 'guides') {
    body = <QuickGuidesScreen onBack={goMenu} />;
  } else if (screen === 'kit') {
    body = <KitChecklistScreen onBack={goMenu} />;
  } else if (screen === 'safety') {
    body = <SafetyNoticeScreen onBack={goMenu} />;
  } else {
    body = (
      <MenuScreen
        nextTopic={nextTopic}
        completed={completed.length}
        totalTopics={TOPICS.length}
        onStartLesson={startNextLesson}
        onBrowseTopics={() => setScreen('topics')}
        onPractice={() => startDrill(undefined)}
        onRhythm={() => setScreen('rhythm')}
        onGuides={() => setScreen('guides')}
        onKit={() => setScreen('kit')}
        onSafety={() => setScreen('safety')}
      />
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle={screen === 'loader' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ScreenFade screenKey={screen + '-' + String(drillRun)}>{body}</ScreenFade>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  fade: {
    flex: 1,
  },
});

export default App;
