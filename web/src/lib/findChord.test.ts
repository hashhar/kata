import { describe, expect, test } from 'vitest';
import { findChordLabel, isFindChord } from './findChord';

const key = (over: Partial<KeyboardEvent>) => ({
  key: 'f',
  metaKey: false,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  ...over,
});

describe('find chord', () => {
  test('is Cmd+F on macOS', () => {
    expect(isFindChord(key({ metaKey: true }), 'MacIntel')).toBe(true);
    expect(isFindChord(key({ ctrlKey: true }), 'MacIntel')).toBe(false);
  });

  test('is Ctrl+F elsewhere', () => {
    expect(isFindChord(key({ ctrlKey: true }), 'Linux x86_64')).toBe(true);
    expect(isFindChord(key({ ctrlKey: true, key: 'F' }), 'Win32')).toBe(true);
    expect(isFindChord(key({ metaKey: true }), 'Win32')).toBe(false);
  });

  test('ignores other chords on f and other keys', () => {
    expect(isFindChord(key({ metaKey: true, shiftKey: true }), 'MacIntel')).toBe(false);
    expect(isFindChord(key({ metaKey: true, altKey: true }), 'MacIntel')).toBe(false);
    expect(isFindChord(key({}), 'MacIntel')).toBe(false);
    expect(isFindChord(key({ metaKey: true, key: 'g' }), 'MacIntel')).toBe(false);
  });

  test('labels the chord per platform', () => {
    expect(findChordLabel('MacIntel')).toBe('⌘F');
    expect(findChordLabel('Linux x86_64')).toBe('Ctrl+F');
  });
});
