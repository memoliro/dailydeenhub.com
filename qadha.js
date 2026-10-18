/* DailyDeenHub Qadha prayers — log missed prayers, mark them as you make them up.
   Counts in localStorage "ddh-qadha" as {Fajr: n, ...};
   recent activity in "ddh-qadha-log" as [{k, d, ts}]. */
const QADHA_PRAYERS = [
  { key: "Fajr", rakats: 2 },
  { key: "Dhuhr", rakats: 4 },
  { key: "Asr", rakats: 4 },
  { key: "Maghrib", rakats: 3 },
  { key: "Isha", rakats: 4 },
  { key: "Witr", rakats: 3 }
];
function qadhaName(key) {
  // direct lookup — not nameOf(), which swaps Dhuhr for Jumu'ah on Fridays
  // (a missed Jumu'ah is made up as Dhuhr, so the name stays Dhuhr here)
  return (I18N[state.lang] && I18N[state.lang].names[key]) || key;
}
function getQadha() {
  try { return JSON.parse(localStorage.getItem("ddh-qadha") || "{}"); } catch { return {}; }
}
function saveQadha(q) {
  try { localStorage.setItem("ddh-qadha", JSON.stringify(q)); } catch {}
}
function getQadhaLog() {
  try { return JSON.parse(localStorage.getItem("ddh-qadha-log") || "[]"); } catch { return []; }
}
function saveQadhaLog(l) {
  try { localStorage.setItem("ddh-qadha-log", JSON.stringify(l.slice(-60))); } catch {}
}
function logQadha(key, d) {
  const l = getQadhaLog();
  l.push({ k: key, d: d, ts: Date.now() });
  saveQadhaLog(l);
}
function qadhaBump(key, d) {
  const q = getQadha();
  const before = q[key] || 0;
  q[key] = Math.max(0, before + d);
  if (q[key] === before) return; // no-op (e.g. ✓ at zero) — don't log it
  saveQadha(q);
  logQadha(key, d);
  renderQadha();
}
function qadhaMissDay() {
  const q = getQadha();
  QADHA_PRAYERS.forEach(p => { q[p.key] = (q[p.key] || 0) + 1; });
  saveQadha(q);
  logQadha("DAY", QADHA_PRAYERS.length);
  renderQadha();
}
function qadhaTotal() {
  const q = getQadha();
  return QADHA_PRAYERS.reduce((s, p) => s + (q[p.key] || 0), 0);
}
function qadhaTimeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 90) return t("qadhaNow");
  const m = Math.floor(s / 60);
  if (m < 60) return m + " " + t("qadhaMinAgo");
  const h = Math.floor(m / 60);
  if (h < 24) return h + " " + t("qadhaHrsAgo");
  return Math.floor(h / 24) + " " + t("qadhaDaysAgo");
}
function renderQadha() {
  const box = document.getElementById("qadhaList");
  if (!box) return;
  const q = getQadha();
  const total = qadhaTotal();
  const totalEl = document.getElementById("qadhaTotal");
  if (totalEl) {
    totalEl.innerHTML = total === 0
      ? "<span class=\"qadha-zero\">🎉 " + escapeHtml(t("qadhaCaughtUp")) + "</span>"
      : "<span class=\"qadha-num\">" + total + "</span><span class=\"qadha-lbl\">" + escapeHtml(t("qadhaOwed")) + "</span>";
  }
  box.innerHTML = QADHA_PRAYERS.map(p => {
    const n = q[p.key] || 0;
    return "<div class=\"qadha-row" + (n > 0 ? " owes" : "") + "\">" +
      "<div class=\"qadha-top\"><span class=\"qadha-name\">" + escapeHtml(qadhaName(p.key)) +
      " <i>" + p.rakats + " " + escapeHtml(t("qadhaRakats")) + "</i></span>" +
      "<span class=\"qadha-count\">" + n + "</span></div>" +
      "<div class=\"qadha-actions\">" +
      "<button class=\"qbtn done\" data-qa=\"" + p.key + "\" data-d=\"-1\" type=\"button\"" +
      (n === 0 ? " disabled" : "") + ">✓ " + escapeHtml(t("qadhaMadeUp")) + "</button>" +
      "<button class=\"qbtn miss\" data-qa=\"" + p.key + "\" data-d=\"1\" type=\"button\">+ " +
      escapeHtml(t("qadhaMissed")) + "</button>" +
      "</div></div>";
  }).join("");
  box.querySelectorAll("[data-qa]").forEach(b => {
    b.onclick = () => qadhaBump(b.dataset.qa, +b.dataset.d);
  });
  const md = document.getElementById("qadhaMissDay");
  if (md) md.onclick = qadhaMissDay;
  renderQadhaCalc();
  renderQadhaRecent();
}
/* Qadha auto-estimate: date-based ("missed since") or manual day count.
   Adds N days x 6 prayers to the per-prayer counts (one-time seed). */
function renderQadhaCalc() {
  const box = document.getElementById("qadhaCalc");
  if (!box) return;
  box.innerHTML =
    "<h4 class=\"qadha-calc-h\">" + escapeHtml(t("qadhaCalcTitle")) + "</h4>" +
    "<div class=\"qadha-calc-row\"><label>" + escapeHtml(t("qadhaCalcSince")) +
    "<input type=\"date\" id=\"qadhaCalcDate\"></label></div>" +
    "<div class=\"qadha-calc-row\"><label>" + escapeHtml(t("qadhaCalcDays")) +
    "<input type=\"number\" id=\"qadhaCalcDays\" min=\"1\" placeholder=\"30\"></label></div>" +
    "<button class=\"primary\" id=\"qadhaCalcGo\" type=\"button\">" +
    escapeHtml(t("qadhaCalcAdd")) + "</button>" +
    "<p class=\"qadha-calc-prev\" id=\"qadhaCalcPrev\"></p>";
  const go = document.getElementById("qadhaCalcGo");
  go.onclick = () => {
    const prev = document.getElementById("qadhaCalcPrev");
    let days = 0;
    const dateVal = document.getElementById("qadhaCalcDate").value;
    const daysVal = parseInt(document.getElementById("qadhaCalcDays").value, 10);
    if (dateVal) {
      const d0 = new Date(dateVal + "T12:00:00"), now = new Date();
      days = Math.floor((now - d0) / 86400000);
    } else if (daysVal > 0) {
      days = daysVal;
    }
    if (!(days > 0)) { prev.textContent = t("qadhaCalcNone"); return; }
    const per = days, total = days * QADHA_PRAYERS.length;
    prev.textContent = t("qadhaCalcPrev").replace("{d}", days).replace("{n}", total);
    if (!prev.dataset.armed) {
      prev.dataset.armed = "1";
      go.textContent = t("qadhaCalcConfirm");
      return;
    }
    // confirmed: add to each prayer
    const q = getQadha();
    QADHA_PRAYERS.forEach(p => { q[p.key] = (q[p.key] || 0) + per; });
    saveQadha(q);
    logQadha("EST", total);
    delete prev.dataset.armed;
    go.textContent = t("qadhaCalcAdd");
    document.getElementById("qadhaCalcDate").value = "";
    document.getElementById("qadhaCalcDays").value = "";
    renderQadha();
  };
}
const _qadhaGoRamadan = document.getElementById("qadhaGoRamadan");
if (_qadhaGoRamadan) _qadhaGoRamadan.onclick = () => {
  ramadanSub = "fasts";
  showTab("month");
  if (typeof showRamadan === "function") showRamadan().catch(() => {});
};
function renderQadhaRecent() {
  const el = document.getElementById("qadhaRecent");
  if (!el) return;
  const l = getQadhaLog().slice(-8).reverse();
  if (!l.length) { el.innerHTML = ""; return; }
  el.innerHTML = "<h4 class=\"qadha-recent-h\">" + escapeHtml(t("qadhaRecent")) + "</h4>" +
    l.map(e => {
      const what = e.k === "DAY" ? t("qadhaFullDay") : e.k === "EST" ? t("qadhaCalcEst") : qadhaName(e.k);
      const act = e.d > 0 ? t("qadhaMissedLog") : t("qadhaMadeUpLog");
      const ic = e.d > 0 ? "+" : "✓";
      return "<div class=\"qadha-logrow\"><span class=\"qadha-logtx\">" + ic + " " + escapeHtml(what) +
        " <i>" + escapeHtml(act) + "</i></span><span class=\"qadha-ts\">" +
        escapeHtml(qadhaTimeAgo(e.ts)) + "</span></div>";
    }).join("");
}
