/**
 * NORDIC_MINIMAL preset (design-system) with the FirstAidStepsTutor accent overrides.
 * The `name` field stays exactly as in preset.ts.
 */
export const theme = {
  name: 'nordic-minimal',

  colors: {
    bg: {
      primary: '#F7FAFA',
      secondary: '#ECF4F4',
      tertiary: '#DCEAEA',
      accent: '#E4F0EE',
    },
    loader: {
      one: 'rgba(13,32,34,0.94)',
      two: 'rgba(18,46,46,0.90)',
      three: 'rgba(28,43,45,0.96)',
    },
    surface: '#FFFFFF',
    surfaceAlt: '#DCEAEA',
    rescue: '#C62F3B',
    rescueDeep: '#A82430',
    rescueTint: 'rgba(198,47,59,0.08)',
    calm: '#1F8A70',
    calmDeep: '#17715B',
    calmTint: 'rgba(31,138,112,0.10)',
    amber: '#D98C1F',
    text: {
      primary: '#1C2B2D',
      secondary: 'rgba(28,43,45,0.60)',
      muted: 'rgba(28,43,45,0.45)',
      onDark: '#F7FAFA',
      onDarkMuted: 'rgba(247,250,250,0.62)',
      onDarkFaint: 'rgba(247,250,250,0.40)',
    },
    border: '#DCEAEA',
    hairline: 'rgba(28,43,45,0.10)',
    hairlineFaint: 'rgba(28,43,45,0.06)',
  },

  gradients: {
    page: ['#F7FAFA', '#ECF4F4', '#DCEAEA'],
    result: ['#F7FAFA', '#E4F0EE'],
    loader: ['rgba(13,32,34,0.94)', 'rgba(18,46,46,0.90)', 'rgba(28,43,45,0.96)'],
    rescue: ['#C62F3B', '#A82430'],
    calm: ['#1F8A70', '#17715B'],
    progress: ['#C62F3B', '#1F8A70'],
  },

  typography: {
    hero: { fontSize: 44, fontWeight: '800' as const, letterSpacing: -1, lineHeight: 46 },
    display: { fontSize: 56, fontWeight: '800' as const, letterSpacing: -1 },
    title: { fontSize: 24, fontWeight: '700' as const, letterSpacing: 0 },
    subtitle: { fontSize: 20, fontWeight: '700' as const, letterSpacing: 0 },
    body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
    label: { fontSize: 13, fontWeight: '700' as const, letterSpacing: 1.4 },
    eyebrow: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 3 },
    caption: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 1.2 },
  },

  radius: { xs: 6, sm: 8, md: 10, lg: 12, xl: 18, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 },

  shadow: {
    card: {
      shadowColor: '#1C2B2D',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    cta: {
      shadowColor: '#C62F3B',
      shadowOpacity: 0.28,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
    ctaCalm: {
      shadowColor: '#1F8A70',
      shadowOpacity: 0.26,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5,
    },
    sheet: {
      shadowColor: '#1C2B2D',
      shadowOpacity: 0.16,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: -6 },
      elevation: 14,
    },
  },
};

export type Theme = typeof theme;
export default theme;
