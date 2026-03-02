import { createDisposables } from '../core/disposables.js';

export function createRuntime({ logger }) {
  const disposables = createDisposables();

  function start(initFns) {
    logger?.info?.('runtime start');

    for (const init of initFns) {
      try {
        const dispose = init();
        disposables.add(dispose);
      } catch (e) {
        logger?.error?.('feature init failed', e);
      }
    }

    return () => stop();
  }

  function stop() {
    logger?.info?.('runtime stop');
    disposables.dispose();
  }

  return { start, stop };
}
