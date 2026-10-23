# Buffett documentary · opening pilot (15 seconds)

This is a 1920 × 1080, 30 fps English opening experiment for the longer documentary. The boy stays anonymous. The pilot covers Buffett's age-six Coca-Cola resale and ends before revealing his name.

## Story and fact boundary

The narration: “In 1930s Omaha, a boy bought six bottles of Coca-Cola for twenty-five cents. He sold them one by one for a nickel. Five cents profit. But the money was only part of what caught his attention.”

Русский перевод: «В Омахе 1930-х мальчик купил шесть бутылок Coca-Cola за 25 центов. Он продавал их по одной — по пять центов за бутылку. Пять центов прибыли. Но деньги были лишь частью того, что привлекло его внимание».

The purchase, prices and Buffett's age are reported in [TIME's 1995 profile](https://time.com/archive/6727783/now-hes-even-richer/). Five cents is the arithmetic difference between 30¢ revenue and 25¢ purchase price; it is not a claim about net income after other costs. The specific shop, counter, hands and boy's appearance are **illustrative reconstructions**. The real [Library of Congress photograph](https://www.loc.gov/pictures/collection/fsa/item/2017767975/) is contextual imagery of Omaha in 1938; it does not show the transaction or Buffett. Archival metadata and use notes are in `research/stock/manifest.json`.

## Picture and sound

| Time | Picture | Sound |
| --- | --- | --- |
| 00:00–00:02.5 | 1938 Omaha photograph, anonymous boy cutout, restrained push-in | Opening room tone, paper touch, voice |
| 00:02.5–00:05.2 | Counter, quarter, six-bottle crate, separate hand layers | Coin, wood, glass |
| 00:05.2–00:08 | Six individual bottles, one raised from its slot | Cap and glass |
| 00:08–00:11.5 | Hand-to-hand sale, six nickels arriving in sequence | Three bottle/coin accents |
| 00:11.5–00:13.5 | Paper ledger: 25¢ cost, 30¢ received, 5¢ left | Nickels and small final ring |
| 00:13.5–00:15 | Physical paper page wipe | Page flip and held music |

The art direction uses photographic cutouts on scanned cream paper, deep ink, faded cola red, narrow editorial type, shallow layered shadows, a paper turn, and original low-key plucked score plus designed Foley. Fal-generated assets and their prompts/request IDs are recorded in `public/assets/pilot/manifest.json`. Lumean order/voice metadata are in `public/assets/pilot/lumean.json`. No secret keys are stored in these manifests.

## Regenerate and crop Fal cutouts

After `node scripts/mask-pilot-stills.mjs` removes backgrounds, run the local crop step. It makes no API calls and skips images already cropped to the dimensions recorded in the manifest.

```bash
python3 -m venv .venv-pilot
.venv-pilot/bin/pip install Pillow
.venv-pilot/bin/python scripts/crop-pilot-stills.py
```

## Reopen and render

```bash
cd /Users/mak/Downloads/Test/BuffettPilotProject
npm install
npm run dev -- --port=3019
npm run render:pilot
```

The composition is `BuffettPilot15` in `src/Pilot.tsx`. The deliverable is `out/buffett-pilot-15s.mp4`. Existing `Buffett15` is a separate prior composition. Credentials for optional regeneration are read from the parent `.env`; the rendered pilot and current assets can be reopened without API access.
