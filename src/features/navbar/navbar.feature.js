/**
 * Navbar feature
 * - mobile menu open/close
 * - close menu when link clicked
 */
export function initNavbar(container) {
  const config = container.resolve('config');
  const dom = container.resolve('dom');
  const logger = container.resolve('logger');

  const links = dom.qa(config.selectors.navbarLinks);
  const openBtn = dom.q(config.selectors.menuOpenButton);
  const closeBtn = dom.q(config.selectors.menuCloseButton);

  if (!openBtn || !closeBtn) {
    logger.warn('navbar: buttons not found (skipping)');
    return () => {};
  }

  const toggle = () => {
    document.body.classList.toggle(config.classes.mobileMenuOpen);
  };

  const disposers = [];
  disposers.push(dom.on(openBtn, 'click', toggle));
  disposers.push(dom.on(closeBtn, 'click', () => openBtn.click()));
  links.forEach((link) => disposers.push(dom.on(link, 'click', () => openBtn.click())));

  logger.info('navbar: ready');

  return () => disposers.forEach((d) => d());
}
