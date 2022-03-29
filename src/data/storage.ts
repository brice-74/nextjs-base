enum StorageKey {
  Token = "TOKEN_KEY",
}

function saveInStorage(key: StorageKey, value: string): void {
  return localStorage.setItem(key, value);
}

function getFromStorage(key: StorageKey): string | null {
  const item = localStorage.getItem(key);

  if (typeof item !== "string") {
    return null;
  }
  return item;
}

function deleteFromStorage(key: StorageKey): void {
  return localStorage.removeItem(key);
}

export { saveInStorage, getFromStorage, deleteFromStorage, StorageKey };
