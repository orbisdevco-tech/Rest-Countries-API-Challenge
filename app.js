import { CountryCard } from "./components/country-card.js";
import { HomePage } from "./pages/home-page.js";
import { router } from "./services/router.js";

function registerComponents() {
  customElements.define("country-card", CountryCard);
  customElements.define("home-page", HomePage);
}

registerComponents();

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
