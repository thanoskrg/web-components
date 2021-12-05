import { html, fixture, expect } from "@open-wc/testing";

import "./index";

describe("FooButton", () => {
  let element: ShadowRoot;

  beforeEach(async () => {
    const container = await fixture(html`<foo-button></foo-button>`);
    element = container.shadowRoot;
  });

  it("renders", () => {
    expect(element).to.contain.text("SIGN IN");
  });

  it("displays `LOADING` when clicked", () => {
    element.querySelector("button").click();
    setTimeout(() => {
      expect(element).to.contain.text("LOADING");
    });
  });
});
