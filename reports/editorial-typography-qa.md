# Editorial Typography Pilot — comparative QA

## Inputs and method

- Source reference: `references/originals/editorial-typography.mp4`, 720×1280, 30fps, 17.513991s, SHA-256 `cfd2818409fdf8ee36a6b962dc7bd22c14c87ef6caf5f73cef3c9d7473d3c682`.
- Previous output: `projects/editorial-typography/archive/editorial-typography-v1.mp4`, 1920×1080, 30fps, 14s.
- Updated output: `out/editorial-typography-v2.mp4`, 1920×1080, 30fps, 14s.
- Six transition panels at `reports/editorial-typography-frames/transition-*.png` compare source, v1, and v2 in six rows at 0.2s spacing around each v2 edit point. Source frames are mapped to the 14-second output clock with a 17.513991/14 playback factor. The comparison video applies the same normalization.
- Review included rendered full-resolution stills for the opening statue and typewriter beats, plus the dense transition panels. This is visual review, not a pixel-difference score: the source is portrait and the rebuild is composed for 16:9.

## Ranked deviations and changes

| Rank | Visual impact | Observed in v1 vs source | v2 change | Remaining difference |
| --- | --- | --- | --- | --- |
| 1 | Very high — asset fidelity | Four flat SVG drawings stood in for the marble figure, chess pieces, phone rig, and typing figure. They had little material texture or photographic depth. | Replaced those drawings with a local Vision-masked marble David upper torso, a high-resolution chess photograph, a real hand-held phone photograph, and an archival 1932 typing photograph. Source pages and licenses are recorded alongside the project. | The phone photo is a Samsung camera image rather than a gimbal. The archival photo includes room context; it is faded into the frame, not rotoscoped. |
| 2 | Very high — depth and type interaction | v1 kept most objects and type in separate areas; only a small area of the phone approached the headline. | Bust, chess, and phone layers now sit above the display type. Chess pieces obscure the lower title line; the marble cutout crosses its headline; the phone and hand soften across the right ends of the words. | The chess asset remains a cropped photographic plane. Only the marble figure is a true alpha cutout. |
| 3 | High — continuity | v1 sampled panels show near-white/empty moments at edit points such as 2.6s and 5.8s while new content was clipped from zero. This weakens the sense of a continuous sequence. | Incoming scenes overlap outgoing scenes by 18 frames and reveal through a 22-frame irregular edge; sampled transitions now show both images during the wipe. Scene starts were moved to 2.4, 5.6, 6.4, 9.6, 11.2, and 13.6s to follow the source timing after 14-second normalization. | Organic wipes are authored polygon mattes, not fluid simulation. Fast content changes remain a designed editorial approximation. |
| 4 | High — motion character | v1 was primarily a scene-by-scene static layout with limited camera and object travel. | Words arrive individually with eased blur-to-sharp resolution; foreground layers drift at independent parallax rates; shot-wide camera push/pan and staggered reveals run from frame time. | The source's exact easing, motion curves, and hand interaction cannot be recovered from the encoded reference with certainty. No generated hand animation was added. |
| 5 | Medium — horizontal framing | The source composes around a portrait column with subjects below the type. v1 spread title and simplified objects across wide, underfilled fields. | Type occupies wide editorial lines; photo crops are anchored to the lower/right edges; the lower chess band and foreground overlaps make the 16:9 adaptation intentional. | The portrait source naturally feels denser. Some negative space remains on horizontal dark beats by design. |
| 6 | Medium — typography | v1 used small Arial and generic icon-like type treatment; the source uses a heavy italic display face and compact support copy. | Display type is much larger, tightly tracked, lower-case and word-staggered; kickers use small italic serif copy. Explicit line breaks are data-driven. | The source font is not embedded or identified. System Arial/Helvetica remains a visual approximation. |

## Motion and readability observations

- The title remains readable at 1920×1080: the photo occlusion is confined to its right or lower edge, and high contrast keeps the rose type distinct from the warm-white field.
- Dense panels inspect six transitions at 0.2s spacing, including the first incoming frame, transition center, and post-transition hold. The source changes vertical composition much faster in some beats; no pixel-level identity is expected after the aspect-ratio adaptation.
- Dark interstitials retain the source's sparse centered-copy grammar. V2 adds a drifting burgundy light field so those short pauses do not freeze into static cards.
- The 4-second `MotionLibrarySmoke` composition exercises all eight library components. Unit checks cover deterministic wipe geometry, line-break tokenization, stable stagger offsets, project duration, and required media. `typecheck` covers the component APIs.

## Limits and next visual pass

V2 is materially closer in texture, type scale, overlap, scene continuity, and use of motion. It still uses a real photographic phone image rather than the reference's gimbal, an archival workspace photograph rather than a statue at a laptop, and a system font rather than the exact display face. The phone image retains a soft photographic background, and the chess photograph is a single plane rather than separated pieces. These are the largest remaining visual differences. Replacing them would need a licensed phone-on-gimbal cutout, a separately masked typing statue, and font identification or a close licensed font match; no paid image API or new generated asset was used for this pass.

## Reproducible verification record

Run from `studio/`:

```sh
npm run typecheck
npm run test:motion
npm run render:motion-test
npm run render:editorial
npm run render:comparison
npm run render:version-comparison
npm run qa:all
```

### Final verification results

- `npm run typecheck` — PASS.
- `npm run test:motion` — PASS (4 tests: reusable effect coverage, deterministic wipe geometry, typography/stagger behavior, and project media/archive availability).
- `npm run render:motion-test` — PASS; H.264 output, 1920×1080, 30fps, 4 seconds.
- `npm run render:editorial` — PASS; H.264 output, 1920×1080, 30fps, 14 seconds.
- `npm run render:comparison` — PASS; normalized reference-v2 side-by-side output, 14 seconds.
- `npm run render:version-comparison` — PASS; v1-v2 side-by-side output, 14 seconds.
- `npm run qa:all` — PASS after both comparison renders: typecheck, 4 motion tests, and editorial media/timeline checks all passed.
- Remotion Studio preview endpoint `http://localhost:3216/EditorialTypography` returned HTTP 200.
- Dense visual contact sheets were regenerated for six transitions at 0.2-second intervals. The panels confirm visible overlapping imagery through the organic wipes and retain format-native source/rebuild framing. Around 5.8s, the incoming phone scene has an intentionally open left field while its photograph and title enter; this beat is slower and more open than the portrait source.

The local environment has no system `ffprobe` on PATH. The bundled Remotion `ffprobe` was used with its library path. It confirmed H.264, 1920×1080, 30fps and 14s for the new pilot and both comparison videos; the smoke render is 1920×1080, 30fps and 4s. The final bust crop was reviewed in the opening frame. `git diff --check` also passed.
