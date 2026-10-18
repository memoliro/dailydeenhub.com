/* DailyDeenHub Zikirmatik — dhikr counter.
   Preset dhikrs + Esmaül Hüsna (ebced counts) + user custom dhikrs.
   Tapping a dhikr loads it into the Tasbih tab with its target count.
   Custom dhikrs in localStorage "ddh-zikir-custom" as [{name, count}].
   Active dhikr in "ddh-zikir-active" as {name, target}. */
const ZIKIR_PRESETS = [
  { key: "salavat", count: 99 },
  { key: "laHavle", count: 99 },
  { key: "kelimeTevhid", count: 99 },
  { key: "bismillah", count: 99 },
  { key: "subhanallah", count: 99 },
  { key: "elhamdulillah", count: 99 },
  { key: "allahuEkber", count: 99 },
  { key: "laIlahe", count: 99 },
  { key: "estagfirullah", count: 99 }
];
// HUSNA_EBCED (from husna-ebced.js): [["Allah",66],["Ar-Rahman",298],...]
function getZikirCustom() {
  try { return JSON.parse(localStorage.getItem("ddh-zikir-custom") || "[]"); } catch { return []; }
}
function saveZikirCustom(l) {
  try { localStorage.setItem("ddh-zikir-custom", JSON.stringify(l)); } catch {}
}
function getZikirActive() {
  try { return JSON.parse(localStorage.getItem("ddh-zikir-active") || "null"); } catch { return null; }
}
function setZikirActive(name, target) {
  try { localStorage.setItem("ddh-zikir-active", JSON.stringify({ name, target })); } catch {}
  state.tasbih = 0; state.tasbihLoops = 0;
  try { save(); } catch {}
}
function zikirName(key) {
  // preset keys map to i18n; custom names pass through
  const zk = (I18N[state.lang] && I18N[state.lang].zikirNames) || {};
  return zk[key] || key;
}
function renderZikir() {
  const box = document.getElementById("zikirList");
  if (!box) return;
  const custom = getZikirCustom();
  let h = "";
  // presets
  h += ZIKIR_PRESETS.map(p =>
    `<button type="button" class="zikir-row" data-zk="${p.key}" data-zc="${p.count}">` +
    `<span class="zikir-name">${escapeHtml(zikirName(p.key))}</span>` +
    `<span class="zikir-count">${p.count}</span><span class="zikir-go">›</span></button>`
  ).join("");
  // Esmaül Hüsna entry -> sub-list
  h += `<button type="button" class="zikir-row zikir-husna" id="zikirHusnaGo">` +
    `<span class="zikir-name">${escapeHtml(t("zikirHusna"))}</span>` +
    `<span class="zikir-go">›</span></button>`;
  // Hisnul Muslim duas with counts -> sub-list
  if (typeof HSN_DUAS !== "undefined") {
    h += `<button type="button" class="zikir-row" id="zikirHsnGo">` +
      `<span class="zikir-name">${escapeHtml(t("hisnul"))}</span>` +
      `<span class="zikir-go">›</span></button>`;
  }
  // custom
  if (custom.length) {
    h += `<h4 class="zikir-sep">${escapeHtml(t("zikirMine"))}</h4>`;
    h += custom.map((c, i) =>
      `<button type="button" class="zikir-row" data-zk="${escapeHtml(c.name)}" data-zc="${c.count}" data-zcustom="${i}">` +
      `<span class="zikir-name">${escapeHtml(c.name)}</span>` +
      `<span class="zikir-count">${c.count}</span><span class="zikir-go">›</span></button>`
    ).join("");
  }
  box.innerHTML = h;
  box.querySelectorAll(".zikir-row[data-zk]").forEach(b => {
    b.onclick = () => {
      const name = b.dataset.zcustom !== undefined ? b.dataset.zk : zikirName(b.dataset.zk);
      startZikir(name, +b.dataset.zc);
    };
  });
  const hg = document.getElementById("zikirHusnaGo");
  if (hg) hg.onclick = renderZikirHusna;
  const hsnGo = document.getElementById("zikirHsnGo");
  if (hsnGo) hsnGo.onclick = renderZikirHsn;
  const addBtn = document.getElementById("zikirAddBtn");
  if (addBtn) addBtn.onclick = () => document.getElementById("zikirForm").classList.toggle("hidden");
  const saveBtn = document.getElementById("zikirSave");
  if (saveBtn) saveBtn.onclick = saveZikirCustomForm;
}
function renderZikirHusna() {
  const box = document.getElementById("zikirList");
  if (!box || typeof HUSNA_EBCED === "undefined") return;
  let h = `<button type="button" class="zikir-back" id="zikirBack">‹ ${escapeHtml(t("zikirBack"))}</button>`;
  h += HUSNA_EBCED.map(([name, count]) => {
    const disp = zikirHusnaName(name);
    return `<button type="button" class="zikir-row" data-zk="${escapeHtml(disp)}" data-zc="${count}">` +
      `<span class="zikir-name">${escapeHtml(disp)}</span>` +
      `<span class="zikir-count">${count}</span><span class="zikir-go">›</span></button>`;
  }).join("");
  box.innerHTML = h;
  box.querySelectorAll(".zikir-row[data-zk]").forEach(b => {
    b.onclick = () => startZikir(b.dataset.zk, +b.dataset.zc);
  });
  document.getElementById("zikirBack").onclick = renderZikir;
}
function zikirHusnaName(key) {
  // "Ar-Rahman" -> localized display; fall back to key
  const zk = (I18N[state.lang] && I18N[state.lang].husnaNames) || {};
  return zk[key] || key;
}
/* Hisnul Muslim duas that carry a repetition count -> zikir list */
function zikirHsnEntries() {
  const out = [];
  if (typeof HSN_DUAS === "undefined") return out;
  Object.values(HSN_DUAS).forEach(cat => {
    if (!Array.isArray(cat)) return;
    cat.forEach(d => {
      const m = String(d.rep || "").match(/^(\d+)x/);
      if (!m) return;
      const n = +m[1];
      if (!(n > 1)) return;
      // short label: transliteration if present, else first words of translation
      const label = d.tn || (d[state.lang] || d.en || "").split(/[.\u2026]/)[0].slice(0, 60);
      out.push({ label, count: n, ar: d.ar });
    });
  });
  return out;
}
function renderZikirHsn() {
  const box = document.getElementById("zikirList");
  if (!box) return;
  const entries = zikirHsnEntries();
  let h = `<button type="button" class="zikir-back" id="zikirBack">‹ ${escapeHtml(t("zikirBack"))}</button>`;
  h += entries.map((e, i) =>
    `<button type="button" class="zikir-row" data-zh="${i}">` +
    `<span class="zikir-name">${escapeHtml(e.label)}</span>` +
    `<span class="zikir-count">${e.count}</span><span class="zikir-go">›</span></button>`
  ).join("");
  box.innerHTML = h;
  box.querySelectorAll(".zikir-row[data-zh]").forEach(b => {
    b.onclick = () => {
      const e = entries[+b.dataset.zh];
      startZikir(e.label, e.count);
    };
  });
  document.getElementById("zikirBack").onclick = renderZikir;
}
function saveZikirCustomForm() {
  const nameEl = document.getElementById("zikirName");
  const countEl = document.getElementById("zikirCount");
  const name = (nameEl.value || "").trim();
  const count = parseInt(countEl.value, 10);
  if (!name || !(count > 0)) return;
  const custom = getZikirCustom();
  custom.push({ name, count });
  saveZikirCustom(custom);
  nameEl.value = ""; countEl.value = "";
  document.getElementById("zikirForm").classList.add("hidden");
  renderZikir();
}
function startZikir(name, target) {
  setZikirActive(name, target);
  // show the dhikr name on the tasbih
  const tp = document.getElementById("tasbihPhrase");
  if (tp) tp.textContent = name;
  const bp = document.getElementById("beadPhrase");
  if (bp) bp.textContent = name;
  renderTasbihTarget();
  showTab("quiet");
}
function renderTasbihTarget() {
  const z = getZikirActive();
  const el = document.getElementById("tasbihTarget");
  if (el) el.textContent = z ? ` / ${z.target}` : "";
  const bc = document.getElementById("beadTarget");
  if (bc && z) bc.textContent = ` / ${z.target}`;
  if (z) {
    const tp = document.getElementById("tasbihPhrase");
    if (tp && !tp.dataset.zk) tp.textContent = z.name;
  }
}
