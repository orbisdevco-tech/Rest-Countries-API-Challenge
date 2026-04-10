import { CountryCard } from "./components/country-card.js";
import { CustomSelect } from "./components/custom-select.js";
import { CountryPage } from "./pages/country-page.js";
import { HomePage } from "./pages/home-page.js";
import { router } from "./services/router.js";

function registerComponents() {
  customElements.define("custom-select", CustomSelect);
  customElements.define("country-card", CountryCard);
  customElements.define("home-page", HomePage);
  customElements.define("country-page", CountryPage);
}

function handleThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlRoot = document.querySelector("html");

  const setTheme = (isDark) => {
    if (isDark) htmlRoot.classList.add("dark");
    else htmlRoot.classList.remove("dark");
    themeToggleBtn.querySelector("span").textContent = isDark
      ? "Light Mode"
      : "Dark Mode";
  };

  const toggleTheme = () => {
    const isDark = localStorage.getItem("theme") === "dark";
    localStorage.setItem("theme", isDark ? "light" : "dark");
    setTheme(!isDark);
  };

  themeToggleBtn.addEventListener("click", () => {
    toggleTheme();
  });

  const theme = localStorage.getItem("theme");
  const isDark = theme === "dark";
  setTheme(isDark);
}

window.app = {
  router,
};

window.addEventListener("DOMContentLoaded", () => {
  handleThemeToggle();
  router.init();

  const observer = new MutationObserver(() => {
    router.setup();
  });

  observer.observe(document.body, {
    childList: true, // add/remove elements
    subtree: true, // watch deep changes
    attributes: true, // attribute changes
  });
});

registerComponents();
