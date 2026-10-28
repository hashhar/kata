//! The browser's find chord: Cmd+F on macOS, Ctrl+F elsewhere. The
//! review viewer takes it over to open its own search, because the
//! browser's find can't see virtualised files.

/** True on Apple platforms, where Cmd is the find modifier. */
export function isApplePlatform(platform: string): boolean {
  return /Mac|iPhone|iPad|iPod/.test(platform);
}

/** Whether `e` is the find chord on `platform`. Ctrl+F on macOS moves
 *  the cursor in a text field, so it stays with the field. */
export function isFindChord(
  e: Pick<KeyboardEvent, 'key' | 'metaKey' | 'ctrlKey' | 'altKey' | 'shiftKey'>,
  platform: string,
): boolean {
  if (e.key.toLowerCase() !== 'f' || e.altKey || e.shiftKey) return false;
  return isApplePlatform(platform) ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey;
}

/** How the help overlay writes the find chord on `platform`. */
export function findChordLabel(platform: string): string {
  return isApplePlatform(platform) ? '⌘F' : 'Ctrl+F';
}
