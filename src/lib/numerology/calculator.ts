export type NumerologySystem = 'chaldean' | 'pythagorean';

export interface LetterValue {
  char: string;
  value: number;
}

export interface WordBreakdown {
  word: string;
  letters: LetterValue[];
  compoundSum: number;
  rootNumber: number;
}

export interface NumerologyResult {
  inputName: string;
  system: NumerologySystem;
  words: WordBreakdown[];
  totalCompound: number;
  rootNumber: number;
  compoundMeaning: string;
  profile: {
    archetype: string;
    rulingPlanet: string;
    sanskritLord: string;
    element: string;
    essence: string;
    strengths: string[];
    growthEdge: string;
    careerAlignment: string[];
    harmoniousNumbers: number[];
    luckyDays: string[];
    gemstones: string[];
    colors: string[];
  };
}

const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

const COMPOUND_DESCRIPTIONS: Record<number, string> = {
  10: 'The Wheel of Fortune: Symbolizes honor, faith, and self-confidence. A fortunate number promising success through personal integrity.',
  11: 'The Master Illuminator: A high spiritual vibration of intuition, inspiration, and trials that forge profound wisdom.',
  12: 'The Sacrificial Wisdom: Denotes deep anxiety or sacrifice of personal comfort for a higher cause; demands clear boundaries and discernment.',
  13: 'The Transformative Phoenix: Represents regeneration, sudden upheaval leading to breakthroughs, and the dissolution of outdated structures.',
  14: 'The River of Movement: Combines magnetic curiosity with commercial instincts; warns against gambling or reckless speculation while offering extraordinary adaptability.',
  15: 'The Alchemist & Magician: Endowed with extraordinary personal magnetism, artistic eloquence, and persuasive charisma. Attracts gifts and goodwill.',
  16: 'The Shattered Citadel: An ancient warning against false pride and vanity. Demands absolute humility, spiritual awakening, and inner authenticity.',
  17: 'The Star of the Magi: A supremely auspicious vibration of spiritual peace, public recognition, and enduring legacy.',
  18: 'The Crucible of Conflict: Inner spiritual conflict, family disputes, and battles that ultimately refine steel-like resilience and courage.',
  19: 'The Prince of Heaven: One of the most fortunate vibrations. Represents joy, solar radiance, esteem, and triumphant success.',
  20: 'The Awakening Call: A spiritual awakening and purpose-driven destiny. Urges you to rise above petty concerns into higher mission.',
  21: 'The Crown of the Magi: Symbolizes complete worldly advancement, honors, and victory after sustained patient devotion.',
  22: 'The Master Architect: Visionary ideals manifested into tangible global reality. Immense constructive power requiring steadfast groundedness.',
  23: 'The Royal Star of the Lion: Bestows protection from adversaries, executive favor, and magnetic authority in professional endeavors.',
  24: 'The Guardian of Grace: Promised assistance from influential patrons, affectionate relationships, and financial security through steady diplomacy.',
  25: 'The Discernment of the Sage: Spiritual trials overcome through intellect, study, analytical precision, and contemplation.',
  26: 'The Balance of Strength: Warns against misjudging business partnerships; offers immense material mastery when anchored in ethical stewardship.',
  27: 'The Sceptre of Command: Combines visionary creativity with executive authority. Commands deep respect in intellectual and spiritual fields.',
  28: 'The Contested Throne: Great capability coupled with intense competition. Calls for calm foresight and disciplined financial stewardship.',
  29: 'The Mystic Crucible: Deep psychological intuition and spiritual depth, often accompanied by emotional sensitivity and high standards.',
  30: 'The Thoughtful Thinker: Scholarly contemplation, philosophical writing, and mental supremacy. Less concerned with vanity, deeply focused on intellectual truth.',
  31: 'The Self-Contained Visionary: Highly original and introspective; values autonomy above conformity and achieves unexpected triumphs.',
  32: 'The Sovereign Ambassador: Exceptional power of communication and collective alliance. Blessed with popularity and versatile magnetism.',
  33: 'The Master Teacher: A rare vibration of compassionate leadership, spiritual philanthropy, and universal devotion to guiding others.',
  37: 'The Golden Fellowship: Bestows delightful friendships, romantic harmony, and auspicious business enterprises.',
  42: 'The Healer & Counselor: Harmonious vibration of artistic elegance, family devotion, and peaceful counsel.',
};

const ROOT_PROFILES: Record<number, NumerologyResult['profile']> = {
  1: {
    archetype: 'The Sovereign Pioneer',
    rulingPlanet: 'Sun',
    sanskritLord: 'Surya',
    element: 'Fire',
    essence: 'Originality, supreme vitality, creative initiative, and natural independent leadership.',
    strengths: ['Visionary autonomy', 'Decisive clarity', 'Inherent dignity', 'Pioneering courage'],
    growthEdge: 'Tempering stubbornness with patient collaboration; avoiding authoritarian impatience.',
    careerAlignment: ['Founders & Entrepreneurs', 'Executive Directors', 'Independent Innovators', 'Creative Pioneers'],
    harmoniousNumbers: [1, 3, 5, 9],
    luckyDays: ['Sunday', 'Monday'],
    gemstones: ['Ruby', 'Garnet', 'Sunstone'],
    colors: ['Gold', 'Warm Ochre', 'Amber', 'Cream'],
  },
  2: {
    archetype: 'The Intuitive Diplomat',
    rulingPlanet: 'Moon',
    sanskritLord: 'Chandra',
    element: 'Water',
    essence: 'Subtle emotional resonance, aesthetic harmony, receptive intuition, and restorative diplomacy.',
    strengths: ['Profound empathy', 'Tactful mediation', 'Artistic sensitivity', 'Intuitive perception'],
    growthEdge: 'Overcoming emotional vulnerability and self-doubt; establishing firm energetic boundaries.',
    careerAlignment: ['Counselors & Therapists', 'Diplomats & Mediators', 'Artists & Curators', 'Partnership Strategists'],
    harmoniousNumbers: [2, 4, 7],
    luckyDays: ['Monday', 'Friday'],
    gemstones: ['Pearl', 'Moonstone'],
    colors: ['Alabaster', 'Soft Cream', 'Silver', 'Sage'],
  },
  3: {
    archetype: 'The Radiant Luminary',
    rulingPlanet: 'Jupiter',
    sanskritLord: 'Guru / Brihaspati',
    element: 'Fire / Ether',
    essence: 'Expansive intellect, eloquent expression, joyful wisdom, and philosophical optimism.',
    strengths: ['Inspirational speech', 'Creative versatility', 'Generosity of spirit', 'Higher wisdom'],
    growthEdge: 'Scattering energy across too many pursuits; disciplining attention into focused mastery.',
    careerAlignment: ['Authors & Orators', 'Spiritual Mentors', 'Creative Directors', 'Educators & Advisors'],
    harmoniousNumbers: [1, 3, 6, 9],
    luckyDays: ['Thursday', 'Tuesday'],
    gemstones: ['Yellow Sapphire', 'Citrine', 'Topaz'],
    colors: ['Warm Honey', 'Champagne Gold', 'Saffron', 'Warm Ivory'],
  },
  4: {
    archetype: 'The Master Architect',
    rulingPlanet: 'Rahu / Uranus',
    sanskritLord: 'Rahu',
    element: 'Earth',
    essence: 'Structural mastery, steadfast discipline, unconventional breakthrough genius, and relentless integrity.',
    strengths: ['Architectural foresight', 'Impeccable reliability', 'Systemic problem-solving', 'Unshakeable resolve'],
    growthEdge: 'Rigidity and sudden rebellious impulsiveness; cultivating flexibility and gentle grace.',
    careerAlignment: ['Systems Architects', 'Financial Strategists', 'Engineers', 'Institutional Reformers'],
    harmoniousNumbers: [1, 2, 7],
    luckyDays: ['Saturday', 'Sunday'],
    gemstones: ['Hessonite Garnet (Gomed)', 'Blue Sapphire', 'Smoky Quartz'],
    colors: ['Charcoal', 'Deep Slate', 'Earthy Taupe', 'Khaki'],
  },
  5: {
    archetype: 'The Dynamic Catalyst',
    rulingPlanet: 'Mercury',
    sanskritLord: 'Budha',
    element: 'Air',
    essence: 'Rapid cognitive adaptability, persuasive commerce, adventurous curiosity, and magnetic freedom.',
    strengths: ['Quicksilver intellect', 'Versatile communication', 'Commercial brilliance', 'Charismatic agility'],
    growthEdge: 'Restlessness, nervous exhaustion, and impatience with slower rhythms; cultivating stillness.',
    careerAlignment: ['Media & Communications', 'International Commerce', 'Travel & Lifestyle Brands', 'Brand Strategists'],
    harmoniousNumbers: [1, 5, 6],
    luckyDays: ['Wednesday', 'Friday'],
    gemstones: ['Emerald', 'Peridot', 'Green Tourmaline'],
    colors: ['Emerald Green', 'Soft Mint', 'Pearl Gray', 'White'],
  },
  6: {
    archetype: 'The Harmonious Guardian',
    rulingPlanet: 'Venus',
    sanskritLord: 'Shukra',
    element: 'Water / Earth',
    essence: 'Refined aesthetics, unconditional devotion, healing sanctuaries, and magnetic luxury.',
    strengths: ['Exquisite taste', 'Nurturing sanctuary', 'Relational magnetism', 'Unconditional empathy'],
    growthEdge: 'Self-martyrdom, perfectionist control in relationships, and absorbing others’ emotional baggage.',
    careerAlignment: ['Luxury & Editorial Brands', 'Wellness Mentors', 'Interior Architects', 'Relationship Counselors'],
    harmoniousNumbers: [3, 6, 9],
    luckyDays: ['Friday', 'Tuesday'],
    gemstones: ['Diamond', 'White Sapphire', 'Rose Quartz'],
    colors: ['Rose Sand', 'Opal White', 'Warm Terracotta', 'Pale Coral'],
  },
  7: {
    archetype: 'The Mystical Sage',
    rulingPlanet: 'Ketu / Neptune',
    sanskritLord: 'Ketu',
    element: 'Water / Ether',
    essence: 'Deep contemplative inquiry, esoteric illumination, piercing analytical discernment, and sacred solitude.',
    strengths: ['Psychic intuition', 'Philosophical depth', 'Research genius', 'Spiritual detachment'],
    growthEdge: 'Isolation, cynical aloofness, and intellectual overthinking; learning to trust the heart.',
    careerAlignment: ['Esoteric Astrologers & Philosophers', 'Deep Researchers', 'Spiritual Authors', 'Psychologists'],
    harmoniousNumbers: [2, 4, 7],
    luckyDays: ['Monday', 'Tuesday'],
    gemstones: ['Cat\'s Eye (Chrysoberyl)', 'Amethyst', 'Clear Quartz'],
    colors: ['Ethereal Silver', 'Pearl White', 'Deep Indigo', 'Mist Gray'],
  },
  8: {
    archetype: 'The Karmic Sovereign',
    rulingPlanet: 'Saturn',
    sanskritLord: 'Shani',
    element: 'Earth',
    essence: 'Enduring authority, material mastery, karmic justice, executive power, and patient stewardship.',
    strengths: ['Monumental endurance', 'Pragmatic leadership', 'Ethical stewardship', 'Financial acumen'],
    growthEdge: 'Over-seriousness, fatalistic burdens, and emotional reserve; embracing lightness and playful joy.',
    careerAlignment: ['Enterprise Executives', 'Founding Investors', 'Legal Authorities', 'Large-Scale Philanthropists'],
    harmoniousNumbers: [4, 5, 8],
    luckyDays: ['Saturday', 'Wednesday'],
    gemstones: ['Blue Sapphire', 'Amethyst', 'Lapis Lazuli'],
    colors: ['Deep Navy', 'Charcoal', 'Midnight Blue', 'Steel'],
  },
  9: {
    archetype: 'The Universal Humanitarian',
    rulingPlanet: 'Mars',
    sanskritLord: 'Mangala',
    element: 'Fire',
    essence: 'Transcendent compassion, warrior courage, artistic passion, and dedicated universal service.',
    strengths: ['Fierce integrity', 'Universal benevolence', 'Creative vitality', 'Inspiring conviction'],
    growthEdge: 'Righteous temper, exhaustion from carrying everyone’s battles, and difficulty accepting help.',
    careerAlignment: ['Humanitarian Leaders', 'Healing Innovators', 'Creative Activists', 'Spiritual Guides'],
    harmoniousNumbers: [1, 3, 6, 9],
    luckyDays: ['Tuesday', 'Thursday'],
    gemstones: ['Red Coral', 'Carnelian', 'Ruby'],
    colors: ['Crimson', 'Warm Rose', 'Terracotta', 'Cream'],
  },
};

/**
 * Reduce any positive number to a single digit (1 to 9)
 */
export function reduceToSingleDigit(num: number): number {
  if (num <= 9 && num >= 1) return num;
  let sum = num;
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

/**
 * Calculate Name Numerology
 */
export function calculateNameNumerology(name: string, system: NumerologySystem = 'chaldean'): NumerologyResult {
  const cleanName = name.trim();
  const letterMap = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;

  const rawWords = cleanName.split(/\s+/).filter((w) => w.length > 0);
  const words: WordBreakdown[] = [];
  let grandTotal = 0;

  for (const rawWord of rawWords) {
    const letters: LetterValue[] = [];
    let wordSum = 0;

    for (const char of rawWord.toUpperCase()) {
      if (letterMap[char] !== undefined) {
        const val = letterMap[char];
        letters.push({ char, value: val });
        wordSum += val;
      }
    }

    if (letters.length > 0) {
      words.push({
        word: rawWord,
        letters,
        compoundSum: wordSum,
        rootNumber: reduceToSingleDigit(wordSum),
      });
      grandTotal += wordSum;
    }
  }

  // Fallback if empty name
  if (grandTotal === 0) {
    grandTotal = 1;
  }

  const root = reduceToSingleDigit(grandTotal);

  const compoundMeaning =
    COMPOUND_DESCRIPTIONS[grandTotal] ||
    `Compound ${grandTotal}: Carries the unified current of ${grandTotal.toString().split('').join(' and ')}, synthesizing into root vibration ${root}.`;

  const profile = ROOT_PROFILES[root] || ROOT_PROFILES[1];

  return {
    inputName: cleanName,
    system,
    words,
    totalCompound: grandTotal,
    rootNumber: root,
    compoundMeaning,
    profile,
  };
}
