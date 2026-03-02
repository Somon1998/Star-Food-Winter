export function createEventBus() {
  /** @type {Map<string, Set<Function>>} */
  const handlers = new Map();

  function on(eventName, handler) {
    if (!handlers.has(eventName)) handlers.set(eventName, new Set());
    handlers.get(eventName).add(handler);
    return () => off(eventName, handler);
  }

  function off(eventName, handler) {
    const set = handlers.get(eventName);
    if (!set) return;
    set.delete(handler);
    if (set.size === 0) handlers.delete(eventName);
  }

  function emit(eventName, payload) {
    const set = handlers.get(eventName);
    if (!set) return;
    for (const handler of set) {
      try {
        handler(payload);
      } catch (e) {
        // don't break the bus
        console.error(e);
      }
    }
  }

  return { on, off, emit };
}
