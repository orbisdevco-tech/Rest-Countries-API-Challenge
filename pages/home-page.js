import { API } from "../services/api.js";

export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("home-page-template");
    const clonedFragment = template.content.cloneNode(true);
    this.appendChild(clonedFragment);
    this.render().then(() => {
      this.handleInteractivity();
    });
  }

  async render() {
    this.countries = await API.getCountries();
    this.renderCountryCards(this.countries);
  }

  renderCountryCards(countries) {
    const containerRef = this.querySelector(".country-cards");
    const fragment = document.createDocumentFragment();

    for (const country of countries) {
      const countryCard = document.createElement("country-card");
      countryCard.dataset.data = JSON.stringify(country);
      fragment.appendChild(countryCard);
    }

    containerRef.innerHTML = "";
    containerRef.appendChild(fragment);
  }

  handleInteractivity() {
    const searchInput = this.querySelector(".nav__search");

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      this.renderCountryCards(
        this.countries.filter((country) => {
          return country.name.toLowerCase().includes(query.toLowerCase());
        }),
      );
    });
  }
}
