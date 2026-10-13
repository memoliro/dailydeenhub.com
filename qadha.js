/* DailyDeenHub Qadha prayers — log missed prayers, mark them as you make them up.
   Stored in localStorage "ddh-qadha" as {Fajr: n, Dhuhr: n, ...}. */
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
function qadhaBump(key, d) {
  const q = getQadha();
  q[key] = Math.max(0, (q[key] || 0) + d);
  saveQadha(q);
  renderQadha();
}
function qadhaMissDay() {
  const q = getQadha();
  QADHA_PRAYERS.forEach(p => { q[p.key] = (q[p.key] || 0) + 1; });
  saveQadha(q);
  renderQadha();
}
function qadhaTotal() {
  const q = getQadha();
  return QADHA_PRAYERS.reduce((s, p) => s + (q[p.key] || 0), 0);
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
      "<span class=\"qadha-name\">" + escapeHtml(qadhaName(p.key)) +
      " <i>" + p.rakats + " " + escapeHtml(t("qadhaRakats")) + "</i></span>" +
      "<span class=\"qadha-count\">" + n + "</span>" +
      "<button class=\"qbtn\" data-qa=\"" + p.key + "\" data-d=\"-1\" type=\"button\" " +
      (n === 0 ? "disabled" : "") + " aria-label=\"" + escapeHtml(t("qadhaMadeUp")) + "\">✓</button>" +
      "<button class=\"qbtn miss\" data-qa=\"" + p.key + "\" data-d=\"1\" type=\"button\" " +
      "aria-label=\"" + escapeHtml(t("qadhaMissed")) + "\">+</button>" +
      "</div>";
  }).join("");
  box.querySelectorAll("[data-qa]").forEach(b => {
    b.onclick = () => qadhaBump(b.dataset.qa, +b.dataset.d);
  });
  const md = document.getElementById("qadhaMissDay");
  if (md) md.onclick = qadhaMissDay;
}
