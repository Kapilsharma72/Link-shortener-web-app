// Storage helpers for URL Shortener
// TODO: Add support for clearing just clicks or just URLs
const URLS_KEY = 'short_urls';
const CLICKS_KEY = 'short_url_clicks';

export function getUrls() {
  return JSON.parse(localStorage.getItem(URLS_KEY) || '[]');
}

export function saveUrl(urlObj) {
  // Not checking for duplicates here, handled elsewhere
  const urls = getUrls();
  urls.push(urlObj);
  localStorage.setItem(URLS_KEY, JSON.stringify(urls));
}

export function updateUrl(shortcode, update) {
  const urls = getUrls();
  const idx = urls.findIndex(u => u.shortcode === shortcode);
  if (idx !== -1) {
    urls[idx] = { ...urls[idx], ...update };
    localStorage.setItem(URLS_KEY, JSON.stringify(urls));
  }
}

export function getClicks(shortcode) {
  const all = JSON.parse(localStorage.getItem(CLICKS_KEY) || '{}');
  return all[shortcode] || [];
}

export function addClick(shortcode, click) {
  // Not the most efficient, but fine for demo
  const all = JSON.parse(localStorage.getItem(CLICKS_KEY) || '{}');
  if (!all[shortcode]) all[shortcode] = [];
  all[shortcode].push(click);
  localStorage.setItem(CLICKS_KEY, JSON.stringify(all));
}

export function clearAll() {
  localStorage.removeItem(URLS_KEY);
  localStorage.removeItem(CLICKS_KEY);
} 