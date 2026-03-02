/**
 * Home swiper placeholder.
 * If you later add a swiper to hero/home section, configure it here.
 */
export function initHomeSwiper(container) {
  const logger = container.resolve('logger');
  logger.debug('homeSwiper: not configured');
  return () => {};
}
