export function createDisposables() {
  /** @type {Array<() => void>} */
  const stack = [];

  return {
    add(dispose) {
      if (typeof dispose === 'function') stack.push(dispose);
    },
    dispose() {
      while (stack.length) {
        const fn = stack.pop();
        try {
          fn();
        } catch (e) {
          console.error(e);
        }
      }
    },
  };
}
