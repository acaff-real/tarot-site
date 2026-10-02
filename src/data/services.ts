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
    id: 'individual-reading',
    title: 'Individual Reading',
    subtitle: 'Natal Blueprint, Timing & Crossroads',
    shortDesc: 'A comprehensive deep dive into your personal chart combining Western and Vedic astrology with intuitive Tarot guidance for career, purpose, and upcoming life transitions.',
    duration: '75 Minutes',
    href: '/consultations#booking-form',
    icon: 'chart',
    deliverables: [
      'Deep synthesis of Western Tropical and Vedic Sidereal charts',
      'Vimshottari Dasha timing cycles and major planetary transits',
      'Career direction, financial vitality, and spiritual alignment',
      'Intuitive Tarot spread to address immediate crossroads',
      'High-resolution video recording and personalized notes',
    ],
  },
  {
    id: 'relationship-reading',
    title: 'Relationship Reading',
    subtitle: 'Synastry, Compatibility & Dynamics',
    shortDesc: 'An illuminating exploration of the connection between two individuals, uncovering interpersonal dynamics, emotional sanctuary, and mutual growth pathways.',
    duration: '90 Minutes',
    href: '/consultations#booking-form',
    icon: 'cards',
    deliverables: [
      'Dual natal chart comparison and synastry analysis',
      'Composite chart examination for shared life trajectory',
      'Nakshatra compatibility and emotional communication styles',
      'Relationship Tarot consultation for mutual clarity',
      'Full recorded video session with actionable insights',
    ],
  },
  {
    id: 'family-reading',
    title: 'Family Reading',
    subtitle: 'Intergenerational Harmony & Dynamics',
    shortDesc: 'A holistic exploration designed to bring profound understanding across family relationships, children’s developmental energies, and generational patterns.',
    duration: '90–120 Minutes',
    href: '/consultations#booking-form',
    icon: 'numbers',
    deliverables: [
      'Multi-chart assessment across family members',
      'Child developmental strengths, learning inclinations, and innate nature',
      'Interpersonal harmony, communication bridges, and home environment',
      'Tarot consultation focused on family alignment and healing',
      'High-resolution video recording and family chart summary',
    ],
  },
];
