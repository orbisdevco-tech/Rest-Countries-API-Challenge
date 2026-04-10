import { API } from "../services/api.js";
import { slugify } from "../services/utils.js";

export class CountryPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("country-page-template");
    const clonedFragment = template.content.cloneNode(true);
    this.appendChild(clonedFragment);
    this.render();
  }

  async render() {
    const countries = await API.getCountries();
    this.country = countries.find((c) => {
      return slugify(c.name) === this.dataset.id;
    });

    if (!this.country) {
      window.app.router.go("/notfound");
      return;
    }

    this.renderDetails();
  }

  renderDetails() {
    const img = this.querySelector("img");

    img.src = this.country.flags.svg;
  }
}
