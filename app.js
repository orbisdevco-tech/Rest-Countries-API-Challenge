import { CountryCard } from "./components/country-card.js";
import { CountryPage } from "./pages/country-page.js";
import { HomePage } from "./pages/home-page.js";
import { router } from "./services/router.js";

function registerComponents() {
  customElements.define("country-card", CountryCard);
  customElements.define("home-page", HomePage);
  customElements.define("country-page", CountryPage);
}

registerComponents();

window.app = {
  router,
};

window.addEventListener("DOMContentLoaded", () => {
  router.init();
});
