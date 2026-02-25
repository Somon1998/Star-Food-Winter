function getSystemTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
}

function updateIcon(btn, theme) {
  const icon = btn.querySelector("i");
  if (!icon) return;

  // moon (default) when light, sun when dark
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
    btn.setAttribute("aria-label", "Switch to light theme");
  } else {
    icon.className = "fa-solid fa-moon";
    btn.setAttribute("aria-label", "Switch to dark theme");
  }
}

export function initThemeToggle(container) {
  const config = container.resolve("config");
  const dom = container.resolve("dom");
  const storage = container.resolve("storage");
  const logger = container.resolve("logger");

  const btn = dom.q(config.selectors.themeToggle);
  if (!btn) {
    logger.warn("theme: toggle button not found (skipping)");
    return () => {};
  }

  const stored = storage.get(config.storageKeys.theme, null);
  let theme = stored ?? getSystemTheme();

  applyTheme(theme);
  updateIcon(btn, theme);

  const off = dom.on(btn, "click", () => {
    theme = theme === "dark" ? "light" : "dark";
    storage.set(config.storageKeys.theme, theme);
    applyTheme(theme);
    updateIcon(btn, theme);
  });

  logger.info("theme: ready");

  return () => off();
}
