import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage content, responsive layout, fonts, and accessibility", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/NADI Billing/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Semua Operasional ISP.");
  await page.evaluate(() => document.fonts.ready);

  for (const width of [360, 390, 768, 1024, 1280, 1600]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow, `overflow at ${width}px`).toBe(false);
    await page.screenshot({ path: `test-results/homepage-${width}.png`, fullPage: true });
  }
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("desktop dropdown opens with keyboard, escapes, and closes outside", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Navigasi utama", exact: true });
  const solutions = navigation.getByRole("button", { name: "Solusi", exact: true });
  await solutions.focus();
  await page.keyboard.press("Enter");
  await expect(solutions).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(navigation.getByRole("link", { name: "RT/RW Net", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(solutions).toBeFocused();
  await expect(solutions).toHaveAttribute("aria-expanded", "false");
  await solutions.click();
  await page.locator("h1").click();
  await expect(solutions).toHaveAttribute("aria-expanded", "false");
  await navigation.getByRole("button", { name: "Sumber Daya" }).click();
  await navigation.getByRole("link", { name: "Dokumentasi" }).click();
  await expect(page).toHaveURL(/\/documentation$/);
});

test("mobile menu supports nested links, Escape, and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Buka menu navigasi" });
  await trigger.click();
  const mobile = page.getByRole("navigation", { name: "Navigasi seluler" });
  await expect(mobile).toBeVisible();
  await mobile.locator("summary").filter({ hasText: "Solusi" }).click();
  await mobile.getByRole("link", { name: "ISP FTTH", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(mobile).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Buka menu navigasi" })).toBeFocused();
  await trigger.click();
  await mobile.locator("summary").filter({ hasText: "Solusi" }).click();
  await mobile.getByRole("link", { name: "ISP FTTH", exact: true }).click();
  await expect(page).toHaveURL(/\/solutions\/isp-ftth$/);
  await expect(mobile).toHaveCount(0);
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
});

test("capacity stays feature-inclusive and reaches the demo", async ({ page }) => {
  await page.goto("/pricing");
  await page.locator("label").filter({ has: page.getByRole("radio", { name: "2.500", exact: true }) }).click();
  await expect(page.getByText("2.500 pelanggan", { exact: true })).toBeVisible();
  await expect(page.getByText("All Features Included", { exact: true })).toBeVisible();
  await page.locator("label").filter({ has: page.getByRole("radio", { name: "Custom", exact: true }) }).click();
  await expect(page.getByText("Kapasitas Custom", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "JELAJAHI DEMO", exact: true }).click();
  await expect(page).toHaveURL(/kapasitas=Custom/);
  await expect(page.getByText("Kapasitas pilihan:")).toContainText("Custom");
});

test("FAQ works with keyboard and keeps one answer open", async ({ page }) => {
  await page.goto("/");
  const entries = page.locator("#faq details");
  await entries.nth(0).locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(entries.nth(0)).toHaveAttribute("open", "");
  await entries.nth(1).locator("summary").click();
  await expect(entries.nth(1)).toHaveAttribute("open", "");
  await expect(entries.nth(0)).not.toHaveAttribute("open", "");
});

test("demo advances, resets, and handles the selected flow", async ({ page }) => {
  await page.goto("/demo?alur=billing");
  await expect(page.getByRole("heading", { name: "Invoice Dibuat", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Langkah berikutnya" }).click();
  await expect(page.getByRole("heading", { name: "Reminder", exact: true })).toBeVisible();
  await page.locator("label").filter({ has: page.getByRole("radio", { name: "CRM", exact: true }) }).click();
  await expect(page.getByRole("heading", { name: "Lead", exact: true })).toBeVisible();
  for (let index = 0; index < 4; index++) await page.getByRole("button", { name: "Langkah berikutnya" }).click();
  await expect(page.getByRole("button", { name: "Simulasi selesai" })).toBeDisabled();
  await page.getByRole("button", { name: "Ulangi simulasi" }).click();
  await expect(page.getByRole("heading", { name: "Lead", exact: true })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
});

test("all navigation routes work, fragments exist, and unknown pages return 404", async ({ page, request }) => {
  await page.goto("/");
  const links = await page.locator("a[href]").evaluateAll((elements) => [...new Set(elements.map((element) => element.getAttribute("href")).filter((href): href is string => !!href && href.startsWith("/")))]);
  for (const href of links) {
    const response = await request.get(href.split("#")[0]);
    expect(response.status(), href).toBe(200);
    if (href.startsWith("/#")) await expect(page.locator(`[id="${href.slice(2)}"]`)).toHaveCount(1);
  }
  const response = await request.get("/halaman-tidak-ada");
  expect(response.status()).toBe(404);
  const placeholder = await request.get("/documentation");
  expect(await placeholder.text()).toContain('name="robots" content="noindex, follow"');
});
