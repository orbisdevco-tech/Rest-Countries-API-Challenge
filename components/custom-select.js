export class CustomSelect extends HTMLElement {
  constructor() {
    super();
    this.state = new Proxy(
      {
        open: false,
        value: null,
      },
      {
        set: (target, prop, value) => {
          const oldValue = target[prop];
          target[prop] = value;
          if (prop === "value" && oldValue != value)
            this.dispatchEvent(
              new CustomEvent("change", {
                detail: { value },
                bubbles: true, // let event go up DOM
                composed: true, // lets event escape shadow DOM
              }),
            );
          this.onStateChange();
          return true;
        },
      },
    );
  }

  connectedCallback() {
    const template = document.getElementById("custom-select-template");
    const clonedFragment = template.content.cloneNode(true);
    const previousFragment = document.createDocumentFragment();

    this.childNodes.forEach((node) => {
      previousFragment.appendChild(node.cloneNode(true));
    });

    this.innerHTML = "";
    this.appendChild(clonedFragment);

    this.wrapper = this.querySelector(".select");
    this.selectBtn = this.querySelector(".select__btn");
    this.optionsMenu = this.querySelector(".select_options");
    this.valuePlaceholder = this.querySelector(".select__btn span");

    this.optionsMenu.appendChild(previousFragment);

    this.options = Array.from(this.optionsMenu.querySelectorAll("li"));

    this.onStateChange();
    this.handleInteractivity();
  }

  onStateChange() {
    this.#toggleSelectOptions(this.state.open);
    if (this.state.value) {
      this.valuePlaceholder.textContent = this.state.value;
      this.options.forEach((opt) => {
        const value = opt.getAttribute("value");
        opt.dataset.selected = value === this.state.value ? "true" : "false";
      });
    } else {
      this.valuePlaceholder.textContent = this.dataset.placeholder;
      this.options.forEach((opt) => (opt.dataset.selected = "false"));
    }
  }

  #toggleSelectOptions(state) {
    if (state) this.optionsMenu.classList.remove("hidden");
    else this.optionsMenu.classList.add("hidden");
  }

  handleInteractivity() {
    this.selectBtn.addEventListener("click", () => {
      this.state.open = !this.state.open;
    });

    this.wrapper.addEventListener("focusout", (e) => {
      const next = e.relatedTarget;
      if (next && this.wrapper.contains(next)) return;
      this.state.open = false;
    });

    for (const option of this.options) {
      option.addEventListener("click", (e) => {
        const targetValue = e.target.getAttribute("value");
        this.state.value =
          targetValue !== this.state.value ? targetValue : null;
        this.state.open = false;
      });
    }
  }

  get value() {
    return this.state.value;
  }
}
