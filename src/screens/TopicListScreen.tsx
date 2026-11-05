import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import SafetyFootnote from '../components/SafetyFootnote';
import ScreenHeader from '../components/ScreenHeader';
import TopicRow from '../components/TopicRow';
import theme from '../constants/theme';
import { TOPIC_GROUPS, TOPICS, Topic } from '../game/content';
import { CARD_MAX_W } from '../utils/layout';

type Row =
  | { kind: 'group'; key: string; label: string }
  | { kind: 'topic'; key: string; topic: Topic };

type Props = {
  completed: string[];
  onBack: () => void;
  onOpenTopic: (topicId: string) => void;
};

export function TopicListScreen({ completed, onBack, onOpenTopic }: Props) {
  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    TOPIC_GROUPS.forEach(group => {
      out.push({ kind: 'group', key: 'g-' + group, label: group });
      TOPICS.filter(t => t.group === group).forEach(topic => {
        out.push({ kind: 'topic', key: topic.id, topic });
      });
    });
    return out;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Row }) => {
      if (item.kind === 'group') {
        return (
          <View style={styles.groupRow}>
            <Text style={styles.groupLabel}>{item.label}</Text>
            <View style={styles.groupRule} />
          </View>
        );
      }
      const topic = item.topic;
      return (
        <TopicRow
          title={topic.title}
          icon={topic.icon}
          tone={topic.tone}
          steps={topic.steps.length}
          minutes={topic.minutes}
          done={completed.indexOf(topic.id) >= 0}
          width={CARD_MAX_W}
          onPress={() => onOpenTopic(topic.id)}
        />
      );
    },
    [completed, onOpenTopic],
  );

  const keyExtractor = useCallback((item: Row) => item.key, []);

  return (
    <AppShell variant="light">
      <ScreenHeader
        title="TOPICS"
        onBack={onBack}
        rightSlot={
          <Text style={styles.counter}>
            {completed.length}/{TOPICS.length}
          </Text>
        }
      />

      <View style={styles.listWrap}>
        <FlatList
          data={rows}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={8}
          windowSize={7}
        />
      </View>

      <View style={styles.footer}>
        <SafetyFootnote />
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  listWrap: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
    marginBottom: 10,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.4,
    color: theme.colors.text.secondary,
  },
  groupRule: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.hairline,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.calm,
  },
  footer: {
    paddingVertical: 12,
  },
});

export default TopicListScreen;
