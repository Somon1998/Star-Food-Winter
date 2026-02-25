let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  fetch(`/lang/${lang}.json`) // <-- убедись что папка именно public/lang/
    .then((res) => {
      if (!res.ok) throw new Error(`Language file not found: ${lang}`);
      return res.json();
    })
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;

        if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (el.dataset.i18nAttr) {
            el.setAttribute(el.dataset.i18nAttr, data[key]);
          } else {
            el.textContent = data[key];
          }
        }
      });
    })
    .catch((err) => console.error(err));
}

setLanguage(currentLang);

const toggle = document.querySelector(".lang-toggle");
const dropdown = document.querySelector(".lang-dropdown");

if (toggle && dropdown) {
  toggle.addEventListener("click", () => {
    dropdown.hidden = !dropdown.hidden;
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setLanguage(btn.dataset.lang);
      dropdown.hidden = true;
    });
  });

  // закрыть при клике вне
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) dropdown.hidden = true;
  });
}

export { setLanguage };
