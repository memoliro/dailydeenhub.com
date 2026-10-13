/* DailyDeenHub Ramadan fasting tracker — mark each day fasted/missed,
   make up owed fasts. Same logic as the Qadha tracker.
   Marks in localStorage "ddh-ramadan" as {"1448-9-12": "fasted"|"missed"|"madeup"}.
   Activity in "ddh-ramadan-log" as [{k, d, ts}]. */
let ramadanHijriYear = null;
function fastDayKey(day) { return ramadanHijriYear + "-9-" + day; }
function getFastMarks() {
  try { return JSON.parse(localStorage.getItem("ddh-ramadan") || "{}"); } catch { return {}; }
}
function saveFastMarks(m) {
  try { localStorage.setItem("ddh-ramadan", JSON.stringify(m)); } catch {}
}
function getFastLog() {
  try { return JSON.parse(localStorage.getItem("ddh-ramadan-log") || "[]"); } catch { return []; }
}
function saveFastLog(l) {
  try { localStorage.setItem("ddh-ramadan-log", JSON.stringify(l.slice(-60))); } catch {}
}
function logFast(day, action) {
  const l = getFastLog();
  l.push({ k: fastDayKey(day), d: day, a: action, ts: Date.now() });
  saveFastLog(l);
}
function setFastMark(day, status) {
  const m = getFastMarks();
  const k = fastDayKey(day);
  if (m[k] === status) delete m[k];       // tap again to unmark
  else { m[k] = status; logFast(day, status); }
  saveFastMarks(m);
  renderRamadanFasts();
}
function fastCounts() {
  const m = getFastMarks();
  let fasted = 0, missed = 0, madeup = 0;
  for (let d = 1; d <= 30; d++) {
    const s = m[fastDayKey(d)];
    if (s === "fasted") fasted++;
    else if (s === "missed") missed++;
    else if (s === "madeup") madeup++;
  }
  return { fasted, missed, madeup };
}
function fastDayLabel(d) {
  // d = 1..30 -> "Day 12 · Wed, Feb 25"
  const e = (typeof ramadan !== "undefined" && ramadan[d - 1]) || null;
  let g = "";
  if (e && e.date && e.date.gregorian) {
    const gd = e.date.gregorian;
    const wd = localWeekday(gd.weekday.en, true);
    g = `${wd}, ${localMonth(gd.month.en)} ${gd.day}`;
  }
  return `${t("fastDay")} ${d}` + (g ? ` · ${g}` : "");
}
function renderRamadanFasts() {
  const box = document.getElementById("ramadanFasts");
  if (!box) return;
  if (!ramadan.length) {
    box.innerHTML = `<p class="note">${escapeHtml(t("loading"))}…</p>`;
    return;
  }
  const m = getFastMarks();
  const { fasted, missed } = fastCounts();
  const total = ramadan.length || 30;
  let html = `<div class="qadha-total">` +
    (missed === 0
      ? `<span class="qadha-zero">🎉 ${escapeHtml(t("fastCaughtUp"))}</span>`
      : `<span class="qadha-num">${missed}</span><span class="qadha-lbl">${escapeHtml(t("fastOwed"))}</span>`) +
    `<div class="fast-progress">${fasted} / ${total} ${escapeHtml(t("fastProgress"))}</div></div>`;
  html += `<div class="qadha-list">`;
  for (let d = 1; d <= total; d++) {
    const s = m[fastDayKey(d)] || null;
    const cls = s === "missed" ? " owes" : (s ? " done-mark" : "");
    html += `<div class="qadha-row${cls}">` +
      `<div class="qadha-top"><span class="qadha-name">${escapeHtml(fastDayLabel(d))}</span>` +
      (s === "fasted" ? `<span class="fast-badge">✓</span>`
        : s === "missed" ? `<span class="fast-badge miss">+</span>`
        : s === "madeup" ? `<span class="fast-badge">✓✓</span>` : "") +
      `</div><div class="qadha-actions">`;
    if (!s) {
      html += `<button class="qbtn done" data-fd="${d}" data-fs="fasted" type="button">✓ ${escapeHtml(t("fastFasted"))}</button>` +
        `<button class="qbtn miss" data-fd="${d}" data-fs="missed" type="button">+ ${escapeHtml(t("fastMissed"))}</button>`;
    } else if (s === "fasted") {
      html += `<button class="qbtn done" data-fd="${d}" data-fs="fasted" type="button">✓ ${escapeHtml(t("fastFasted"))}</button>`;
    } else if (s === "missed") {
      html += `<button class="qbtn miss" data-fd="${d}" data-fs="missed" type="button">+ ${escapeHtml(t("fastMissed"))}</button>` +
        `<button class="qbtn done" data-fd="${d}" data-fs="madeup" type="button">✓ ${escapeHtml(t("fastMadeUp"))}</button>`;
    } else { // madeup
      html += `<button class="qbtn done" data-fd="${d}" data-fs="madeup" type="button">✓ ${escapeHtml(t("fastMadeUp"))}</button>`;
    }
    html += `</div></div>`;
  }
  html += `</div>`;
  // recent activity
  const l = getFastLog().slice(-8).reverse();
  if (l.length) {
    const actName = { fasted: t("fastFastedLog"), missed: t("fastMissedLog"), madeup: t("fastMadeUpLog") };
    html += `<h4 class="qadha-recent-h">${escapeHtml(t("fastRecent"))}</h4>` +
      l.map(e => `<div class="qadha-logrow"><span class="qadha-logtx">${e.a === "missed" ? "+" : "✓"} ` +
        `${escapeHtml(t("fastDay"))} ${e.d} <i>${escapeHtml(actName[e.a] || "")}</i></span>` +
        `<span class="qadha-ts">${escapeHtml(typeof qadhaTimeAgo === "function" ? qadhaTimeAgo(e.ts) : "")}</span></div>`).join("");
  }
  box.innerHTML = html;
  box.querySelectorAll("[data-fd]").forEach(b => {
    b.onclick = () => setFastMark(+b.dataset.fd, b.dataset.fs);
  });
}
