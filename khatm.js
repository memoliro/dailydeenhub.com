/* DailyDeenHub Khatm tracker — Juz-by-Juz Quran completion tracking.
   Multiple named khatms, progress persisted in localStorage (ddh-khatms). */
const JUZ_NAMES = ["\u0627\u0644\u0645", "\u0633\u064a\u0642\u0648\u0644", "\u062a\u0644\u0643 \u0627\u0644\u0631\u0633\u0644", "\u0644\u0646 \u062a\u0646\u0627\u0644\u0648\u0627", "\u0648\u0627\u0644\u0645\u062d\u0635\u0646\u0627\u062a", "\u0644\u0627 \u064a\u062d\u0628 \u0627\u0644\u0644\u0647", "\u0648\u0625\u0630\u0627 \u0633\u0645\u0639\u0648\u0627", "\u0648\u0644\u0648 \u0623\u0646\u0646\u0627", "\u0642\u0627\u0644 \u0627\u0644\u0645\u0644\u0623", "\u0648\u0627\u0639\u0644\u0645\u0648\u0627", "\u064a\u0639\u062a\u0630\u0631\u0648\u0646", "\u0648\u0645\u0627 \u0645\u0646 \u062f\u0627\u0628\u0629", "\u0648\u0645\u0627 \u0623\u0628\u0631\u0626", "\u0631\u0628\u0645\u0627", "\u0633\u0628\u062d\u0627\u0646 \u0627\u0644\u0630\u064a", "\u0642\u0627\u0644 \u0623\u0644\u0645", "\u0627\u0642\u062a\u0631\u0628 \u0644\u0644\u0646\u0627\u0633", "\u0642\u062f \u0623\u0641\u0644\u062d", "\u0648\u0642\u0627\u0644 \u0627\u0644\u0630\u064a\u0646", "\u0623\u0645\u0646 \u062e\u0644\u0642", "\u0627\u062a\u0644 \u0645\u0627 \u0623\u0648\u062d\u064a", "\u0648\u0645\u0646 \u064a\u0642\u0646\u062a", "\u0648\u0645\u0627 \u0644\u064a", "\u0641\u0645\u0646 \u0623\u0638\u0644\u0645", "\u0625\u0644\u064a\u0647 \u064a\u0631\u062f", "\u062d\u0645", "\u0642\u0627\u0644 \u0641\u0645\u0627 \u062e\u0637\u0628\u0643\u0645", "\u0642\u062f \u0633\u0645\u0639 \u0627\u0644\u0644\u0647", "\u062a\u0628\u0627\u0631\u0643 \u0627\u0644\u0630\u064a", "\u0639\u0645"];
let khatmActive = 0;

function getKhatms() {
  try {
    const k = JSON.parse(localStorage.getItem("ddh-khatms") || "[]");
    return Array.isArray(k) ? k : [];
  } catch (e) { return []; }
}
function saveKhatms(k) {
  try { localStorage.setItem("ddh-khatms", JSON.stringify(k)); } catch (e) {}
}
function ensureKhatms() {
  let k = getKhatms();
  if (!k.length) {
    k = [{ name: t("khatmDefault"), done: {}, created: Date.now() }];
    saveKhatms(k);
  }
  return k;
}
function renderKhatm() {
  const tabsEl = document.getElementById("khatmTabs");
  const progEl = document.getElementById("khatmProg");
  const gridEl = document.getElementById("khatmGrid");
  if (!tabsEl || !progEl || !gridEl) return;
  const khatms = ensureKhatms();
  if (khatmActive >= khatms.length) khatmActive = 0;
  const k = khatms[khatmActive];
  if (!k.done) k.done = {};
  // tabs
  tabsEl.innerHTML = khatms.map((x, i) =>
    `<button type="button" data-ki="${i}" class="khatm-tab${i === khatmActive ? " on" : ""}">${esc(x.name || ("#" + (i + 1)))}</button>`
  ).join("");
  tabsEl.querySelectorAll("[data-ki]").forEach(b => b.onclick = () => { khatmActive = +b.dataset.ki; renderKhatm(); });
  // progress
  const doneCount = Object.keys(k.done).filter(j => k.done[j]).length;
  const pct = Math.round(doneCount / 30 * 100);
  progEl.innerHTML = `<div class="khatm-bar"><div class="khatm-fill" style="width:${pct}%"></div></div>` +
    `<div class="khatm-count">${doneCount} / 30 &middot; ${pct}%</div>` +
    (doneCount === 30 ? `<div class="khatm-done">${esc(t("khatmDone"))}</div>` : "");
  // grid
  gridEl.innerHTML = JUZ_NAMES.map((nm, i) => {
    const j = i + 1, on = !!k.done[j];
    return `<button type="button" data-jz="${j}" class="khatm-jz${on ? " on" : ""}"><span class="kj-n">${j}</span><span class="kj-ar" dir="rtl" lang="ar">${nm}</span><span class="kj-t">${esc(t("khatmJuz"))}</span></button>`;
  }).join("");
  gridEl.querySelectorAll("[data-jz]").forEach(b => b.onclick = () => {
    const j = b.dataset.jz, ks = getKhatms(), cur = ks[khatmActive];
    if (!cur.done) cur.done = {};
    cur.done[j] = !cur.done[j];
    if (!cur.done[j]) delete cur.done[j];
    saveKhatms(ks);
    renderKhatm();
  });
  // new khatm
  const newBtn = document.getElementById("khatmNew");
  const wrap = document.getElementById("khatmNewWrap");
  const nameIn = document.getElementById("khatmNameIn");
  const goBtn = document.getElementById("khatmNameGo");
  if (nameIn) nameIn.placeholder = t("khatmNamePh");
  if (newBtn && !newBtn.dataset.bound) {
    newBtn.dataset.bound = "1";
    newBtn.onclick = () => { wrap.classList.remove("hidden"); nameIn.focus(); };
  }
  if (goBtn && !goBtn.dataset.bound) {
    goBtn.dataset.bound = "1";
    const commit = () => {
      const nm = (nameIn.value || "").trim() || t("khatmDefault");
      const ks = getKhatms();
      ks.push({ name: nm, done: {}, created: Date.now() });
      saveKhatms(ks);
      khatmActive = ks.length - 1;
      nameIn.value = "";
      wrap.classList.add("hidden");
      renderKhatm();
    };
    goBtn.onclick = commit;
    nameIn.onkeydown = e => { if (e.key === "Enter") commit(); };
  }
  // delete
  const delBtn = document.getElementById("khatmDel");
  if (delBtn && !delBtn.dataset.bound) {
    delBtn.dataset.bound = "1";
    delBtn.onclick = () => {
      if (!confirm(t("khatmDelConfirm"))) return;
      const ks = getKhatms();
      ks.splice(khatmActive, 1);
      saveKhatms(ks);
      khatmActive = 0;
      renderKhatm();
    };
  }
}
