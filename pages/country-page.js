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
    img.alt = `${this.country.name} flag`;
    this.querySelectorAll("[data-key]").forEach((ele) => {
      const key = ele.dataset.key;
      const content = this.resolveData(key);
      ele.textContent = content;
    });

    const borderCountries = document.createDocumentFragment();

    (this.country.borders ?? ["None"]).forEach((border) => {
      const li = document.createElement("li");
      li.classList.add("badge");
      li.textContent = border;
      borderCountries.appendChild(li);
    });

    const borderCountriesListEle = this.querySelector(
      ".country-page__borders-data ul",
    );
    borderCountriesListEle.innerHTML = "";

    borderCountriesListEle.appendChild(borderCountries);
  }

  resolveData(key) {
    const data = this.country[key];

    if (key === "currencies") {
      return data.map((c) => c.name).join(", ");
    }

    if (key === "languages") {
      return data.map((l) => l.name).join(", ");
    }

    if (typeof data === "object" && Array.isArray(data)) {
      return data.join(", ");
    }
    return data;
  }
}
