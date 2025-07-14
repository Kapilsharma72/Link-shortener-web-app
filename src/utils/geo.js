// Mock geolocation for click analytics
// TODO: Use a real geolocation API if needed
const LOCATIONS = [
  { city: 'New York', country: 'USA' },
  { city: 'London', country: 'UK' },
  { city: 'Delhi', country: 'India' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'Paris', country: 'France' },
];

export function getMockLocation() {
  // Just picks a random city/country
  const idx = Math.floor(Math.random() * LOCATIONS.length);
  return LOCATIONS[idx];
} 