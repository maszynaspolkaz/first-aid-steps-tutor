import { useCallback, useMemo, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import { HAPTIC_MS, ROUND_SIZE } from '../constants/config';
import { SCENARIOS, Scenario, topicShort, topicTitle } from '../game/content';
import {
  accuracy,
  choicePoints,
  gradeOrder,
  orderPoints,
  shuffle,
  shuffledIndices,
} from '../game/scoring';

export type Review = {
  id: string;
  index: number;
  step: string;
  reason: string;
  ok: boolean;
};

export type RoundResult = {
  correct: number;
  total: number;
  score: number;
  streak: number;
  accuracy: number;
  topicLabel: string;
  reviews: Review[];
};

export type OrderCardState = {
  key: string;
  canonical: number;
  text: string;
  slot: number;
};

export type DrillPhase = 'idle' | 'explained';

function buildRound(completed: string[]): Scenario[] {
  const pool =
    completed.length >= 2
      ? SCENARIOS.filter(s => completed.indexOf(s.topicId) >= 0)
      : SCENARIOS;
  const source = pool.length >= ROUND_SIZE ? pool : SCENARIOS;
  const picked = shuffle(source).slice(0, ROUND_SIZE);
  while (picked.length < ROUND_SIZE) {
    picked.push(SCENARIOS[picked.length % SCENARIOS.length]);
  }
  return picked;
}

function makeCards(scenario: Scenario): OrderCardState[] {
  if (scenario.mode !== 'order') {
    return [];
  }
  const order = shuffledIndices(scenario.steps.length);
  return order.map((canonical, i) => ({
    key: scenario.id + '-' + String(i),
    canonical,
    text: scenario.steps[canonical],
    slot: 0,
  }));
}

export function useDrillRound(completed: string[], preferTopic?: string) {
  const seed = useRef<string[]>(completed);
  seed.current = completed;

  const [round, setRound] = useState<Scenario[]>(() => {
    const built = buildRound(completed);
    if (preferTopic) {
      const idx = built.findIndex(s => s.topicId === preferTopic);
      if (idx > 0) {
        const head = built[idx];
        built[idx] = built[0];
        built[0] = head;
      }
    }
    return built;
  });

  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState<OrderCardState[]>(() => makeCards(round[0]));
  const [placed, setPlaced] = useState<number[]>([]);
  const [picked, setPicked] = useState(-1);
  const [phase, setPhase] = useState<DrillPhase>('idle');
  const [lastOk, setLastOk] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const bestStreak = useRef(0);
  const reviews = useRef<Review[]>([]);

  const scenario = round[index];
  const total = round.length;

  const canCheck =
    scenario.mode === 'order' ? placed.length === cards.length : picked >= 0;

  const slotOf = useCallback(
    (cardIndex: number) => {
      const at = placed.indexOf(cardIndex);
      return at < 0 ? 0 : at + 1;
    },
    [placed],
  );

  const tapCard = useCallback(
    (cardIndex: number) => {
      if (phase !== 'idle') {
        return;
      }
      setPlaced(prev => {
        const at = prev.indexOf(cardIndex);
        if (at >= 0) {
          const next = prev.slice();
          next.splice(at, 1);
          return next;
        }
        Vibration.vibrate(HAPTIC_MS);
        return prev.concat(cardIndex);
      });
    },
    [phase],
  );

  const pickOption = useCallback(
    (optionIndex: number) => {
      if (phase !== 'idle') {
        return;
      }
      Vibration.vibrate(HAPTIC_MS);
      setPicked(optionIndex);
    },
    [phase],
  );

  const check = useCallback(() => {
    if (phase !== 'idle' || !canCheck) {
      return;
    }
    let ok = false;
    let gained = 0;

    if (scenario.mode === 'order') {
      const sequence = placed.map(cardIndex => cards[cardIndex].canonical);
      const verdict = gradeOrder(sequence);
      gained = orderPoints(verdict);
      ok = verdict === 'exact';
    } else {
      gained = choicePoints(picked, scenario.correct);
      ok = picked === scenario.correct;
    }

    setScore(prev => prev + gained);
    setLastOk(ok);
    if (ok) {
      setCorrect(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak.current) {
          bestStreak.current = next;
        }
        return next;
      });
    } else {
      setStreak(0);
    }

    reviews.current = reviews.current.concat({
      id: scenario.id,
      index: index + 1,
      step:
        scenario.mode === 'order'
          ? scenario.steps[0]
          : scenario.options[scenario.correct],
      reason: scenario.reason,
      ok,
    });

    setPhase('explained');
  }, [phase, canCheck, scenario, placed, cards, picked, index]);

  const advance = useCallback((): RoundResult | null => {
    if (index + 1 >= total) {
      const answered = reviews.current;
      const wrong = answered.filter(r => !r.ok);
      const shown = (wrong.length >= 2 ? wrong : answered).slice(0, 3);
      return {
        correct,
        total,
        score,
        streak: bestStreak.current,
        accuracy: accuracy(correct, total),
        topicLabel: topicTitle(scenario.topicId),
        reviews: shown,
      };
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setCards(makeCards(round[nextIndex]));
    setPlaced([]);
    setPicked(-1);
    setPhase('idle');
    return null;
  }, [index, total, round, correct, score, scenario]);

  const restart = useCallback(() => {
    const built = buildRound(seed.current);
    setRound(built);
    setIndex(0);
    setCards(makeCards(built[0]));
    setPlaced([]);
    setPicked(-1);
    setPhase('idle');
    setScore(0);
    setCorrect(0);
    setStreak(0);
    bestStreak.current = 0;
    reviews.current = [];
  }, []);

  const topicLabel = useMemo(() => topicShort(scenario.topicId), [scenario.topicId]);

  return {
    scenario,
    index,
    total,
    cards,
    slotOf,
    tapCard,
    picked,
    pickOption,
    canCheck,
    phase,
    lastOk,
    score,
    correct,
    streak,
    topicLabel,
    check,
    advance,
    restart,
  };
}

export default useDrillRound;
