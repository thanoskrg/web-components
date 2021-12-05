import { html, fixture, expect } from "@open-wc/testing";

import { FooButton, Config } from "./index";

function stubLoadConfig(config: Config) {
  FooButton.prototype.loadConfig = async function () {
    this.config = config;
  };
}

describe("FooButton", () => {
  async function render() {
    const container = await fixture(html`<foo-button></foo-button>`);
    return container.shadowRoot;
  }

  describe("when `config.enabled` is true", () => {
    beforeEach(() => stubLoadConfig({ enabled: true }));

    it("renders", async () => {
      const element = await render();
      expect(element).to.contain.text("SIGN IN");
    });

    it("displays `LOADING` when clicked", async () => {
      const element = await render();
      element.querySelector("button").click();
      setTimeout(() => {
        expect(element).to.contain.text("LOADING");
      });
    });
  });

  describe("when `config.enabled` is false", () => {
    beforeEach(() => stubLoadConfig({ enabled: false }));

    it("does not render", async () => {
      const element = await render();
      expect(element.querySelector("button")).to.be.null;
    });
  });
});
