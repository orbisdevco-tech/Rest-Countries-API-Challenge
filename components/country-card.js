export class CountryCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("country-card-template");
    const clonedFragment = template.content.cloneNode(true);
    this.appendChild(clonedFragment);
    this.render();
  }

  render() {
    const img = this.querySelector("img");
    const heading = this.querySelector("h2");
    const dataTableRef = this.querySelector(".country-card__data");

    const data = JSON.parse(this.dataset.data);
    img.src = data.flags.svg;
    heading.textContent = data.name;

    const tableData = {
      Population: data.population,
      Region: data.region,
      Capital: data.capital,
    };

    const tableFragment = document.createDocumentFragment();

    for (const [label, value] of Object.entries(tableData)) {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      const td = document.createElement("td");
      th.textContent = label;
      td.textContent = value;
      row.appendChild(th);
      row.appendChild(td);
      tableFragment.appendChild(row);
    }

    dataTableRef.appendChild(tableFragment);
  }
}
