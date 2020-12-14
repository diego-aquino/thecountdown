/* eslint-disable import/prefer-default-export */
const isLocalStorageAvailable = typeof Storage !== 'undefined';
const isClient = typeof window !== 'undefined';

export function retrieveFromLocalStorage(key: string): string | null {
  if (!isLocalStorageAvailable || !isClient) {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function saveToLocalStorage(key: string, value: string): boolean {
  if (!isLocalStorageAvailable || !isClient) {
    return false;
  }

  window.localStorage.setItem(key, value);

  return true;
}
