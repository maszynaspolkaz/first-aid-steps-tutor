import { SCORE_EXACT, SCORE_NEAR } from '../constants/config';

export type OrderVerdict = 'exact' | 'near' | 'wrong';

/**
 * `sequence[slot]` holds the canonical index of the step the user put in that slot.
 * A perfect answer is [0, 1, 2, 3].
 */
export function gradeOrder(sequence: number[]): OrderVerdict {
  let mismatches = 0;
  let firstBad = -1;
  for (let i = 0; i < sequence.length; i += 1) {
    if (sequence[i] !== i) {
      mismatches += 1;
      if (firstBad < 0) {
        firstBad = i;
      }
    }
  }
  if (mismatches === 0) {
    return 'exact';
  }
  // Exactly one adjacent pair swapped: two mismatches, next to each other, mirrored.
  if (
    mismatches === 2 &&
    firstBad + 1 < sequence.length &&
    sequence[firstBad] === firstBad + 1 &&
    sequence[firstBad + 1] === firstBad
  ) {
    return 'near';
  }
  return 'wrong';
}

export function orderPoints(verdict: OrderVerdict): number {
  if (verdict === 'exact') {
    return SCORE_EXACT;
  }
  if (verdict === 'near') {
    return SCORE_NEAR;
  }
  return 0;
}

export function choicePoints(picked: number, correct: number): number {
  return picked === correct ? SCORE_EXACT : 0;
}

export function accuracy(correct: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return Math.round((correct / total) * 100);
}

/** Fisher-Yates on a copy; never mutates the source array. */
export function shuffle<T>(input: T[]): T[] {
  const out = input.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/** A shuffled index list that is guaranteed not to be the identity order. */
export function shuffledIndices(count: number): number[] {
  const base: number[] = [];
  for (let i = 0; i < count; i += 1) {
    base.push(i);
  }
  if (count < 2) {
    return base;
  }
  let out = shuffle(base);
  let identical = true;
  for (let i = 0; i < count; i += 1) {
    if (out[i] !== i) {
      identical = false;
      break;
    }
  }
  if (identical) {
    const tmp = out[0];
    out[0] = out[count - 1];
    out[count - 1] = tmp;
  }
  return out;
}
