import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  studio,
  treatments,
  gallery,
  businessSchema,
  navigation,
} from "../src/data.js";
test("Contatto unico WhatsApp senza messaggio o parametri", () => {
  assert.equal(studio.whatsapp, "https://wa.me/393450833217");
  const app = readFileSync("src/main.jsx", "utf8");
  assert.ok(!app.includes("wa.me/"));
  assert.ok(!app.includes("<form"));
  assert.ok(!app.includes("<iframe"));
});
test("Solo categorie del brief, senza prezzi né valutazioni inventate", () => {
  assert.deepEqual(
    treatments.map((t) => t.id),
    ["mani", "piedi", "unghie"],
  );
  assert.equal(studio.hours.length, 7);
  assert.equal(businessSchema.openingHoursSpecification.filter(row => row.opens === "00:00" && row.closes === "00:00").length, 2);
  assert.ok(!businessSchema.aggregateRating);
  assert.ok(!businessSchema.openingHours);
  assert.equal(businessSchema.telephone, studio.phone);
});
test("Tutte le immagini e destinazioni interne esistono", () => {
  for (const entry of [...treatments, ...gallery])
    assert.ok(existsSync(`public${entry.image}`), entry.image);
  const app = readFileSync("src/main.jsx", "utf8");
  for (const [, id] of navigation) assert.ok(app.includes(`id="${id}"`), id);
});
