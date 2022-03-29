import {v4 as uuidv4} from "uuid"

enum StorageKey {
  Access = "ACCESS_TOKEN_KEY",
  Refresh = "REFRESH_TOKEN_KEY",
  Session = "SESSION_ID",
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

function getOrCreateSession(): string {
  const id = getFromStorage(StorageKey.Session)
  if (id === null) {
    const uuid = uuidv4()
    saveInStorage(StorageKey.Session, uuid)
    return uuid
  }else{
    return id
  }
}

export { getOrCreateSession, saveInStorage, getFromStorage, deleteFromStorage, StorageKey };
