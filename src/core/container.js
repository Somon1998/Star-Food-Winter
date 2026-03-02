export function createContainer() {
  /** @type {Map<string, any>} */
  const registry = new Map();

  return {
    register(name, value) {
      registry.set(name, value);
      return this;
    },
    resolve(name) {
      if (!registry.has(name)) {
        throw new Error(`Container: dependency "${name}" is not registered`);
      }
      return registry.get(name);
    },
    has(name) {
      return registry.has(name);
    },
  };
}
