// Loads the content script into jsdom's page and checks every enhancement
// works through the real wiring.
import { HIDDEN } from "../src/hide-sponsored/sponsored-markers";

const result = (id: string, inner: string) =>
  `<div class="s-result-item" id="${id}" data-component-type="s-search-result">${inner}<h2>USB C cable</h2></div>`;

async function load() {
  vi.resetModules();
  document.head.replaceChildren();
  document.body.innerHTML = `<div class="s-main-slot">
    ${result("labelled", `<a class="puis-sponsored-label-text">Sponsored</a>`)}
    ${result("worded", `<span>Gesponsert</span>`)}
    ${result("organic", "")}
    <div class="s-result-item s-widget" id="deals"><div class="celwidget" id="deals-list">
      ${result("deal-ad", `<span class="puis-sponsored-label-text">Sponsored</span>`)}
      ${result("deal", "")}
    </div></div>
    <div class="s-result-item s-widget" id="carousel"><span class="s-widget-sponsored-label-text">Sponsored</span></div>
    <div class="celwidget" id="sims"><div class="celwidget" id="sp_detail"><div class="sp_desktop_sponsored_label">Sponsored</div></div><div class="celwidget" id="video"><div><div>Sponsored</div></div></div></div>
  </div>`;
  await import("../src/main");
}

const hidden = (id: string) =>
  document.getElementById(id)!.hasAttribute(HIDDEN);

describe("content script", () => {
  it("installs the stylesheet that does the hiding", async () => {
    await load();

    const style = document.documentElement.querySelector("style")!;
    expect(style.textContent).toContain(`[${HIDDEN}]`);
  });

  it("hides sponsored results and carousels already on the page, and keeps the rest", async () => {
    await load();

    expect(hidden("labelled")).toBe(true);
    expect(hidden("worded")).toBe(true);
    expect(hidden("carousel")).toBe(true);
    expect(hidden("sp_detail")).toBe(true);
    expect(hidden("video")).toBe(true);
    expect(hidden("organic")).toBe(false);
    expect(hidden("sims")).toBe(false);
  });

  it("hides only the sponsored cards in a carousel that mixes them with organic ones", async () => {
    await load();

    expect(hidden("deal-ad")).toBe(true);
    expect(hidden("deal")).toBe(false);
    expect(hidden("deals-list")).toBe(false);
    expect(hidden("deals")).toBe(false);
    expect(hidden("sims")).toBe(false);
  });

  it("hides sponsored results that load later", async () => {
    await load();

    document
      .querySelector(".s-main-slot")!
      .insertAdjacentHTML(
        "beforeend",
        result(
          "late",
          `<span class="puis-sponsored-label-text">Sponsored</span>`,
        ) + result("late-organic", ""),
      );

    await vi.waitFor(() => {
      expect(hidden("late")).toBe(true);
    });
    expect(hidden("late-organic")).toBe(false);
  });

  it("hides a result whose label text arrives after the label", async () => {
    await load();
    document
      .querySelector(".s-main-slot")!
      .insertAdjacentHTML(
        "beforeend",
        result("streamed", `<span id="label"></span>`),
      );

    document.getElementById("label")!.append("Sponsorlu");

    await vi.waitFor(() => {
      expect(hidden("streamed")).toBe(true);
    });
  });
});
