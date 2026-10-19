#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Learn Center expansion: pillars hub + 6 new articles (EN/TR/FR) + cross-links."""
import re, sys

P = "/home/hatch/workspace/dailydeenhub/learn.js"
s = open(P, encoding="utf-8").read()
orig_len = len(s)

def replace_article(src, art_id, new_text, lang_hint=None):
    """Replace the whole { id: "art_id", ... ] }, block. If lang_hint given, only
    replace the occurrence within that language section."""
    # find all occurrences of the article start
    pat = re.compile(r'\{ id: "' + art_id + r'"')
    matches = list(pat.finditer(src))
    if lang_hint:
        # restrict to the language section: en: [ ... tr: [ ... fr: [ ...
        secs = {}
        for lg in ("en", "tr", "fr"):
            m = re.search(r'^' + lg + r': \[', src, re.M)
            secs[lg] = m.start()
        order = ["en", "tr", "fr"]
        i = order.index(lang_hint)
        lo = secs[order[i]]
        hi = secs[order[i + 1]] if i + 1 < 3 else len(src)
        matches = [m for m in matches if lo <= m.start() < hi]
    assert len(matches) == 1, f"expected 1 match for {art_id}/{lang_hint}, got {len(matches)}"
    m = matches[0]
    # find the closing "] }" of the article object (comma handled by caller text)
    end = src.find("\n] }", m.start())
    assert end != -1, f"no closing found for {art_id}/{lang_hint}"
    end += len("\n] }")
    # consume a trailing comma if present; new_text must supply its own
    if src[end] == ",":
        end += 1
    return src[:m.start()] + new_text + src[end:]

def insert_after_article(src, art_id, new_text, lang_hint):
    pat = re.compile(r'\{ id: "' + art_id + r'"')
    matches = list(pat.finditer(src))
    secs = {}
    for lg in ("en", "tr", "fr"):
        m = re.search(r'^' + lg + r': \[', src, re.M)
        secs[lg] = m.start()
    order = ["en", "tr", "fr"]
    i = order.index(lang_hint)
    lo = secs[order[i]]
    hi = secs[order[i + 1]] if i + 1 < 3 else len(src)
    matches = [m for m in matches if lo <= m.start() < hi]
    assert len(matches) == 1
    m = matches[0]
    end = src.find("\n] }", m.start())
    assert end != -1
    end += len("\n] }")
    # new_text is a complete ",\n{...}" insertion incl. its own trailing comma
    return src[:end] + new_text + src[end:]

def append_link_to_article(src, art_id, link_block, lang_hint):
    """Insert a link block just before the closing ']' of the article body."""
    pat = re.compile(r'\{ id: "' + art_id + r'"')
    matches = list(pat.finditer(src))
    secs = {}
    for lg in ("en", "tr", "fr"):
        m = re.search(r'^' + lg + r': \[', src, re.M)
        secs[lg] = m.start()
    order = ["en", "tr", "fr"]
    i = order.index(lang_hint)
    lo = secs[order[i]]
    hi = secs[order[i + 1]] if i + 1 < 3 else len(src)
    matches = [m for m in matches if lo <= m.start() < hi]
    assert len(matches) == 1
    m = matches[0]
    end = src.find("\n] }", m.start())
    assert end != -1
    # insert the link block before the body's closing "]"
    return src[:end] + ",\n" + link_block + src[end:]

# ---------------------------------------------------------------- pillars hub
PILLARS_EN = '''{ id: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "The foundation of the faith — tap a pillar for its detailed guide",
body: [
["p", "The Prophet \\uFDFA said: \\u201CI slam is built upon five: the testimony that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving zakat, fasting Ramadan, and Hajj to the House.\\u201D (Sahih al-Bukhari, Sahih Muslim). Each pillar below opens its own detailed guide \\u2014 with how-tos, virtues, duas and dhikr."],
["link", { to: "shahada", icon: "\\u261D\\uFE0F", title: "1. Shahada \\u2014 The Testimony", desc: "Its meaning, conditions and what it demands" }],
["link", { to: "prayer", icon: "🕌", title: "2. Salah \\u2014 The Five Daily Prayers", desc: "Step-by-step guide, plus the virtues of prayer" }],
["link", { to: "zakat", icon: "🤲", title: "3. Zakat \\u2014 Obligatory Charity", desc: "Nisab, rates, recipients and Zakat al-Fitr" }],
["link", { to: "fasting-virtues", icon: "🌙", title: "4. Sawm \\u2014 Fasting", desc: "The virtues of fasting, plus the Ramadan guide" }],
["link", { to: "hajj-umrah", icon: "🕋", title: "5. Hajj & Umrah \\u2014 The Pilgrimage", desc: "The rites step by step, with duas and dhikr" }]
] },'''

PILLARS_TR = '''{ id: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Dinin temeli — detaylı rehber için bir şarta dokunun",
body: [
["p", "Peygamber Efendimiz \\uFDFA buyurdu: \\u201Cİslam beş esas üzerine kurulmuştur: Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın elçisi olduğuna şahitlik etmek, namazı kılmak, zekâtı vermek, Ramazan orucunu tutmak ve Beytullah'ı haccetmek.\\u201D (Sahih-i Buhari, Sahih-i Müslim). Her şartın altında detaylı rehberi bulacaksınız \\u2014 yapılışı, faziletleri, duaları ve zikirleriyle."],
["link", { to: "shahada", icon: "\\u261D\\uFE0F", title: "1. Kelime-i Şehadet", desc: "Manası, şartları ve gerekleri" }],
["link", { to: "prayer", icon: "🕌", title: "2. Namaz \\u2014 Beş Vakit", desc: "Adım adım kılınışı ve namazın faziletleri" }],
["link", { to: "zakat", icon: "🤲", title: "3. Zekât", desc: "Nisap, oranlar, kimlere verilir ve fitre" }],
["link", { to: "fasting-virtues", icon: "🌙", title: "4. Oruç", desc: "Orucun faziletleri ve Ramazan rehberi" }],
["link", { to: "hajj-umrah", icon: "🕋", title: "5. Hac ve Umre", desc: "Adım adım menasik, dualar ve zikirler" }]
] },'''

PILLARS_FR = '''{ id: "pillars", title: "Les cinq piliers de l'islam", desc: "Le fondement de la foi — touchez un pilier pour son guide détaillé",
body: [
["p", "Le Prophète \\uFDFA a dit : \\u00ABL'islam est b\\u00E2ti sur cinq : le t\\u00E9moignage qu'il n'y a de dieu qu'Allah et que Muhammad est le Messager d'Allah, l'accomplissement de la pri\\u00E8re, le versement de la zakat, le je\\u00FBne de Ramadan, et le Hajj vers la Maison.\\u00BB (Sahih al-Bukhari, Sahih Muslim). Chaque pilier ci-dessous ouvre son propre guide d\\u00E9taill\\u00E9 \\u2014 avec modes d'emploi, m\\u00E9rites, duas et dhikr."],
["link", { to: "shahada", icon: "\\u261D\\uFE0F", title: "1. Shahada \\u2014 Le t\\u00E9moignage", desc: "Son sens, ses conditions et ses exigences" }],
["link", { to: "prayer", icon: "🕌", title: "2. Salah \\u2014 Les cinq pri\\u00E8res", desc: "Guide \\u00E9tape par \\u00E9tape, et les m\\u00E9rites de la pri\\u00E8re" }],
["link", { to: "zakat", icon: "🤲", title: "3. Zakat \\u2014 L'aum\\u00F4ne obligatoire", desc: "Nisab, taux, b\\u00E9n\\u00E9ficiaires et Zakat al-Fitr" }],
["link", { to: "fasting-virtues", icon: "🌙", title: "4. Sawm \\u2014 Le je\\u00FBne", desc: "Les m\\u00E9rites du je\\u00FBne, et le guide du Ramadan" }],
["link", { to: "hajj-umrah", icon: "🕋", title: "5. Hajj et Umra \\u2014 Le p\\u00E8lerinage", desc: "Les rites \\u00E9tape par \\u00E9tape, avec duas et dhikr" }]
] },'''

# Fix a typo I introduced above ("I slam" -> "Islam")
PILLARS_EN = PILLARS_EN.replace("I slam is built", "Islam is built")

s = replace_article(s, "pillars", PILLARS_EN, "en")
s = replace_article(s, "pillars", PILLARS_TR, "tr")
s = replace_article(s, "pillars", PILLARS_FR, "fr")

print("pillars hub replaced OK")
open(P, "w", encoding="utf-8").write(s)
print("written, len", orig_len, "->", len(s))
