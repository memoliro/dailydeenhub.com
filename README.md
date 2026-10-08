# Ezan Vakti

Ad-free prayer times, qibla, a monthly timetable, and a Quran reader. Static site for Cloudflare Pages. No accounts, no tracking.

Montreal is the default place, with ISNA timings. Any city works, including Diyanet for Turkey.

## Deploy

Cloudflare Pages, connected to this repo:

- Framework: None
- Build command: empty
- Output directory: `/`

## Data

- Prayer times and qibla: Aladhan API v1 (`prayer-api.js`). Monthly calendar is cached for 18 hours. Diyanet is calculation method 13; ISNA is method 2. This is not the credentialed Diyanet Awqat Salah feed.
- Places: Open-Meteo geocoding
- Quran text and audio: Quran.com API v4
