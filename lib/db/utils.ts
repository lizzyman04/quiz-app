/**
 * Generates a unique UUID for local tracking of attempts.
 */
export const generateLocalId = (): string => {
  return crypto.randomUUID();
};

/**
 * Returns the current timestamp in ISO format.
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Estimates the current usage of the browser storage in bytes.
 * Note: This includes all storage for the origin, not just this IndexedDB.
 */
export const getDatabaseSize = async (): Promise<number> => {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
  return 0;
};
