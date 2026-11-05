/** Tunable app parameters. */

/** Splash duration. Rule #13: exactly 8000ms, never shorter. */
export const LOADER_DURATION_MS = 8000;

/** Loader fade-out before the menu appears. */
export const LOADER_FADE_MS = 240;

/** Standard cross-fade between screens. */
export const SCREEN_FADE_MS = 200;

/** Scenarios per drill round. */
export const ROUND_SIZE = 3;

/** Steps per lesson / per order scenario. */
export const STEPS_PER_TOPIC = 4;

/** Scoring. */
export const SCORE_EXACT = 10;
export const SCORE_NEAR = 4;

/** Haptic pulse length on a slot placement (ms). Needs VIBRATE permission. */
export const HAPTIC_MS = 10;

/** Rhythm trainer. */
export const BPM_TARGETS = [100, 110, 120] as const;
export const DEFAULT_BPM_TARGET = 110;
export const BPM_GAUGE_MIN = 60;
export const BPM_GAUGE_MAX = 180;
export const BPM_SAFE_MIN = 100;
export const BPM_SAFE_MAX = 120;
export const TAP_WINDOW = 6;
export const TAP_PUSH_THROTTLE_MS = 150;

/** Animation timings. */
export const PRESS_SPRING = { tension: 300, friction: 18 };
export const ENTRY_SPRING = { tension: 56, friction: 10 };
export const SHEET_IN_MS = 240;
export const SHEET_OUT_MS = 180;
export const CHECK_STROKE_MS = 180;
export const STAGGER_MS = 90;

/** Recurring compliance line. */
export const SAFETY_LINE = 'SUPPLEMENTS - DOES NOT REPLACE - CERTIFIED TRAINING';
export const SAFETY_LINE_DARK = 'NOT A SUBSTITUTE FOR EMERGENCY SERVICES';
export const LESSON_FOOTNOTE =
  'THIS LESSON SUPPLEMENTS CERTIFIED TRAINING - CALL LOCAL EMERGENCY SERVICES FIRST';
