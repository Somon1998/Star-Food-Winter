// Храним ID интервала создания снежинок
// Нужно, чтобы потом можно было его остановить через clearInterval
let snowInterval = null;

// Храним ID интервала проверки сезона
// Чтобы не создавать несколько одинаковых интервалов
let seasonInterval = null;

// Здесь будем хранить ссылку на контейнер для снега
// Чтобы не делать querySelector каждый раз
let snowContainer = null;

// Проверяем — сейчас зима или нет
function isWinterNow() {
  // Получаем текущий месяц (0–11)
  const month = new Date().getMonth();

  // 11 = December
  // 0 = January
  // 1 = February
  // Если один из этих месяцев → значит зима
  return month === 11 || month === 0 || month === 1;
}

// Функция создания одной снежинки
function createSnowflake() {
  // Если контейнер не найден — ничего не делаем
  // Это защита от ошибки
  if (!snowContainer) return;

  // Создаём div элемент
  const snowflake = document.createElement("div");

  // Добавляем CSS класс (стили анимации находятся в CSS)
  snowflake.className = "snowflake";

  // Добавляем символ снежинки
  snowflake.textContent = "❄";

  // Случайная позиция по ширине экрана
  snowflake.style.left = Math.random() * window.innerWidth + "px";

  // Случайный размер (от 10px до 20px)
  snowflake.style.fontSize = Math.random() * 10 + 10 + "px";

  // Случайная прозрачность
  snowflake.style.opacity = Math.random();

  // Случайная скорость падения (3–6 секунд)
  snowflake.style.animationDuration = Math.random() * 3 + 3 + "s";

  // Добавляем снежинку в контейнер
  snowContainer.appendChild(snowflake);

  // Через 12 секунд удаляем снежинку из DOM
  // Это важно — иначе будет утечка памяти
  setTimeout(() => snowflake.remove(), 12000);
}

// Запуск снега
export function startSnow() {
  // Если сейчас не зима — не запускаем
  if (!isWinterNow()) return;

  // Если интервал уже существует — не создаём новый
  // Это защита от повторного запуска
  if (snowInterval) return;

  // Каждые 80 миллисекунд создаём снежинку
  snowInterval = setInterval(createSnowflake, 80);
}

// Остановка снега
export function stopSnow() {
  // Если интервала нет — ничего не делаем
  if (!snowInterval) return;

  // Останавливаем создание снежинок
  clearInterval(snowInterval);

  // Обнуляем переменную
  snowInterval = null;
}

// Инициализация всей системы сезона
export function initSeasonSystem() {
  // Один раз получаем контейнер
  // Это быстрее и правильнее, чем искать каждый раз
  snowContainer = document.querySelector(".snow-container");

  // Если контейнера нет — система не запускается
  if (!snowContainer) return;

  // Функция проверки сезона
  function checkSeason() {
    // Если зима — запускаем снег
    if (isWinterNow()) {
      startSnow();
    }
    // Если не зима — останавливаем
    else {
      stopSnow();
    }
  }

  // Проверяем сразу при загрузке страницы
  checkSeason();

  // Если интервал проверки ещё не создан — создаём
  if (!seasonInterval) {
    // Проверяем сезон каждый час
    // 60 минут × 60 секунд × 1000 миллисекунд
    seasonInterval = setInterval(checkSeason, 60 * 60 * 1000);
  }
}
