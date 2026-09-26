# Ezan Vakti - HTML deployment (GitHub + Cloudflare Pages)

This is the ad-free till perfection build.

## How to deploy (same as jsm-options.com)

1. Create GitHub repo: ezan-vakti
2. Upload files:
   - index.html
   - manifest.json
   - _headers
   - (optional) icon-192.png, icon-512.png
3. Cloudflare Pages:
   - Connect GitHub repo
   - Framework: None (static HTML)
   - Build command: leave EMPTY
   - Output directory: /
   - Save -> Deploy

## Quran.com API used
- https://api.quran.com/api/v4/chapters
- https://api.quran.com/api/v4/verses/by_chapter/{id}?translations=131
- https://api.quran.com/api/v4/resources/recitations
- https://api.quran.com/api/v4/chapter_recitations/{reciter}/{chapter}
No API key needed.

## Aladhan prayer times
- https://api.aladhan.com/v1/timingsByCity?city=Montreal&country=Canada&method=2
method: 2=ISNA (Montreal), 13=Diyanet, 3=MWL

Ad-free, no tracking, privacy-first.
