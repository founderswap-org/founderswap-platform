export const metaKey =
  typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)
    ? '⌘'
    : 'Ctrl+';
