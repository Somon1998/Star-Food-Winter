/**
 * Tabs placeholder.
 * Convention:
 *  - container: [data-tabs]
 *  - buttons:   [data-tab]
 *  - panels:    [data-panel]
 */
export function initTabs(container) {
  const logger = container.resolve('logger');
  logger.debug('tabs: not configured');
  return () => {};
}
