import { expect, test } from "@playwright/test";

test.describe("Projects", () => {
  test("project section renders current products", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#projects")).toContainText("1% Better Today");
    await expect(page.locator("#projects")).toContainText("1% Better - Focus");
    await expect(page.locator("#projects")).toContainText("1% Better - Exploit Better");
    await expect(page.locator("#projects")).toContainText("1% Better - Action Keeper");
    await expect(page.locator("#projects")).toContainText("1% Better - OS");
    await expect(page.locator("#projects")).toContainText("1% Better - This Website");
    await expect(page.locator("#projects")).toContainText("Featured Products");
    await expect(page.locator("#projects")).toContainText("Poker Product Line");
    await expect(page.locator("#projects")).toContainText("Operating Layer");
    await expect(page.locator("#projects")).toContainText("Archive / Proof of Work");
    await expect(page.locator("#projects")).toContainText("Coming soon");
    await expect(page.locator("#projects")).toContainText("Core brand product");
  });

  test("about page shows build activity heatmap", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator("body")).toContainText("Build activity");
    await expect(page.locator("body")).toContainText("Recent GitHub activity");
    await expect(page.locator("body")).toContainText("Open GitHub");
  });
});
