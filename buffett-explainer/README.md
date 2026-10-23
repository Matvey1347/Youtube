# Buffett in 15 seconds

A 16:9 Russian economics explainer built in Remotion from the editing grammar of `../ref/videoplayback.mp4`: quick visual beats, paper-cut scenes, documentary-style imagery, simple diagrams, and directional transitions.

## Open and render

```bash
npm install
npm run dev
npm run render
```

The finished MP4 is written to `out/buffett-15s.mp4`. The project is 1920×1080 at 30 fps and 15 seconds long. Rendering is deliberately sequential so time-based scene changes export reliably. Open the Remotion Studio composition **Buffett15** to change the scenes, timings, colors, or copy.

## Regenerate the voice and video

The project reads `LUMEAN_API_KEY` and `FAL_API_KEY` from its own `.env` or the parent folder's `.env`. Both APIs are optional for rendering the included media. Do not commit API keys.

```bash
npm run assets:voice
npm run assets:video
```

The scripts read `content/episode.json`. Edit the title, narration, voice, or video prompt there before requesting new media. A new Lumean TTS order and a new Fal video request can incur provider charges. The Fal script uses Kling 2.5 Turbo Pro text-to-video; Fal's current model page lists $0.35 for five seconds.

The image `public/assets/buffett-collage.png` is an original generated editorial illustration. `public/assets/buffett-paperboy.mp4` is generated through Fal. The voice in `public/assets/narration.mp3` is generated through Lumean. `public/assets/*-voice.json` and `fal-clip.json` record the source settings and prompts.

## Reuse this for another reference

1. Put the new reference in `ref/` and sample its opening, representative middle sections, and transitions.
2. Update `STYLE_GUIDE.md` with its pacing, materials, type, palette, and transition vocabulary.
3. Replace `content/episode.json` with the new script, voice, and generation prompt.
4. Rebuild the matching visual beats in `src/scenes/`, then regenerate media and render.

Keep a strong visual change on most spoken beats. Mix generated footage with hand-built typography, vector diagrams, and cutout objects so each shot communicates one idea.

## Structure

- `src/scenes/` — independent editable shots
- `src/Composition.tsx` — 15-second timeline and paper-wipe transitions
- `content/episode.json` — narration and generation inputs
- `scripts/` — Fal and Lumean API request helpers
- `public/assets/` — local media used by the composition
- `STYLE_GUIDE.md` — observations and storyboard from the supplied reference
- `SOURCES.md` — fact checks for the narration

