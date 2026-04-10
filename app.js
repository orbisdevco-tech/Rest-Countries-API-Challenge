import { CountryCard } from "./components/country-card.js";
import { HomePage } from "./pages/home-page.js";

function registerComponents() {
  customElements.define("country-card", CountryCard);
  customElements.define("home-page", HomePage);
}

registerComponents();
