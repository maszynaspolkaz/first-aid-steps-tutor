import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_W = width;
export const SCREEN_H = height;

/** Page gutter used by every screen. */
export const PAGE_PAD = 20;

/** Rule #5: never wider than 380 so padding + border still fit. */
export const CARD_MAX_W = Math.min(SCREEN_W - 2 * PAGE_PAD, 380);

/** Rule #4: tile size inside a padded, bordered parent. */
export function tileSize(cols: number, gap: number, pad = 12, border = 1): number {
  const frame = pad + border;
  return Math.floor((CARD_MAX_W - 2 * frame - gap * (cols - 1)) / cols);
}

/** Guide grid (2 columns). */
export const GUIDE_GAP = 12;
export const GUIDE_TILE = Math.floor((CARD_MAX_W - GUIDE_GAP - 2) / 2);

/** Rhythm pad diameter. */
export const PAD_SIZE = Math.min(SCREEN_W - 120, 260);

export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}
