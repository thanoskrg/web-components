import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export type Config = Partial<{ enabled: boolean }>;

export class FooButton extends LitElement {
  @property({ attribute: false })
  private text: string = "SIGN IN";

  @property({ attribute: false })
  private config: Config = {};

  @property({ attribute: false })
  private loading: boolean = false;

  private get isDisabled() {
    return this.config.enabled !== true;
  }

  constructor() {
    super();
  }

  private onClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  async loadConfig() {
    const res = await fetch("/config");
    this.config = await res.json();
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadConfig();
  }

  render() {
    if (this.isDisabled) {
      return null;
    }

    if (this.loading) {
      return html`<button>LOADING</button>`;
    }

    const handleClick = this.onClick.bind(this);

    return html`<button @click=${handleClick}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </span>
      <span>${this.text}</span>
    </button>`;
  }

  static get styles() {
    return css`
      :host * {
        font-family: "Titillium Web", sans-serif;
        font-size: 12px;
        font-weight: 600;
      }

      button {
        align-items: center;
        background-color: #1f1f27;
        border-color: transparent;
        border-radius: 5px;
        box-shadow: none;
        color: #fff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        min-width: 95px;
        line-height: 15px;
        padding: 12px 15px;
      }

      button > * + * {
        margin-right: 0;
        margin-left: 0.375rem;
      }

      button:hover {
        background-color: #38383f;
      }
    `;
  }
}

// add to `CustomElementRegistry`
window.customElements.define("foo-button", FooButton);
