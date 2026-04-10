import { API } from "../services/api.js";

export class HomePage extends HTMLElement {
  constructor() {
    super();
    this.filter = new Proxy(
      {
        query: "",
        region: null,
      },
      {
        set: (target, prop, value) => {
          target[prop] = value;
          this.handleFilterChange();
          return true;
        },
      },
    );
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

  handleFilterChange() {
    this.renderCountryCards(
      this.countries.filter((country) => {
        const { query, region } = this.filter;
        return (
          country.name.toLowerCase().includes(query.toLowerCase()) &&
          (!Boolean(region) || country.region.toLowerCase() === region)
        );
      }),
    );
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
    const regionFilter = this.querySelector("custom-select");

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      this.filter.query = query;
    });

    regionFilter.addEventListener("change", (e) => {
      const region = e.target.value;
      this.filter.region = region;
    });
  }
}
