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
    service: 'Individual Reading',
  },
  {
    quote:
      'I was skeptical of tarot until our session. Anisha brings a grounded, psychological elegance that felt like talking to a brilliant mentor who could see straight into the heart of the matter. No melodrama, no clichéd fortune-telling—just profound clarity and actionable wisdom.',
    client: 'Marcus T.',
    role: 'Architect & Creative Founder',
    location: 'New York City',
    service: 'Relationship Reading',
  },
  {
    quote:
      'When exploring our family transitions, we consulted Anisha for a deeper chart reading. The subtle planetary timing and multi-chart insight she brought provided enormous peace and clarity across generations. Her depth of knowledge is truly extraordinary.',
    client: 'Priyanka & Rohan M.',
    role: 'Founders, SOMA Living',
    location: 'Mumbai & Singapore',
    service: 'Family Reading',
  },
];
