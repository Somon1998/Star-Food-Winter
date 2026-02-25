export function createStore(initialState = {}) {
  let state = { ...initialState };
  /** @type {Set<(state:any)=>void>} */
  const subs = new Set();

  function getState() {
    return state;
  }

  function setState(patch) {
    state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
    for (const fn of subs) fn(state);
  }

  function subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }

  return { getState, setState, subscribe };
}
