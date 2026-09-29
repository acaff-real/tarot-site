export interface Testimonial {
  quote: string;
  client: string;
  role: string;
  location: string;
  service: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Anisha is completely in a league of her own. Her Vedic consultation provided more clarity and peace than years of conventional coaching. She accurately identified the exact timeline of a major career shift I was facing and gave me the quiet confidence to navigate it without fear.',
    client: 'Elena V.',
    role: 'Managing Director & Venture Partner',
    location: 'London & Geneva',
    service: 'Vedic Astrology Consultation',
  },
  {
    quote:
      'I was skeptical of tarot until our session. Anisha brings a grounded, psychological elegance that felt like talking to a brilliant mentor who could see straight into the heart of the matter. No melodrama, no clichéd fortune-telling—just profound clarity and actionable wisdom.',
    client: 'Marcus T.',
    role: 'Architect & Creative Founder',
    location: 'New York City',
    service: 'Intuitive Tarot Consultation',
  },
  {
    quote:
      'When rebranding our global wellness studio, we consulted Anisha for a Chaldean numerology audit. The subtle phonetic and numerical refinement she recommended brought a measurable shift in our resonance and client engagement. Her depth of knowledge is truly extraordinary.',
    client: 'Priyanka & Rohan M.',
    role: 'Founders, SOMA Living',
    location: 'Mumbai & Singapore',
    service: 'Numerology & Brand Consultation',
  },
];
