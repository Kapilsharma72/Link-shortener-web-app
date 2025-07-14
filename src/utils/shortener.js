// Shortener helpers
// TODO: Maybe allow user to pick length of shortcode
import { getUrls } from './storage';

// Just makes a random 6-char code
export function generateShortcode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Checks if code is unique
export function isShortcodeUnique(code) {
  const urls = getUrls();
  return !urls.some(u => u.shortcode === code);
} 