import { APP_CONFIG } from './config.js';
import { createRuntime } from './runtime.js';

import { createContainer } from '../core/container.js';
import { createLogger } from '../core/logger.js';
import { createStorage } from '../core/storage.js';
import { createEventBus } from '../core/eventBus.js';
import { createStore } from '../core/store.js';
import { dom } from '../core/dom.js';

import { initNavbar } from '../features/navbar/index.js';
import { initReviewSwiper, initHomeSwiper } from '../features/swipers/index.js';
import { initTabs } from '../features/tabs/index.js';
import { initScrollTop } from '../features/scrollTop/index.js';
import { initThemeToggle } from '../features/theme/index.js';

function onDomReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

export function bootstrap() {
  onDomReady(() => {
    const logger = createLogger('star-food', { level: 'info' });

    const container = createContainer()
      .register('config', APP_CONFIG)
      .register('logger', logger)
      .register('storage', createStorage(APP_CONFIG.storagePrefix))
      .register('eventBus', createEventBus())
      .register('store', createStore({}))
      .register('dom', dom);

    const runtime = createRuntime({ logger });

    runtime.start([
      () => initThemeToggle(container),
      () => initNavbar(container),
      () => initReviewSwiper(container),
      () => initHomeSwiper(container),
      () => initTabs(container),
      () => initScrollTop(container),
    ]);

    // expose for debugging (optional)
    window.__APP__ = { container };
  });
}
