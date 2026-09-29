import * as Astronomy from 'astronomy-engine';

export interface PlanetPosition {
  name: string;
  sanskritName: string;
  symbol: string;
  longitude: number; // Tropical
  siderealLongitude: number; // Nirayana
  signNumber: number; // 1 to 12
  signName: string;
  signSanskrit: string;
  degreesInSign: number;
  degreeFormatted: string;
  house: number; // 1 to 12
  nakshatra: string;
  nakshatraNumber: number; // 1 to 27
  nakshatraLord: string;
  pada: number; // 1 to 4
  isRetrograde: boolean;
  dignity: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Moolatrikona' | 'Neutral';
}

export interface HouseInfo {
  houseNumber: number;
  signNumber: number;
  signName: string;
  signSanskrit: string;
  lord: string;
  planets: PlanetPosition[];
}

export interface ChartResult {
  zodiacSystem?: 'vedic' | 'western';
  birthDetails: {
    name: string;
    dateTimeUtc: string;
    localDateTime: string;
    latitude: number;
    longitude: number;
    cityName: string;
    timezoneOffset: number;
  };
  ayanamsha: {
    name: string;
    value: number;
    formatted: string;
  };
  ascendant: {
    longitude: number;
    siderealLongitude: number;
    signNumber: number;
    signName: string;
    signSanskrit: string;
    degreesInSign: number;
    degreeFormatted: string;
    nakshatra: string;
    nakshatraLord: string;
    pada: number;
  };
  moonSign: {
    signName: string;
    signSanskrit: string;
    signNumber: number;
    nakshatra: string;
    nakshatraLord: string;
    pada: number;
  };
  sunSign: {
    signName: string;
    signSanskrit: string;
    signNumber: number;
  };
  planets: PlanetPosition[];
  houses: HouseInfo[];
  insights: {
    ascendantSummary: string;
    moonSummary: string;
    nakshatraSummary: string;
    lifeFocusSummary: string;
  };
}

export const SIGNS = [
  { id: 1, name: 'Aries', sanskrit: 'Mesha', lord: 'Mars', element: 'Fire' },
  { id: 2, name: 'Taurus', sanskrit: 'Vrishabha', lord: 'Venus', element: 'Earth' },
  { id: 3, name: 'Gemini', sanskrit: 'Mithuna', lord: 'Mercury', element: 'Air' },
  { id: 4, name: 'Cancer', sanskrit: 'Karka', lord: 'Moon', element: 'Water' },
  { id: 5, name: 'Leo', sanskrit: 'Simha', lord: 'Sun', element: 'Fire' },
  { id: 6, name: 'Virgo', sanskrit: 'Kanya', lord: 'Mercury', element: 'Earth' },
  { id: 7, name: 'Libra', sanskrit: 'Tula', lord: 'Venus', element: 'Air' },
  { id: 8, name: 'Scorpio', sanskrit: 'Vrischika', lord: 'Mars', element: 'Water' },
  { id: 9, name: 'Sagittarius', sanskrit: 'Dhanu', lord: 'Jupiter', element: 'Fire' },
  { id: 10, name: 'Capricorn', sanskrit: 'Makara', lord: 'Saturn', element: 'Earth' },
  { id: 11, name: 'Aquarius', sanskrit: 'Kumbha', lord: 'Saturn', element: 'Air' },
  { id: 12, name: 'Pisces', sanskrit: 'Meena', lord: 'Jupiter', element: 'Water' },
];

export const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', lord: 'Ketu', deity: 'Ashvini Kumaras' },
  { id: 2, name: 'Bharani', lord: 'Venus', deity: 'Yama' },
  { id: 3, name: 'Krittika', lord: 'Sun', deity: 'Agni' },
  { id: 4, name: 'Rohini', lord: 'Moon', deity: 'Brahma' },
  { id: 5, name: 'Mrigashirsha', lord: 'Mars', deity: 'Soma' },
  { id: 6, name: 'Ardra', lord: 'Rahu', deity: 'Rudra' },
  { id: 7, name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi' },
  { id: 8, name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati' },
  { id: 9, name: 'Ashlesha', lord: 'Mercury', deity: 'Sarpas' },
  { id: 10, name: 'Magha', lord: 'Ketu', deity: 'Pitris' },
  { id: 11, name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga' },
  { id: 12, name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman' },
  { id: 13, name: 'Hasta', lord: 'Moon', deity: 'Savitr' },
  { id: 14, name: 'Chitra', lord: 'Mars', deity: 'Tvashtar' },
  { id: 15, name: 'Swati', lord: 'Rahu', deity: 'Vayu' },
  { id: 16, name: 'Vishakha', lord: 'Jupiter', deity: 'Indragni' },
  { id: 17, name: 'Anuradha', lord: 'Saturn', deity: 'Mitra' },
  { id: 18, name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra' },
  { id: 19, name: 'Mula', lord: 'Ketu', deity: 'Nirriti' },
  { id: 20, name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas' },
  { id: 21, name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishvadevas' },
  { id: 22, name: 'Shravana', lord: 'Moon', deity: 'Vishnu' },
  { id: 23, name: 'Dhanishta', lord: 'Mars', deity: 'Ashta Vasus' },
  { id: 24, name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna' },
  { id: 25, name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada' },
  { id: 26, name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahir Budhnya' },
  { id: 27, name: 'Revati', lord: 'Mercury', deity: 'Pushan' },
];

/**
 * Calculates high-accuracy Lahiri Ayanamsha (Chitra Paksha) for a given Julian Day.
 * Standard used by the Indian Calendar Reform Committee and Vedic astrologers.
 */
export function calculateLahiriAyanamsha(daysSinceJ2000: number): number {
  const T = daysSinceJ2000 / 36525.0;
  // Lahiri Ayanamsha at J2000 is 23° 51' 25.53" = 23.857092°
  const ayanamsha = 23.857092 + 1.396042 * T + 0.000308 * (T * T);
  return ayanamsha;
}

/**
 * Format decimal degrees into Deg° Min' Sec" string
 */
export function formatDMS(deg: number): string {
  const d = Math.floor(deg);
  const minFloat = (deg - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.round((minFloat - m) * 60);
  return `${d}° ${m.toString().padStart(2, '0')}' ${s.toString().padStart(2, '0')}"`;
}

/**
 * Get Nakshatra and Pada from sidereal longitude (0 - 360)
 */
export function getNakshatraInfo(siderealLon: number) {
  const normalized = ((siderealLon % 360) + 360) % 360;
  const nakshatraSpan = 360 / 27; // 13.333333°
  const padaSpan = nakshatraSpan / 4; // 3.333333°

  const index = Math.min(26, Math.floor(normalized / nakshatraSpan));
  const remainder = normalized - index * nakshatraSpan;
  const pada = Math.min(4, Math.floor(remainder / padaSpan) + 1);

  const nak = NAKSHATRAS[index];
  return {
    name: nak.name,
    number: nak.id,
    lord: nak.lord,
    deity: nak.deity,
    pada,
  };
}

/**
 * Get Sign (Rashi) info from longitude
 */
export function getSignInfo(lon: number) {
  const normalized = ((lon % 360) + 360) % 360;
  const signIndex = Math.min(11, Math.floor(normalized / 30));
  const signNumber = signIndex + 1;
  const degreesInSign = normalized - signIndex * 30;

  return {
    signNumber,
    signName: SIGNS[signIndex].name,
    signSanskrit: SIGNS[signIndex].sanskrit,
    degreesInSign,
    degreeFormatted: formatDMS(degreesInSign),
  };
}

/**
 * Determine dignity for Vedic planets based on classical exaltation and own signs
 */
export function getDignity(planetName: string, signNumber: number, degInSign: number): 'Exalted' | 'Debilitated' | 'Own Sign' | 'Moolatrikona' | 'Neutral' {
  switch (planetName) {
    case 'Sun':
      if (signNumber === 1) return degInSign <= 10 ? 'Exalted' : 'Exalted';
      if (signNumber === 7) return 'Debilitated';
      if (signNumber === 5) return 'Own Sign';
      break;
    case 'Moon':
      if (signNumber === 2) return 'Exalted';
      if (signNumber === 8) return 'Debilitated';
      if (signNumber === 4) return 'Own Sign';
      break;
    case 'Mars':
      if (signNumber === 10) return 'Exalted';
      if (signNumber === 4) return 'Debilitated';
      if (signNumber === 1 || signNumber === 8) return 'Own Sign';
      break;
    case 'Mercury':
      if (signNumber === 6) return degInSign <= 15 ? 'Exalted' : 'Own Sign';
      if (signNumber === 12) return 'Debilitated';
      if (signNumber === 3) return 'Own Sign';
      break;
    case 'Jupiter':
      if (signNumber === 4) return 'Exalted';
      if (signNumber === 10) return 'Debilitated';
      if (signNumber === 9 || signNumber === 12) return 'Own Sign';
      break;
    case 'Venus':
      if (signNumber === 12) return 'Exalted';
      if (signNumber === 6) return 'Debilitated';
      if (signNumber === 2 || signNumber === 7) return 'Own Sign';
      break;
    case 'Saturn':
      if (signNumber === 7) return 'Exalted';
      if (signNumber === 1) return 'Debilitated';
      if (signNumber === 10 || signNumber === 11) return 'Own Sign';
      break;
    case 'Rahu':
      if (signNumber === 2 || signNumber === 3) return 'Exalted';
      if (signNumber === 8 || signNumber === 9) return 'Debilitated';
      break;
    case 'Ketu':
      if (signNumber === 8 || signNumber === 9) return 'Exalted';
      if (signNumber === 2 || signNumber === 3) return 'Debilitated';
      break;
  }
  return 'Neutral';
}

/**
 * Calculates geocentric tropical longitude of a body
 */
function getTropicalLongitude(body: any, time: Astronomy.AstroTime): number {
  if (body === 'Sun') {
    return Astronomy.SunPosition(time).elon;
  } else if (body === 'Moon') {
    const vec = Astronomy.GeoVector(Astronomy.Body.Moon, time, true);
    return Astronomy.Ecliptic(vec).elon;
  } else {
    const vec = Astronomy.GeoVector(body, time, true);
    return Astronomy.Ecliptic(vec).elon;
  }
}

/**
 * Mean Ascending Node of the Moon (Rahu)
 */
function getMeanRahuLongitude(time: Astronomy.AstroTime): number {
  const T = time.ut / 36525.0;
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  return ((omega % 360) + 360) % 360;
}

/**
 * Calculate the Ascendant (Lagna) in Vedic Astrology
 */
export function calculateAscendant(time: Astronomy.AstroTime, lat: number, lon: number, ayanamsha: number) {
  const gmst = Astronomy.SiderealTime(time); // hours
  const lstHours = (((gmst + lon / 15) % 24) + 24) % 24;
  const lstDeg = lstHours * 15;
  const rad = Math.PI / 180;
  const theta = lstDeg * rad;
  const phi = lat * rad;
  const eps = Astronomy.e_tilt(time).tobl * rad;

  const y = Math.cos(theta);
  const x = -Math.sin(theta) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
  let ascTropical = (Math.atan2(y, x) * 180) / Math.PI;
  ascTropical = ((ascTropical % 360) + 360) % 360;

  // Sidereal Ascendant
  const siderealAsc = ((ascTropical - ayanamsha) % 360 + 360) % 360;
  const sign = getSignInfo(siderealAsc);
  const nak = getNakshatraInfo(siderealAsc);

  return {
    longitude: ascTropical,
    siderealLongitude: siderealAsc,
    signNumber: sign.signNumber,
    signName: sign.signName,
    signSanskrit: sign.signSanskrit,
    degreesInSign: sign.degreesInSign,
    degreeFormatted: sign.degreeFormatted,
    nakshatra: nak.name,
    nakshatraLord: nak.lord,
    pada: nak.pada,
  };
}

/**
 * Main Vedic Chart Generator
 */
export function calculateVedicChart(params: {
  name: string;
  year: number;
  month: number; // 1 to 12
  day: number;
  hour: number; // 0 to 23
  minute: number; // 0 to 59
  latitude: number;
  longitude: number;
  timezoneOffset: number; // Hours offset from UTC (e.g., +5.5 for IST, -5 for EST)
  cityName?: string;
  zodiacSystem?: 'vedic' | 'western';
}): ChartResult {
  const {
    name,
    year,
    month,
    day,
    hour,
    minute,
    latitude,
    longitude,
    timezoneOffset,
    cityName = 'Custom Location',
    zodiacSystem = 'vedic',
  } = params;

  // Convert local birth time to UTC Date
  const localMinutes = hour * 60 + minute;
  const utcMinutes = localMinutes - Math.round(timezoneOffset * 60);

  const utcDate = new Date(Date.UTC(year, month - 1, day, 0, utcMinutes, 0));
  const astroTime = Astronomy.MakeTime(utcDate);

  // Lahiri Ayanamsha for this epoch (0 for Western Tropical)
  const isWestern = zodiacSystem === 'western';
  const rawLahiri = calculateLahiriAyanamsha(astroTime.ut);
  const ayanamsha = isWestern ? 0 : rawLahiri;

  // Ascendant (Lagna)
  const asc = calculateAscendant(astroTime, latitude, longitude, ayanamsha);
  const lagnaSign = asc.signNumber;

  // Planets to calculate
  const PLANET_CONFIGS = [
    { name: 'Sun', sanskrit: 'Surya', symbol: 'Su', body: 'Sun' },
    { name: 'Moon', sanskrit: 'Chandra', symbol: 'Mo', body: 'Moon' },
    { name: 'Mars', sanskrit: 'Mangala', symbol: 'Ma', body: Astronomy.Body.Mars },
    { name: 'Mercury', sanskrit: 'Budha', symbol: 'Me', body: Astronomy.Body.Mercury },
    { name: 'Jupiter', sanskrit: 'Guru', symbol: 'Ju', body: Astronomy.Body.Jupiter },
    { name: 'Venus', sanskrit: 'Shukra', symbol: 'Ve', body: Astronomy.Body.Venus },
    { name: 'Saturn', sanskrit: 'Shani', symbol: 'Sa', body: Astronomy.Body.Saturn },
  ];

  // Check retrograde by checking position 2 hours ahead
  const timeAhead = Astronomy.MakeTime(new Date(utcDate.getTime() + 2 * 3600 * 1000));

  const planetPositions: PlanetPosition[] = [];

  for (const p of PLANET_CONFIGS) {
    const tropLon = getTropicalLongitude(p.body, astroTime);
    const sidLon = ((tropLon - ayanamsha) % 360 + 360) % 360;
    const sign = getSignInfo(sidLon);
    const nak = getNakshatraInfo(sidLon);

    // Retrograde check (Sun and Moon are never retrograde)
    let isRetro = false;
    if (p.name !== 'Sun' && p.name !== 'Moon') {
      const tropLonAhead = getTropicalLongitude(p.body, timeAhead);
      let diff = tropLonAhead - tropLon;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      isRetro = diff < 0;
    }

    // Whole sign house: lagna sign is house 1
    const house = ((sign.signNumber - lagnaSign + 12) % 12) + 1;
    const dignity = getDignity(p.name, sign.signNumber, sign.degreesInSign);

    planetPositions.push({
      name: p.name,
      sanskritName: p.sanskrit,
      symbol: p.symbol,
      longitude: tropLon,
      siderealLongitude: sidLon,
      signNumber: sign.signNumber,
      signName: sign.signName,
      signSanskrit: sign.signSanskrit,
      degreesInSign: sign.degreesInSign,
      degreeFormatted: sign.degreeFormatted,
      house,
      nakshatra: nak.name,
      nakshatraNumber: nak.number,
      nakshatraLord: nak.lord,
      pada: nak.pada,
      isRetrograde: isRetro,
      dignity,
    });
  }

  // Rahu (North Node) and Ketu (South Node)
  const rahuTropLon = getMeanRahuLongitude(astroTime);
  const rahuSidLon = ((rahuTropLon - ayanamsha) % 360 + 360) % 360;
  const ketuSidLon = (rahuSidLon + 180) % 360;

  const rahuSign = getSignInfo(rahuSidLon);
  const rahuNak = getNakshatraInfo(rahuSidLon);
  const rahuHouse = ((rahuSign.signNumber - lagnaSign + 12) % 12) + 1;

  planetPositions.push({
    name: 'Rahu',
    sanskritName: 'Rahu',
    symbol: 'Ra',
    longitude: rahuTropLon,
    siderealLongitude: rahuSidLon,
    signNumber: rahuSign.signNumber,
    signName: rahuSign.signName,
    signSanskrit: rahuSign.signSanskrit,
    degreesInSign: rahuSign.degreesInSign,
    degreeFormatted: rahuSign.degreeFormatted,
    house: rahuHouse,
    nakshatra: rahuNak.name,
    nakshatraNumber: rahuNak.number,
    nakshatraLord: rahuNak.lord,
    pada: rahuNak.pada,
    isRetrograde: true, // Mean nodes always retrograde
    dignity: getDignity('Rahu', rahuSign.signNumber, rahuSign.degreesInSign),
  });

  const ketuSign = getSignInfo(ketuSidLon);
  const ketuNak = getNakshatraInfo(ketuSidLon);
  const ketuHouse = ((ketuSign.signNumber - lagnaSign + 12) % 12) + 1;

  planetPositions.push({
    name: 'Ketu',
    sanskritName: 'Ketu',
    symbol: 'Ke',
    longitude: (rahuTropLon + 180) % 360,
    siderealLongitude: ketuSidLon,
    signNumber: ketuSign.signNumber,
    signName: ketuSign.signName,
    signSanskrit: ketuSign.signSanskrit,
    degreesInSign: ketuSign.degreesInSign,
    degreeFormatted: ketuSign.degreeFormatted,
    house: ketuHouse,
    nakshatra: ketuNak.name,
    nakshatraNumber: ketuNak.number,
    nakshatraLord: ketuNak.lord,
    pada: ketuNak.pada,
    isRetrograde: true,
    dignity: getDignity('Ketu', ketuSign.signNumber, ketuSign.degreesInSign),
  });

  // Construct Whole Sign Houses (1 to 12)
  const houses: HouseInfo[] = [];
  for (let h = 1; h <= 12; h++) {
    const signIndex = (lagnaSign - 1 + (h - 1)) % 12;
    const signObj = SIGNS[signIndex];
    const occupants = planetPositions.filter((p) => p.house === h);

    houses.push({
      houseNumber: h,
      signNumber: signObj.id,
      signName: signObj.name,
      signSanskrit: signObj.sanskrit,
      lord: signObj.lord,
      planets: occupants,
    });
  }

  // Key pillars
  const moon = planetPositions.find((p) => p.name === 'Moon')!;
  const sun = planetPositions.find((p) => p.name === 'Sun')!;

  const insights = generateChartInsights(asc, moon, sun);

  return {
    zodiacSystem,
    birthDetails: {
      name,
      dateTimeUtc: utcDate.toISOString(),
      localDateTime: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      latitude,
      longitude,
      cityName,
      timezoneOffset,
    },
    ayanamsha: {
      name: isWestern ? 'Western (Tropical Zodiac)' : 'Lahiri (Chitra Paksha)',
      value: ayanamsha,
      formatted: isWestern ? '0° 00\' 00"' : formatDMS(rawLahiri),
    },
    ascendant: asc,
    moonSign: {
      signName: moon.signName,
      signSanskrit: moon.signSanskrit,
      signNumber: moon.signNumber,
      nakshatra: moon.nakshatra,
      nakshatraLord: moon.nakshatraLord,
      pada: moon.pada,
    },
    sunSign: {
      signName: sun.signName,
      signSanskrit: sun.signSanskrit,
      signNumber: sun.signNumber,
    },
    planets: planetPositions,
    houses,
    insights,
  };
}

function generateChartInsights(asc: any, moon: PlanetPosition, sun: PlanetPosition) {
  const ascTexts: Record<string, string> = {
    Aries: 'Driven by dynamic vitality, instinctual courage, and a pioneering drive to initiate authentic new beginnings.',
    Taurus: 'Endowed with grounded presence, deliberate wisdom, sensual aesthetic appreciation, and enduring loyalty.',
    Gemini: 'Gifted with rapid intellect, curious communicative charm, multidimensional perspective, and nimble adaptability.',
    Cancer: 'Guided by profound emotional intelligence, protective maternal empathy, instinctive loyalty, and deep intuition.',
    Leo: 'Radiating magnetic warmth, dignified presence, natural creative authority, and an inherent generous leadership.',
    Virgo: 'Possessing refined analytical discernment, methodical perfectionism, dedication to service, and quiet elegance.',
    Libra: 'Oriented toward aesthetic symmetry, diplomatic harmony, relational justice, and refined intellectual balance.',
    Scorpio: 'Characterized by transformative emotional depth, piercing investigative insight, and unyielding psychic resilience.',
    Sagittarius: 'Inspired by philosophical optimism, visionary horizon-seeking, moral truth, and an expansive thirst for wisdom.',
    Capricorn: 'Marked by patient pragmatic ambition, architectural discipline, karmic responsibility, and timeless endurance.',
    Aquarius: 'Distinguished by humanitarian vision, unconventional brilliance, collective consciousness, and authentic sovereignty.',
    Pisces: 'Infused with mystical compassion, ethereal artistic sensitivity, spiritual transcendence, and boundless empathy.',
  };

  const moonTexts: Record<string, string> = {
    Aries: 'Your inner emotional sanctuary thrives through candid independence, spontaneous bravery, and impassioned directness.',
    Taurus: 'Your emotional core is profoundly anchored in serenity, sensory nourishment, comfort, and steady loyalty.',
    Gemini: 'You process emotional experiences through intellectual inquiry, vibrant conversation, and varied mental stimulation.',
    Cancer: 'Your heart carries immense depth and tender remembrance, deeply attuned to the unseen emotional currents of those around you.',
    Leo: 'You require noble acknowledgement, heart-centered expression, and a creative container where your light is recognized.',
    Virgo: 'Your peace of mind is restored through useful order, thoughtful service, mental clarity, and wholesome routines.',
    Libra: 'Inner peace for you is deeply tied to harmonious relationships, peaceful surroundings, and emotional equality.',
    Scorpio: 'Your emotional life is intensely private and profound, capable of navigating deep shadows and emerging reborn.',
    Sagittarius: 'Your soul finds calm in expansive ideas, foreign horizons, hopeful philosophy, and spiritual freedom.',
    Capricorn: 'You master your emotions with quiet resilience, seeking self-reliance, steady maturity, and lasting dignity.',
    Aquarius: 'You navigate feelings with objective clarity, emotional independence, and deep empathy for the greater human tapestry.',
    Pisces: 'You feel life as an intuitive poem—absorbing subtleties, dream states, and artistic frequencies with oceanic sensitivity.',
  };

  return {
    ascendantSummary: ascTexts[asc.signName] || 'A uniquely calibrated soul imprint navigating this earthly incarnation.',
    moonSummary: moonTexts[moon.signName] || 'A deeply nuanced lunar mind seeking authentic alignment.',
    nakshatraSummary: `Born under the sacred stellar influence of ${moon.nakshatra} (Pada ${moon.pada}), governed by ${moon.nakshatraLord}. This Nakshatra bestows distinctive karmic gifts and soul lessons.`,
    lifeFocusSummary: `With your Ascendant in ${asc.signSanskrit} (${asc.signName}) and Moon in ${moon.signSanskrit} (${moon.signName}), your path harmonizes external presence with rich internal contemplation.`,
  };
}
