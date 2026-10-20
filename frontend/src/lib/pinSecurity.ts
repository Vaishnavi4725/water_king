const PIN_STORAGE_KEY = 'dayry_pin_hash';

// Simple hash function for PIN (not cryptographically secure, but sufficient for local storage)
function hashPin(pin: string): string {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

export function setPinHash(pin: string): void {
  const hash = hashPin(pin);
  localStorage.setItem(PIN_STORAGE_KEY, hash);
}

export function getPinHash(): string | null {
  return localStorage.getItem(PIN_STORAGE_KEY);
}

export function verifyPin(pin: string): boolean {
  const storedHash = getPinHash();
  if (!storedHash) return false;
  return hashPin(pin) === storedHash;
}

export function removePinHash(): void {
  localStorage.removeItem(PIN_STORAGE_KEY);
}

export function isPinSet(): boolean {
  return getPinHash() !== null;
}

// Encryption utilities for diary entries (simple XOR encryption with PIN as key)
export function encryptContent(content: string, pin: string): string {
  let encrypted = '';
  for (let i = 0; i < content.length; i++) {
    const charCode = content.charCodeAt(i) ^ pin.charCodeAt(i % pin.length);
    encrypted += String.fromCharCode(charCode);
  }
  return btoa(encrypted); // Base64 encode
}

export function decryptContent(encrypted: string, pin: string): string {
  try {
    const decoded = atob(encrypted); // Base64 decode
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ pin.charCodeAt(i % pin.length);
      decrypted += String.fromCharCode(charCode);
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
}
