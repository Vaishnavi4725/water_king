/**
 * LEGACY LOCAL STORAGE UTILITIES
 * 
 * WARNING: These functions are maintained for backward compatibility only.
 * They are NOT the authoritative data source for the application.
 * 
 * All diary entries, photos, and user data are now stored in the Internet Computer
 * backend canister and accessed via React Query hooks in useQueries.ts.
 * 
 * Do NOT use these functions for primary data operations. They may be used only for:
 * - Non-authoritative local caching (if explicitly needed)
 * - Migration/import of old local data
 * - Temporary offline fallback (with clear user warnings)
 */

import type { Mood } from './moodAnalyzer';

export interface DiaryEntry {
  id: string;
  content: string;
  mood: Mood;
  date: string;
}

const STORAGE_KEY = 'dayry_entries';

/**
 * @deprecated Use useGetEntries() hook instead for authoritative backend data
 */
export function getDiaryEntries(): DiaryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const entries = JSON.parse(stored) as DiaryEntry[];
    // Sort by date descending (newest first)
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading diary entries:', error);
    return [];
  }
}

/**
 * @deprecated Use useAddEntry() hook instead for authoritative backend data
 */
export function saveDiaryEntry(entry: Omit<DiaryEntry, 'id'>): void {
  try {
    const entries = getDiaryEntries();
    const newEntry: DiaryEntry = {
      ...entry,
      id: crypto.randomUUID(),
    };
    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving diary entry:', error);
    throw new Error('Failed to save entry');
  }
}

/**
 * @deprecated Backend entries should be managed via backend methods
 */
export function deleteDiaryEntry(id: string): void {
  try {
    const entries = getDiaryEntries();
    const filtered = entries.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting diary entry:', error);
    throw new Error('Failed to delete entry');
  }
}

/**
 * Clears local storage entries. Safe to use for cleanup.
 */
export function clearAllEntries(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing entries:', error);
    throw new Error('Failed to clear entries');
  }
}

export function clearLocalEntries(): void {
  clearAllEntries();
}
