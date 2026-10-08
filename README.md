# Ezan Vakti

Ad-free prayer times, qibla, a monthly timetable, and a Quran reader. Static site for Cloudflare Pages. No accounts, no tracking.

Montreal is the default place, with ISNA timings. Any city works, including Diyanet for Turkey.

## Deploy

Cloudflare Pages, connected to this repo:

- Framework: None
- Build command: empty
- Output directory: `/`

## Data

- Prayer times: Aladhan (`method=2` ISNA, `method=13` Diyanet)
- Places: Open-Meteo geocoding
- Quran text and audio: Quran.com API v4
