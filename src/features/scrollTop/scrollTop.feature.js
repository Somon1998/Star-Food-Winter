export function initScrollTop(container) {
  const config = container.resolve('config');
  const dom = container.resolve('dom');
  const logger = container.resolve('logger');

  const btn = dom.q(config.selectors.scrollTop);
  if (!btn) {
    logger.warn('scrollTop: button not found (skipping)');
    return () => {};
  }

  const onScroll = () => {
    const visible = window.scrollY > 400;
    dom.toggleClass(btn, config.classes.scrollTopVisible, visible);
  };

  const offScroll = dom.on(window, 'scroll', onScroll, { passive: true });
  const offClick = dom.on(btn, 'click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // initial state
  onScroll();

  logger.info('scrollTop: ready');

  return () => {
    offScroll();
    offClick();
  };
}
