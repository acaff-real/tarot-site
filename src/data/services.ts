export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  duration: string;
  investment: string;
  href: string;
  icon: string;
  deliverables: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'vedic-astrology',
    title: 'Vedic Astrology Consultation',
    subtitle: 'Nirayana Kundali & Life Architecture',
    shortDesc: 'A profound examination of your natal blueprint, current Vimshottari Dasha cycles, and planetary periods to provide clear timing for career, relationships, and spiritual purpose.',
    duration: '75 Minutes',
    investment: '$275 USD',
    href: '/astrology',
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
    subtitle: 'Psychological Clarity & Sovereign Decision-Making',
    shortDesc: 'A contemplative, archetypal consultation designed to illuminate subconscious undercurrents, resolve pivotal crossroads, and restore intuitive self-trust.',
    duration: '50 Minutes',
    investment: '$195 USD',
    href: '/tarot',
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
    title: 'Sacred Numerology & Name Analysis',
    subtitle: 'Chaldean Sound Vibrations & Destiny Codes',
    shortDesc: 'Analyze the vibrational harmony between your birth date and full legal/chosen name. Ideal for life recalibration, business naming, and energetic alignment.',
    duration: '60 Minutes',
    investment: '$225 USD',
    href: '/numerology',
    icon: 'numbers',
    deliverables: [
      'Full Chaldean compound and root name vibration audit',
      'Compatibility analysis between birth path and name numbers',
      'Name correction recommendations if disharmony is detected',
      'Auspicious dates, signature alignment, and personal power numbers',
      'Detailed written Numerology Dossier',
    ],
  },
  {
    id: 'private-consultations',
    title: 'Private Mentorship & Retainers',
    subtitle: 'Bespoke Executive & Personal Advisory',
    shortDesc: 'Dedicated, ongoing strategic counsel combining Vedic astrology, intuitive tarot, and numerology for founders, executives, and leaders navigating high-stakes transitions.',
    duration: 'Custom Engagement (3-6 Months)',
    investment: 'Inquire for Custom Retainer',
    href: '/consultations',
    icon: 'counsel',
    deliverables: [
      'Bi-weekly or monthly strategic alignment sessions',
      'Direct asynchronous audio/text access for timely decisions',
      'Muhurta (auspicious timing) calculations for launches & signatures',
      'Holistic integration of astrology, tarot, and numerology',
      'Priority scheduling and personalized energetic advisory',
    ],
  },
];
