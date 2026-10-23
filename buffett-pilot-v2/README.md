# Buffett pilot V2

English 15-second horizontal documentary opening. The unnamed child is a visual reconstruction of Warren Buffett at age six; the film deliberately delays the name reveal.

Open the finished video at `out/buffett-pilot-v2-15s.mp4`. To change the timing, copy, or images, edit `src/PilotV2.tsx` and use Remotion Studio:

```bash
npm install
npm run dev
npm run render
```

The composition is 1920 × 1080, 30 fps, 450 frames. All video, still, narration, music, Foley, and coin assets needed for rendering are included. Rendering needs no API key. Fal generation prompts and request IDs are in `public/assets/v2/manifest.json`; period coin photo sources and rights are in `public/assets/v2/coins/manifest.json`. The narrator was generated with Lumean. API keys are not included.

**Fact boundary:** Buffett's six Coca-Cola bottles for 25¢ and resale for a nickel each are described in [TIME's 1995 profile](https://time.com/archive/6727783/now-hes-even-richer/). Six nickels total 30¢, leaving 5¢ before any other costs. The pictured shop, child, shopkeeper, neighbor and transaction are illustrative reconstructions. The coin photographs are real 1936 coin examples, not his coins. An unused period Omaha street photo from the Library of Congress is in `research/stock/` for the eventual long film: [John Vachon, 1938](https://www.loc.gov/item/2017717725/).

**Sound:** The English narration says: “In 1930s Omaha, a boy bought six bottles of Coca-Cola for twenty-five cents. He sold them one by one for a nickel. Five cents profit. But the money was only part of what caught his attention.” Russian translation: «В Омахе 1930-х мальчик купил шесть бутылок Coca-Cola за 25 центов. Он продавал их по одной — по пять центов за бутылку. Пять центов прибыли. Но деньги были лишь частью того, что привлекло его внимание». `scripts/create-v2-foley.py` recreates the original Foley waveform if needed.

**Picture timeline:** 0–3 s Omaha walk; 3–5.5 s purchase at counter; 5.5–7.8 s exactly six visible bottles; 7.8–10.4 s resale at neighbor's door; 10.4–15 s arithmetic with genuine 1936 coin images. Cuts are full-frame to prevent severing figures or text mid-transition.
