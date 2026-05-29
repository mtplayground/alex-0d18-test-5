const { expect, test } = require("@playwright/test");

const owlParts = ["body", "eyes", "beak", "wings", "feet"];

test("renders the inline owl SVG in a stable centered layout", async ({ page }) => {
  await page.goto("/");

  const owl = page.getByTestId("owl-svg");
  await expect(owl).toBeVisible();
  await expect(page.getByRole("img", { name: /stylized owl composed/i })).toBeVisible();

  await expect(owl.locator("ellipse")).toHaveCount(2);
  await expect(owl.locator("circle")).toHaveCount(6);
  await expect(owl.locator("polygon")).toHaveCount(1);

  for (const part of owlParts) {
    await expect(owl.locator(`[data-part="${part}"]`)).toHaveCount(1);
  }

  const layout = await page.evaluate(() => {
    const svg = document.querySelector('[data-testid="owl-svg"]');
    const heading = document.querySelector("#owl-heading");
    const caption = document.querySelector("figcaption");

    if (!svg || !heading || !caption) {
      throw new Error("Expected owl SVG, heading, and caption to exist.");
    }

    const svgRect = svg.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const captionRect = caption.getBoundingClientRect();
    const viewportCenter = window.innerWidth / 2;
    const svgCenter = svgRect.left + svgRect.width / 2;

    return {
      captionBelowSvg: captionRect.top >= svgRect.bottom,
      headingAboveSvg: headingRect.bottom <= svgRect.top,
      svgCenterOffset: Math.abs(svgCenter - viewportCenter),
      svgHeight: svgRect.height,
      svgWidth: svgRect.width,
      viewportWidth: window.innerWidth,
    };
  });

  expect(layout.svgWidth).toBeGreaterThan(150);
  expect(layout.svgHeight).toBeGreaterThan(150);
  expect(layout.svgWidth).toBeLessThanOrEqual(Math.min(384, layout.viewportWidth));
  expect(layout.svgCenterOffset).toBeLessThanOrEqual(2);
  expect(layout.headingAboveSvg).toBe(true);
  expect(layout.captionBelowSvg).toBe(true);
});
