export interface CityLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // UTC offset in hours (e.g., 5.5, -5, +1)
  label: string;
}

export const POPULAR_CITIES: CityLocation[] = [
  // India
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

  // United Kingdom & Europe
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 0, label: 'London, United Kingdom' },
  { city: 'Manchester', country: 'United Kingdom', latitude: 53.4808, longitude: -2.2426, timezone: 0, label: 'Manchester, United Kingdom' },
  { city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 1, label: 'Paris, France' },
  { city: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405, timezone: 1, label: 'Berlin, Germany' },
  { city: 'Amsterdam', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041, timezone: 1, label: 'Amsterdam, Netherlands' },
  { city: 'Zurich', country: 'Switzerland', latitude: 47.3769, longitude: 8.5417, timezone: 1, label: 'Zurich, Switzerland' },

  // USA & Canada
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, timezone: -5, label: 'New York, USA (EST)' },
  { city: 'Los Angeles', country: 'United States', latitude: 34.0522, longitude: -118.2437, timezone: -8, label: 'Los Angeles, USA (PST)' },
  { city: 'San Francisco', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: -8, label: 'San Francisco, USA (PST)' },
  { city: 'Chicago', country: 'United States', latitude: 41.8781, longitude: -87.6298, timezone: -6, label: 'Chicago, USA (CST)' },
  { city: 'Austin', country: 'United States', latitude: 30.2672, longitude: -97.7431, timezone: -6, label: 'Austin, USA (CST)' },
  { city: 'Seattle', country: 'United States', latitude: 47.6062, longitude: -122.3321, timezone: -8, label: 'Seattle, USA (PST)' },
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: -5, label: 'Toronto, Canada' },
  { city: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207, timezone: -8, label: 'Vancouver, Canada' },

  // Asia & Australia & Middle East
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 4, label: 'Dubai, UAE' },
  { city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 8, label: 'Singapore' },
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 10, label: 'Sydney, Australia' },
  { city: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631, timezone: 10, label: 'Melbourne, Australia' },
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: 9, label: 'Tokyo, Japan' },
  { city: 'Hong Kong', country: 'Hong Kong', latitude: 22.3193, longitude: 114.1694, timezone: 8, label: 'Hong Kong' },
];

export function findCities(query: string): CityLocation[] {
  if (!query || query.trim().length === 0) return POPULAR_CITIES.slice(0, 10);
  const q = query.toLowerCase().trim();
  return POPULAR_CITIES.filter(
    (c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.label.toLowerCase().includes(q)
  );
}
