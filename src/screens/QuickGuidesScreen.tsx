import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import GuideTile from '../components/GuideTile';
import SafetyFootnote from '../components/SafetyFootnote';
import ScreenHeader from '../components/ScreenHeader';
import theme from '../constants/theme';
import { GUIDES, Guide } from '../game/content';
import { GUIDE_GAP, GUIDE_TILE } from '../utils/layout';

type Props = {
  onBack: () => void;
};

export function QuickGuidesScreen({ onBack }: Props) {
  const [activeId, setActiveId] = useState<string>(GUIDES[0].id);
  const active = GUIDES.find(g => g.id === activeId);

  const renderItem = useCallback(
    ({ item }: { item: Guide }) => (
      <GuideTile
        title={item.title}
        icon={item.icon}
        active={item.id === activeId}
        width={GUIDE_TILE}
        onPress={() => setActiveId(item.id)}
      />
    ),
    [activeId],
  );

  const keyExtractor = useCallback((item: Guide) => item.id, []);

  return (
    <AppShell variant="light">
      <ScreenHeader
        title="QUICK GUIDES"
        onBack={onBack}
        rightSlot={<Text style={styles.counter}>{GUIDES.length}</Text>}
      />

      <View style={styles.grid}>
        <FlatList
          data={GUIDES}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.column}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          initialNumToRender={6}
        />
      </View>

      {active ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{active.title.toUpperCase()}</Text>
          {active.lines.map((line, i) => (
            <View key={line} style={styles.lineRow}>
              <View style={styles.lineBadge}>
                <Text style={styles.lineNum}>{i + 1}</Text>
              </View>
              <Text style={styles.lineText}>{line}</Text>
            </View>
          ))}
          <View style={styles.footer}>
            <SafetyFootnote />
          </View>
        </View>
      ) : null}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  gridContent: {
    paddingBottom: 4,
  },
  column: {
    justifyContent: 'space-between',
    gap: GUIDE_GAP,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.calm,
  },
  panel: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    borderTopWidth: 2,
    borderTopColor: theme.colors.rescue,
  },
  panelTitle: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.4,
    color: theme.colors.text.primary,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  lineBadge: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.calmTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineNum: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.calm,
  },
  lineText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.text.primary,
  },
  footer: {
    marginTop: 10,
  },
});

export default QuickGuidesScreen;
