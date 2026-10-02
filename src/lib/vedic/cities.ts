export interface CityLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // UTC offset in hours (e.g., 5.5, -5, +1)
  label: string;
}

export const POPULAR_CITIES: CityLocation[] = [
  // India (Major Metros & State Capitals)
  { city: 'New Delhi', country: 'India', latitude: 28.6139, longitude: 77.209, timezone: 5.5, label: 'New Delhi, India' },
  { city: 'Mumbai', country: 'India', latitude: 19.076, longitude: 72.8777, timezone: 5.5, label: 'Mumbai, India' },
  { city: 'Bengaluru', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 5.5, label: 'Bengaluru, India' },
  { city: 'Kolkata', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 5.5, label: 'Kolkata, India' },
  { city: 'Chennai', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 5.5, label: 'Chennai, India' },
  { city: 'Hyderabad', country: 'India', latitude: 17.385, longitude: 78.4867, timezone: 5.5, label: 'Hyderabad, India' },
  { city: 'Pune', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 5.5, label: 'Pune, India' },
  { city: 'Ahmedabad', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 5.5, label: 'Ahmedabad, India' },
  { city: 'Jaipur', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 5.5, label: 'Jaipur, India' },
  { city: 'Lucknow', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 5.5, label: 'Lucknow, India' },
  { city: 'Chandigarh', country: 'India', latitude: 30.7333, longitude: 76.7794, timezone: 5.5, label: 'Chandigarh, India' },
  { city: 'Varanasi', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 5.5, label: 'Varanasi, India' },
  { city: 'Kochi', country: 'India', latitude: 9.9312, longitude: 76.2673, timezone: 5.5, label: 'Kochi, India' },
  { city: 'Goa (Panaji)', country: 'India', latitude: 15.4909, longitude: 73.8278, timezone: 5.5, label: 'Goa (Panaji), India' },
  { city: 'Indore', country: 'India', latitude: 22.7196, longitude: 75.8577, timezone: 5.5, label: 'Indore, India' },
  { city: 'Bhopal', country: 'India', latitude: 23.2599, longitude: 77.4126, timezone: 5.5, label: 'Bhopal, India' },
  { city: 'Patna', country: 'India', latitude: 25.5941, longitude: 85.1376, timezone: 5.5, label: 'Patna, India' },
  { city: 'Surat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: 5.5, label: 'Surat, India' },
  { city: 'Vadodara', country: 'India', latitude: 22.3072, longitude: 73.1812, timezone: 5.5, label: 'Vadodara, India' },
  { city: 'Nagpur', country: 'India', latitude: 21.1458, longitude: 79.0882, timezone: 5.5, label: 'Nagpur, India' },
  { city: 'Visakhapatnam', country: 'India', latitude: 17.6868, longitude: 83.2185, timezone: 5.5, label: 'Visakhapatnam, India' },
  { city: 'Coimbatore', country: 'India', latitude: 11.0168, longitude: 76.9558, timezone: 5.5, label: 'Coimbatore, India' },
  { city: 'Thiruvananthapuram', country: 'India', latitude: 8.5241, longitude: 76.9366, timezone: 5.5, label: 'Thiruvananthapuram, India' },
  { city: 'Guwahati', country: 'India', latitude: 26.1445, longitude: 91.7362, timezone: 5.5, label: 'Guwahati, India' },
  { city: 'Bhubaneswar', country: 'India', latitude: 20.2961, longitude: 85.8245, timezone: 5.5, label: 'Bhubaneswar, India' },
  { city: 'Dehradun', country: 'India', latitude: 30.3165, longitude: 78.0322, timezone: 5.5, label: 'Dehradun, India' },
  { city: 'Agra', country: 'India', latitude: 27.1767, longitude: 78.0081, timezone: 5.5, label: 'Agra, India' },
  { city: 'Amritsar', country: 'India', latitude: 31.634, longitude: 74.8723, timezone: 5.5, label: 'Amritsar, India' },
  { city: 'Ludhiana', country: 'India', latitude: 30.901, longitude: 75.8573, timezone: 5.5, label: 'Ludhiana, India' },
  { city: 'Kanpur', country: 'India', latitude: 26.4499, longitude: 80.3319, timezone: 5.5, label: 'Kanpur, India' },
  { city: 'Shimla', country: 'India', latitude: 31.1048, longitude: 77.1734, timezone: 5.5, label: 'Shimla, India' },
  { city: 'Srinagar', country: 'India', latitude: 34.0837, longitude: 74.7973, timezone: 5.5, label: 'Srinagar, India' },

  // United Kingdom
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 0, label: 'London, United Kingdom' },
  { city: 'Manchester', country: 'United Kingdom', latitude: 53.4808, longitude: -2.2426, timezone: 0, label: 'Manchester, United Kingdom' },
  { city: 'Birmingham', country: 'United Kingdom', latitude: 52.4862, longitude: -1.8904, timezone: 0, label: 'Birmingham, United Kingdom' },
  { city: 'Glasgow', country: 'United Kingdom', latitude: 55.8642, longitude: -4.2518, timezone: 0, label: 'Glasgow, United Kingdom' },
  { city: 'Edinburgh', country: 'United Kingdom', latitude: 55.9533, longitude: -3.1883, timezone: 0, label: 'Edinburgh, United Kingdom' },
  { city: 'Liverpool', country: 'United Kingdom', latitude: 53.4084, longitude: -2.9916, timezone: 0, label: 'Liverpool, United Kingdom' },
  { city: 'Bristol', country: 'United Kingdom', latitude: 51.4545, longitude: -2.5879, timezone: 0, label: 'Bristol, United Kingdom' },
  { city: 'Leeds', country: 'United Kingdom', latitude: 53.8008, longitude: -1.5491, timezone: 0, label: 'Leeds, United Kingdom' },

  // United States
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, timezone: -5, label: 'New York, USA (EST)' },
  { city: 'Los Angeles', country: 'United States', latitude: 34.0522, longitude: -118.2437, timezone: -8, label: 'Los Angeles, USA (PST)' },
  { city: 'San Francisco', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: -8, label: 'San Francisco, USA (PST)' },
  { city: 'Chicago', country: 'United States', latitude: 41.8781, longitude: -87.6298, timezone: -6, label: 'Chicago, USA (CST)' },
  { city: 'Austin', country: 'United States', latitude: 30.2672, longitude: -97.7431, timezone: -6, label: 'Austin, USA (CST)' },
  { city: 'Dallas', country: 'United States', latitude: 32.7767, longitude: -96.797, timezone: -6, label: 'Dallas, USA (CST)' },
  { city: 'Houston', country: 'United States', latitude: 29.7604, longitude: -95.3698, timezone: -6, label: 'Houston, USA (CST)' },
  { city: 'Seattle', country: 'United States', latitude: 47.6062, longitude: -122.3321, timezone: -8, label: 'Seattle, USA (PST)' },
  { city: 'Boston', country: 'United States', latitude: 42.3601, longitude: -71.0589, timezone: -5, label: 'Boston, USA (EST)' },
  { city: 'Miami', country: 'United States', latitude: 25.7617, longitude: -80.1918, timezone: -5, label: 'Miami, USA (EST)' },
  { city: 'Atlanta', country: 'United States', latitude: 33.749, longitude: -84.388, timezone: -5, label: 'Atlanta, USA (EST)' },
  { city: 'Washington D.C.', country: 'United States', latitude: 38.9072, longitude: -77.0369, timezone: -5, label: 'Washington D.C., USA (EST)' },
  { city: 'Denver', country: 'United States', latitude: 39.7392, longitude: -104.9903, timezone: -7, label: 'Denver, USA (MST)' },
  { city: 'Phoenix', country: 'United States', latitude: 33.4484, longitude: -112.074, timezone: -7, label: 'Phoenix, USA (MST)' },
  { city: 'Philadelphia', country: 'United States', latitude: 39.9526, longitude: -75.1652, timezone: -5, label: 'Philadelphia, USA (EST)' },
  { city: 'San Diego', country: 'United States', latitude: 32.7157, longitude: -117.1611, timezone: -8, label: 'San Diego, USA (PST)' },

  // Canada
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: -5, label: 'Toronto, Canada' },
  { city: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207, timezone: -8, label: 'Vancouver, Canada' },
  { city: 'Montreal', country: 'Canada', latitude: 45.5017, longitude: -73.5673, timezone: -5, label: 'Montreal, Canada' },
  { city: 'Calgary', country: 'Canada', latitude: 51.0447, longitude: -114.0719, timezone: -7, label: 'Calgary, Canada' },
  { city: 'Ottawa', country: 'Canada', latitude: 45.4215, longitude: -75.6972, timezone: -5, label: 'Ottawa, Canada' },

  // Australia & New Zealand
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 10, label: 'Sydney, Australia' },
  { city: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631, timezone: 10, label: 'Melbourne, Australia' },
  { city: 'Brisbane', country: 'Australia', latitude: -27.4698, longitude: 153.0251, timezone: 10, label: 'Brisbane, Australia' },
  { city: 'Perth', country: 'Australia', latitude: -31.9505, longitude: 115.8605, timezone: 8, label: 'Perth, Australia' },
  { city: 'Adelaide', country: 'Australia', latitude: -34.9285, longitude: 138.6007, timezone: 9.5, label: 'Adelaide, Australia' },
  { city: 'Auckland', country: 'New Zealand', latitude: -36.8485, longitude: 174.7633, timezone: 12, label: 'Auckland, New Zealand' },
  { city: 'Wellington', country: 'New Zealand', latitude: -41.2865, longitude: 174.7762, timezone: 12, label: 'Wellington, New Zealand' },

  // Europe
  { city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 1, label: 'Paris, France' },
  { city: 'Lyon', country: 'France', latitude: 45.764, longitude: 4.8357, timezone: 1, label: 'Lyon, France' },
  { city: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405, timezone: 1, label: 'Berlin, Germany' },
  { city: 'Munich', country: 'Germany', latitude: 48.1351, longitude: 11.582, timezone: 1, label: 'Munich, Germany' },
  { city: 'Frankfurt', country: 'Germany', latitude: 50.1109, longitude: 8.6821, timezone: 1, label: 'Frankfurt, Germany' },
  { city: 'Amsterdam', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041, timezone: 1, label: 'Amsterdam, Netherlands' },
  { city: 'Zurich', country: 'Switzerland', latitude: 47.3769, longitude: 8.5417, timezone: 1, label: 'Zurich, Switzerland' },
  { city: 'Geneva', country: 'Switzerland', latitude: 46.2044, longitude: 6.1432, timezone: 1, label: 'Geneva, Switzerland' },
  { city: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964, timezone: 1, label: 'Rome, Italy' },
  { city: 'Milan', country: 'Italy', latitude: 45.4642, longitude: 9.19, timezone: 1, label: 'Milan, Italy' },
  { city: 'Madrid', country: 'Spain', latitude: 40.4168, longitude: -3.7038, timezone: 1, label: 'Madrid, Spain' },
  { city: 'Barcelona', country: 'Spain', latitude: 41.3879, longitude: 2.1699, timezone: 1, label: 'Barcelona, Spain' },
  { city: 'Dublin', country: 'Ireland', latitude: 53.3498, longitude: -6.2603, timezone: 0, label: 'Dublin, Ireland' },

  // Middle East & Africa
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 4, label: 'Dubai, UAE' },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', latitude: 24.4539, longitude: 54.3773, timezone: 4, label: 'Abu Dhabi, UAE' },
  { city: 'Johannesburg', country: 'South Africa', latitude: -26.2041, longitude: 28.0473, timezone: 2, label: 'Johannesburg, South Africa' },
  { city: 'Cape Town', country: 'South Africa', latitude: -33.9249, longitude: 18.4241, timezone: 2, label: 'Cape Town, South Africa' },

  // Asia
  { city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 8, label: 'Singapore' },
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: 9, label: 'Tokyo, Japan' },
  { city: 'Osaka', country: 'Japan', latitude: 34.6937, longitude: 135.5023, timezone: 9, label: 'Osaka, Japan' },
  { city: 'Hong Kong', country: 'Hong Kong', latitude: 22.3193, longitude: 114.1694, timezone: 8, label: 'Hong Kong' },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.139, longitude: 101.6869, timezone: 8, label: 'Kuala Lumpur, Malaysia' },
  { city: 'Bangkok', country: 'Thailand', latitude: 13.7563, longitude: 100.5018, timezone: 7, label: 'Bangkok, Thailand' },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456, timezone: 7, label: 'Jakarta, Indonesia' },
  { city: 'Kathmandu', country: 'Nepal', latitude: 27.7172, longitude: 85.324, timezone: 5.75, label: 'Kathmandu, Nepal' },
  { city: 'Colombo', country: 'Sri Lanka', latitude: 6.9271, longitude: 79.8612, timezone: 5.5, label: 'Colombo, Sri Lanka' },
  { city: 'Dhaka', country: 'Bangladesh', latitude: 23.8103, longitude: 90.4125, timezone: 6, label: 'Dhaka, Bangladesh' },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011, timezone: 5, label: 'Karachi, Pakistan' },
  { city: 'Lahore', country: 'Pakistan', latitude: 31.5204, longitude: 74.3587, timezone: 5, label: 'Lahore, Pakistan' },
];

export const COUNTRY_DEFAULTS: Record<string, { latitude: number; longitude: number; timezone: number; city: string }> = {
  'India': { latitude: 28.6139, longitude: 77.209, timezone: 5.5, city: 'New Delhi' },
  'United States': { latitude: 40.7128, longitude: -74.006, timezone: -5, city: 'New York' },
  'United Kingdom': { latitude: 51.5074, longitude: -0.1278, timezone: 0, city: 'London' },
  'Canada': { latitude: 43.6532, longitude: -79.3832, timezone: -5, city: 'Toronto' },
  'Australia': { latitude: -33.8688, longitude: 151.2093, timezone: 10, city: 'Sydney' },
  'Germany': { latitude: 52.52, longitude: 13.405, timezone: 1, city: 'Berlin' },
  'France': { latitude: 48.8566, longitude: 2.3522, timezone: 1, city: 'Paris' },
  'Italy': { latitude: 41.9028, longitude: 12.4964, timezone: 1, city: 'Rome' },
  'Spain': { latitude: 40.4168, longitude: -3.7038, timezone: 1, city: 'Madrid' },
  'Netherlands': { latitude: 52.3676, longitude: 4.9041, timezone: 1, city: 'Amsterdam' },
  'Switzerland': { latitude: 47.3769, longitude: 8.5417, timezone: 1, city: 'Zurich' },
  'Ireland': { latitude: 53.3498, longitude: -6.2603, timezone: 0, city: 'Dublin' },
  'United Arab Emirates': { latitude: 25.2048, longitude: 55.2708, timezone: 4, city: 'Dubai' },
  'Singapore': { latitude: 1.3521, longitude: 103.8198, timezone: 8, city: 'Singapore' },
  'Japan': { latitude: 35.6762, longitude: 139.6503, timezone: 9, city: 'Tokyo' },
  'Hong Kong': { latitude: 22.3193, longitude: 114.1694, timezone: 8, city: 'Hong Kong' },
  'New Zealand': { latitude: -36.8485, longitude: 174.7633, timezone: 12, city: 'Auckland' },
  'South Africa': { latitude: -26.2041, longitude: 28.0473, timezone: 2, city: 'Johannesburg' },
  'Malaysia': { latitude: 3.139, longitude: 101.6869, timezone: 8, city: 'Kuala Lumpur' },
  'Thailand': { latitude: 13.7563, longitude: 100.5018, timezone: 7, city: 'Bangkok' },
  'Indonesia': { latitude: -6.2088, longitude: 106.8456, timezone: 7, city: 'Jakarta' },
  'Nepal': { latitude: 27.7172, longitude: 85.324, timezone: 5.75, city: 'Kathmandu' },
  'Sri Lanka': { latitude: 6.9271, longitude: 79.8612, timezone: 5.5, city: 'Colombo' },
  'Bangladesh': { latitude: 23.8103, longitude: 90.4125, timezone: 6, city: 'Dhaka' },
  'Pakistan': { latitude: 24.8607, longitude: 67.0011, timezone: 5, city: 'Karachi' },
  'Other': { latitude: 28.6139, longitude: 77.209, timezone: 5.5, city: 'Custom City' },
};

export function findCities(query: string): CityLocation[] {
  if (!query || query.trim().length === 0) return POPULAR_CITIES.slice(0, 10);
  const q = query.toLowerCase().trim();
  return POPULAR_CITIES.filter(
    (c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.label.toLowerCase().includes(q)
  );
}
