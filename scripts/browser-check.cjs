const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  const assetFailures = [];
  const testUrl = process.env.TEST_URL || "http://127.0.0.1:5173/";
  page.on("response", (response) => {
    if (
      response.url().startsWith(new URL(testUrl).origin) &&
      response.status() >= 400
    ) {
      assetFailures.push({ url: response.url(), status: response.status() });
    }
  });
  const mapRequests = [];
  page.on("request", (request) => {
    if (new URL(request.url()).hostname === "www.google.com")
      mapRequests.push(request.url());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:5173/");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.ok(
    await page.evaluate(
      () =>
        document.fonts.check('400 16px "Cormorant Garamond"') &&
        document.fonts.check('400 16px "Manrope Variable"'),
    ),
  );
  assert.ok(
    await page
      .locator("h1")
      .evaluate((el) =>
        getComputedStyle(el).fontFamily.includes("Cormorant Garamond"),
      ),
  );
  assert.equal(await page.locator("main section[id]").count(), 7);
  assert.equal(await page.locator("#trattamenti article").count(), 6);
  for (const title of [
    "Pedicure & Manicure",
    "Ceretta & Pasta di zucchero",
    "Laminazione ciglia",
    "Massaggio Viso & Corpo",
    "Trattamenti Viso & Corpo",
    "Pressomassaggio",
  ]) {
    assert.equal(
      await page.getByRole("heading", { name: title, exact: true }).count(),
      1,
    );
  }
  assert.equal(await page.locator("#recensioni .review-card").count(), 3);
  for (const author of ["Mariagrazia P.", "Sara V.", "Gaia M."]) {
    assert.equal(
      await page
        .locator("#recensioni cite")
        .filter({ hasText: author })
        .count(),
      1,
    );
  }
  assert.equal(
    await page.locator('#recensioni [aria-label="5 stelle su 5"]').count(),
    3,
  );
  const logos = page.locator(".brand-official-logo");
  assert.equal(await logos.count(), 2);
  await logos.first().evaluate((img) => img.decode());
  assert.ok(
    await logos.evaluateAll((images) =>
      images.every((img) => img.complete && img.naturalWidth === 150),
    ),
  );
  assert.equal(
    await page.locator('link[rel="icon"]').getAttribute("href"),
    new URL("images/logo.jpg", process.env.TEST_URL || "http://127.0.0.1:5173/")
      .pathname,
  );
  assert.equal(
    await page
      .locator('a[href^="https://wa.me/"]')
      .evaluateAll((links) =>
        links.every((a) => a.href === "https://wa.me/393450833217"),
      ),
    true,
  );
  // Google resta disattivato all'apertura. Il test isola il fornitore esterno:
  // verifica richiesta, destinazione e controlli; non simula una verifica della cartografia.
  assert.equal(await page.locator(".map-shell iframe").count(), 0);
  assert.equal(mapRequests.length, 0);
  await page.route("https://www.google.com/maps?*", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: '<!doctype html><html lang="it"><title>Servizio esterno isolato nel test</title><body>Risposta del fornitore sostituita nel test.</body></html>',
    }),
  );
  const mapRequest = page.waitForRequest((request) =>
    request.url().startsWith("https://www.google.com/maps?"),
  );
  await page
    .getByRole("button", { name: "Mostra mappa Google", exact: true })
    .click();
  const requestedUrl = new URL((await mapRequest).url());
  assert.equal(
    requestedUrl.searchParams.get("q"),
    "Via Edoardo Daneo 20/C, 10135 Torino TO",
  );
  assert.equal(requestedUrl.searchParams.get("output"), "embed");
  assert.equal(await page.locator(".map-shell iframe").count(), 1);
  const directions = new URL(
    await page.locator(".location-card .directions").getAttribute("href"),
  );
  assert.equal(
    directions.searchParams.get("destination"),
    "Via Edoardo Daneo 20/C, 10135 Torino TO",
  );
  await page
    .getByRole("button", { name: "Nascondi mappa", exact: true })
    .click();
  assert.equal(await page.locator(".map-shell iframe").count(), 0);
  await page.waitForFunction(() =>
    document.activeElement?.textContent.includes("Mostra mappa Google"),
  );
  console.log(
    "PASS: mappa su richiesta, indirizzo e indicazioni corretti, rimozione iframe e ripristino focus (fornitore isolato).",
  );
  await page.getByRole("button", { name: /Ingrandisci: Gli spazi/ }).click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("ArrowRight");
  assert.ok(
    await page
      .getByRole("dialog")
      .innerText()
      .then((t) => t.includes("La cura dei dettagli")),
  );
  await page.keyboard.press("ArrowLeft");
  assert.ok(
    await page
      .getByRole("dialog")
      .innerText()
      .then((t) => t.includes("Gli spazi del centro")),
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert.equal(
    await page
      .getByRole("button", { name: /Ingrandisci: Gli spazi/ })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page
    .getByRole("button", { name: "Come posso contattare il centro?" })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Come posso contattare il centro?" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.getByRole("button", { name: "Privacy", exact: true }).click();
  assert.ok(
    await page
      .getByRole("dialog")
      .innerText()
      .then((t) => t.includes("Bozza informativa")),
  );
  await page.keyboard.press("Escape");
  await page.evaluate(() => {
    document.activeElement?.blur();
    scrollTo(0, 0);
  });
  await page.screenshot({ path: "/tmp/twinsun-desktop.png", fullPage: true });
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  console.log(
    "Desktop accessibility violations:",
    JSON.stringify(
      a11y.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
  for (const width of [320, 360, 375, 390, 414, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      `horizontal overflow at ${width}`,
    );
  }
  await page.setViewportSize({ width: 320, height: 720 });
  assert.ok(
    await page
      .locator("h1")
      .evaluate((el) => el.getBoundingClientRect().height < 200),
    "Titolo leggibile su telefono stretto",
  );
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto(testUrl);
  await page.getByRole("button", { name: "Apri menu" }).click();
  const menuRect = await page.locator("nav").boundingBox();
  assert.ok(
    menuRect.y + menuRect.height <= 391,
    "Menu contenuto nel viewport landscape",
  );
  assert.equal(
    await page.locator(".floating-wa").isVisible(),
    false,
    "Pulsante flottante nascosto nel menu",
  );
  const menuCta = page.locator("nav .nav-cta");
  await menuCta.scrollIntoViewIfNeeded();
  const ctaRect = await menuCta.boundingBox();
  assert.ok(
    ctaRect.y >= menuRect.y - 1 && ctaRect.y + ctaRect.height <= 391,
    "CTA menu raggiungibile interamente",
  );
  await page.getByRole("button", { name: "Chiudi menu" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Apri menu" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Chiudi menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page
    .locator("nav")
    .getByRole("link", { name: "Trattamenti", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Apri menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "Apri menu" }).click();
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Apri menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.evaluate(() => {
    document.activeElement?.blur();
    scrollTo(0, 0);
  });
  await page.screenshot({ path: "/tmp/twinsun-mobile.png", fullPage: true });
  assert.ok(
    (await page.locator(".contact-copy>p:not(.eyebrow)").innerText())
      .replace(/\s+/g, " ")
      .includes("tuo? Scrivici"),
  );
  assert.ok(
    (await page.locator(".review-intro>p:not(.eyebrow)").innerText())
      .replace(/\s+/g, " ")
      .includes("dettagli. Il centro"),
  );
  const hoursRight = await page
    .locator(".opening-hours dl")
    .evaluate((el) => el.getBoundingClientRect().right);
  const floatingLeft = await page
    .locator(".floating-wa")
    .evaluate((el) => el.getBoundingClientRect().left);
  assert.ok(
    hoursRight < floatingLeft,
    "Orari fuori dallo spazio del pulsante flottante",
  );
  const mobileA11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  console.log(
    "Mobile accessibility violations:",
    JSON.stringify(
      mobileA11y.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
  assert.deepEqual(errors, []);
  assert.equal(a11y.violations.length, 0);
  assert.equal(mobileA11y.violations.length, 0);
  console.log(
    "PASS: gallery, modal Escape, FAQ, privacy, mobile navigation, WhatsApp, 8 responsive widths and landscape menu, browser console, axe desktop/mobile.",
  );
  // Verifica gli effetti reali e il cambio di preferenza senza ricaricare il sito.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.notEqual(
    await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  for (const card of [
    page.locator(".treatment").first(),
    page.locator(".treatment").last(),
  ]) {
    await card.scrollIntoViewIfNeeded();
    await card.evaluate(
      (el) =>
        new Promise((resolve, reject) => {
          const started = performance.now();
          const check = () => {
            if (getComputedStyle(el).opacity === "1") return resolve();
            if (performance.now() - started > 5000)
              return reject(new Error("Scheda rimasta nascosta"));
            requestAnimationFrame(check);
          };
          check();
        }),
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".reveal")].every(
      (el) => getComputedStyle(el).opacity === "1",
    ),
  );
  assert.equal(
    await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  assert.equal(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
    0,
  );
  // In assenza dell'osservatore, ogni sezione deve restare leggibile.
  await page.addInitScript(() => {
    delete window.IntersectionObserver;
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.ok(
    await page
      .locator(".reveal")
      .evaluateAll((els) =>
        els.every((el) => getComputedStyle(el).opacity === "1"),
      ),
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: animazioni attive, comparsa delle schede, cambio live a movimento ridotto, fallback senza IntersectionObserver.",
  );
  assert.deepEqual(assetFailures, [], "Nessuna risorsa locale con errore HTTP");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
