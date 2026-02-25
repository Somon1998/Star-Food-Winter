export const dom = {
  q(selector, root = document) {
    return root.querySelector(selector);
  },
  qa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  },
  on(target, eventName, handler, options) {
    if (!target) return () => {};
    target.addEventListener(eventName, handler, options);
    return () => target.removeEventListener(eventName, handler, options);
  },
  addClass(el, className) {
    el?.classList?.add(className);
  },
  removeClass(el, className) {
    el?.classList?.remove(className);
  },
  toggleClass(el, className, force) {
    el?.classList?.toggle(className, force);
  },
  hasClass(el, className) {
    return el?.classList?.contains(className) ?? false;
  },
  setAttr(el, name, value) {
    if (!el) return;
    el.setAttribute(name, value);
  },
};
