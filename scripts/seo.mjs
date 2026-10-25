import { readFileSync, writeFileSync } from "node:fs";
const raw = process.env.SITE_URL;
if (!raw) {
  writeFileSync("dist/robots.txt", "User-agent: *\nDisallow: /\n");
  console.log(
    "Anteprima: indicizzazione disabilitata. Impostare SITE_URL per sitemap e canonical.",
  );
} else {
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    throw new Error(
      "SITE_URL deve essere un’origine HTTPS pubblica, senza percorso, query o credenziali.",
    );
  const origin = url.origin;
  let html = readFileSync("dist/index.html", "utf8");
  html = html.replace(
    'content="noindex,nofollow"',
    'content="index,follow"',
  );
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${origin}/"/><meta property="og:url" content="${origin}/"/></head>`,
  );
  writeFileSync("dist/index.html", html);
  writeFileSync(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
  writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`,
  );
  console.log("SEO: canonical, robots e sitemap generati per", origin);
}
