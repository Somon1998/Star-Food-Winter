let treeInterval = null;

function isWinterNow() {
  const month = new Date().getMonth();

  // 11 = December
  // 0 = January
  // 1 = February
  return month === 11 || month === 0 || month === 1;
}

function updateTreeVisibility() {
  const tree = document.getElementById("tree");
  if (!tree) return;

  tree.classList.toggle("hidden", !isWinterNow());
}

export function initTreeSeasonSystem() {
  // Проверка при загрузке
  updateTreeVisibility();

  // Защита от повторного запуска
  if (treeInterval) return;

  // Проверка раз в час
  treeInterval = setInterval(updateTreeVisibility, 60 * 60 * 1000);
}

export function destroyTreeSeasonSystem() {
  if (!treeInterval) return;

  clearInterval(treeInterval);
  treeInterval = null;
}
