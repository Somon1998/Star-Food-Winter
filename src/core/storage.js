export function createStorage(prefix = 'app') {
  const keyOf = (k) => `${prefix}:${k}`;

  return {
    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(keyOf(key));
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(keyOf(key), JSON.stringify(value));
      } catch {
        // ignore
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(keyOf(key));
      } catch {
        // ignore
      }
    },
  };
}
