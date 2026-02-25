import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

/**
 * Testimonials / Review Swiper
 *
 * This project uses a DI container pattern (see other features).
 * So this feature accepts `container`, not a selector string.
 */
export function initReviewSwiper(container) {
  const config = container.resolve('config');
  const dom = container.resolve('dom');
  const logger = container.resolve('logger');

  // Must be the Swiper container element (the element that owns `.swiper-wrapper`).
  const el = dom.q(config.selectors.testimonialsSwiper);
  if (!el) {
    logger.warn('reviewSwiper: container not found (skipping)');
    return () => {};
  }

  // Scope pagination & navigation to this swiper instance.
  const paginationEl = el.querySelector('.swiper-pagination');
  const nextEl = el.querySelector('.swiper-button-next');
  const prevEl = el.querySelector('.swiper-button-prev');

  const swiper = new Swiper(el, {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: paginationEl,
      clickable: true,
      dynamicBullets: true,
    },

    navigation: {
      nextEl,
      prevEl,
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  logger.info('reviewSwiper: ready');

  return () => {
    try {
      swiper.destroy(true, true);
    } catch {
      // ignore
    }
  };
}
