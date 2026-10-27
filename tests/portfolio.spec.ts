import { test, expect } from "@playwright/test";

test("the production page renders its content and local assets at the Pages path", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const failedRequests: string[] = [];
  const remoteRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173/"))
      remoteRequests.push(request.url());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Chih Lin Chien",
  );
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: "Career Tracker",
      exact: false,
    }),
  ).toBeVisible();
  for (const id of [
    "career-title",
    "calaware-title",
    "uno-title",
    "vision-title",
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  for (const image of await page.getByRole("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      Array.from(document.fonts).some(
        (font) =>
          font.family.includes("Instrument Serif") && font.status === "loaded",
      ),
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      Array.from(document.fonts).some(
        (font) => font.family.includes("Manrope") && font.status === "loaded",
      ),
    ),
  ).toBe(true);
  await expect(
    page.getByText(/University of Illinois Urbana-Champaign/).first(),
  ).toBeAttached();
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(remoteRequests).toEqual([]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("portfolio.png"),
    fullPage: true,
  });
});

test("navigation, contact, and project links provide real destinations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const section of ["Work", "Research", "About", "Contact"]) {
    await nav.getByRole("link", { name: new RegExp(section) }).click();
    await expect(page).toHaveURL(new RegExp(`#${section.toLowerCase()}$`));
    const heading = page.locator(`#${section.toLowerCase()}-title`);
    await expect(heading).toBeInViewport();
  }
  await expect(page.getByRole("link", { name: /Email me/ })).toHaveAttribute(
    "href",
    "mailto:brianjienop49792399@gmail.com",
  );
  await expect(
    page.getByRole("link", {
      name: "GitHub (opens in a new tab)",
      exact: true,
    }),
  ).toHaveAttribute("href", "https://github.com/brianjien");
  await expect(
    page.getByRole("link", {
      name: "LinkedIn (opens in a new tab)",
      exact: true,
    }),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/chih-lin-chien-517944207/",
  );
  await expect(
    page.getByRole("link", { name: /source on GitHub/ }),
  ).toHaveCount(4);
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute(
      "href",
      /^(https:\/\/|\/brainjien\.github\.io\/documents\/)/,
    );
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: /Back to top/i })
    .click();
  await expect(page).toHaveURL(/#top$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("research notes expand by keyboard and the source documents are available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Research", exact: true })
    .click();
  await expect(page.locator("#research-title")).toBeInViewport();
  await expect(
    page.getByRole("heading", {
      name: "Bias and fairness in LLM résumé screening",
    }),
  ).toBeVisible();

  const details = page.locator(".research-details");
  await details.locator("summary").focus();
  await page.keyboard.press("Space");
  await expect(details).toHaveAttribute("open", "");
  await expect(
    details.getByRole("heading", { name: "Data curation" }),
  ).toBeVisible();
  await expect(
    details.getByRole("heading", { name: "Post-processing" }),
  ).toBeVisible();
  await page.keyboard.press("Space");
  await expect(details).not.toHaveAttribute("open");

  const report = page.getByRole("link", { name: /Read research report/ });
  const href = await report.getAttribute("href");
  expect(href).toMatch(/^\/brainjien\.github\.io\/documents\//);
  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download slides (PPTX)" }).click(),
  ]);
  expect(await download.failure()).toBeNull();
  expect(download.suggestedFilename()).toBe(
    "Chih-Lin-Chien-LLM-Resume-Bias.pptx",
  );
});

test("keyboard navigation and reduced-motion settings are respected", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#contact")).toHaveCSS("opacity", "1");
  const email = page.getByRole("link", { name: /Email me/ });
  await email.focus();
  await expect(email).toBeFocused();
  expect(
    await email.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
});

test("entry and scroll animations finish, and a reduced-motion change reveals all content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  const heading = page.getByRole("heading", { level: 1 });
  expect(
    await heading.evaluate((element) =>
      element
        .getAnimations()
        .some((animation) => animation.playState === "running"),
    ),
  ).toBe(true);
  await expect(heading).toHaveCSS("opacity", "1");

  const project = page.locator(".project-vision");
  await expect(project).toHaveAttribute("data-reveal", "pending");
  await project.scrollIntoViewIfNeeded();
  await expect(project).toHaveAttribute("data-reveal", "visible");
  await expect(project).toHaveCSS("opacity", "1");
  if (await page.evaluate(() => CSS.supports("animation-timeline: scroll()"))) {
    const progress = page.locator(".reading-progress");
    await expect(progress).toBeVisible();
    await expect
      .poll(() =>
        progress.evaluate((element) => element.getBoundingClientRect().width),
      )
      .toBeGreaterThan(0);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0);
  await expect(page.locator(".reading-progress")).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);
});

test("the page fits the viewport without clipping text", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const clipped = await page
    .locator("h1, h2, h3, h4, .project-copy, .contact-links, .about-copy")
    .evaluateAll((elements) =>
      elements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.left < -1 ||
            rect.right > window.innerWidth + 1 ||
            element.scrollWidth > element.clientWidth + 1
          );
        })
        .map((element) => element.textContent?.trim()),
    );
  expect(clipped).toEqual([]);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#contact-title")).toBeInViewport();
});
