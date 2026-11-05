import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import ChecklistRow from '../components/ChecklistRow';
import SafetyFootnote from '../components/SafetyFootnote';
import ScreenHeader from '../components/ScreenHeader';
import theme from '../constants/theme';
import { KIT_ITEMS, KitItem } from '../game/content';
import { CARD_MAX_W } from '../utils/layout';

type Props = {
  onBack: () => void;
};

export function KitChecklistScreen({ onBack }: Props) {
  const [checked, setChecked] = useState<string[]>(['k1', 'k5', 'k10']);

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const at = prev.indexOf(id);
      if (at >= 0) {
        const next = prev.slice();
        next.splice(at, 1);
        return next;
      }
      return prev.concat(id);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: KitItem }) => (
      <ChecklistRow
        label={item.label}
        qty={item.qty}
        checked={checked.indexOf(item.id) >= 0}
        width={CARD_MAX_W}
        onToggle={() => toggle(item.id)}
      />
    ),
    [checked, toggle],
  );

  const keyExtractor = useCallback((item: KitItem) => item.id, []);

  return (
    <AppShell variant="light">
      <ScreenHeader
        title="KIT CHECKLIST"
        onBack={onBack}
        rightSlot={
          <Text style={styles.counter}>
            {checked.length}/{KIT_ITEMS.length}
          </Text>
        }
      />

      <View style={styles.listWrap}>
        <FlatList
          data={KIT_ITEMS}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={10}
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
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.calm,
  },
  footer: {
    paddingVertical: 14,
  },
});

export default KitChecklistScreen;
