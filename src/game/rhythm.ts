import { BPM_SAFE_MAX, BPM_SAFE_MIN, BPM_GAUGE_MAX, BPM_GAUGE_MIN } from '../constants/config';
import { clamp } from '../utils/layout';

export type RhythmZone = 'in' | 'near' | 'out';

export function zoneFor(bpm: number): RhythmZone {
  if (bpm >= BPM_SAFE_MIN && bpm <= BPM_SAFE_MAX) {
    return 'in';
  }
  if ((bpm >= 90 && bpm < BPM_SAFE_MIN) || (bpm > BPM_SAFE_MAX && bpm <= 130)) {
    return 'near';
  }
  return 'out';
}

/** 0..1 position of a bpm value on the gauge track. */
export function gaugeFraction(bpm: number): number {
  return clamp((bpm - BPM_GAUGE_MIN) / (BPM_GAUGE_MAX - BPM_GAUGE_MIN), 0, 1);
}

/** Mean of the supplied intervals, expressed as beats per minute. */
export function bpmFromIntervals(intervals: number[]): number {
  if (intervals.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < intervals.length; i += 1) {
    sum += intervals[i];
  }
  const mean = sum / intervals.length;
  if (mean <= 0) {
    return 0;
  }
  return Math.round(60000 / mean);
}

export function beatInterval(targetBpm: number): number {
  return Math.round(60000 / targetBpm);
}
