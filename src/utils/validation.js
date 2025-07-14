// Some quick validation helpers for URL Shortener
// TODO: Add more robust URL validation if needed

export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Just checks for positive integer
export function validateValidity(validity) {
  return Number.isInteger(validity) && validity > 0;
}

// Only allow 4-12 alphanumeric
export function validateShortcode(code) {
  return /^[a-zA-Z0-9]{4,12}$/.test(code);
} 