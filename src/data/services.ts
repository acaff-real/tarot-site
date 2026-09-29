export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  duration: string;
  href: string;
  icon: string;
  deliverables: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'vedic-astrology',
    title: 'Vedic Astrology Consultation',
    subtitle: 'Natal Kundali & Planetary Timing',
    shortDesc: 'A profound examination of your natal blueprint, active planetary periods (Dashas), and current transits to provide clear timing for career, relationships, and life transitions.',
    duration: '75 Minutes',
    href: '/consultations#booking-form',
    icon: 'chart',
    deliverables: [
      'Comprehensive Lagna & Navamsha (D9) chart breakdown',
      'Analysis of active planetary periods (Mahadasha & Antardasha)',
      'Career timing, financial trajectory & relational alignment',
      'Authentic Sattvic remedies (gemstones, mantras, mindful practices)',
      'High-resolution recorded video session & digital Kundali PDF',
    ],
  },
  {
    id: 'tarot',
    title: 'Intuitive Tarot Reading',
    subtitle: 'Archetypal Reflection & Clarity',
    shortDesc: 'A contemplative consultation illuminating subconscious currents, resolving pivotal crossroads, and restoring grounded intuitive self-trust.',
    duration: '50 Minutes',
    href: '/consultations#booking-form',
    icon: 'cards',
    deliverables: [
      'Deep dive into your current energetic threshold',
      'Crossroad analysis and potential trajectory mapping',
      'Clarification of relationship dynamics and interpersonal patterns',
      'Actionable intuitive guidance with grounded practical steps',
      'High-res photo of your spread and audio recording',
    ],
  },
  {
    id: 'numerology',
    title: 'Numerology & Name Consultation',
    subtitle: 'Chaldean Alignment & Life Path',
    shortDesc: 'An in-depth analysis of the phonetic resonance between your birth date and chosen name for life calibration, business naming, and personal clarity.',
    duration: '60 Minutes',
    href: '/consultations#booking-form',
    icon: 'numbers',
    deliverables: [
      'Full Chaldean compound and root name vibration audit',
      'Compatibility analysis between birth path and name numbers',
      'Name correction recommendations if disharmony is detected',
      'Auspicious dates, signature alignment, and personal power numbers',
      'Detailed written Numerology Dossier',
    ],
  },
];
