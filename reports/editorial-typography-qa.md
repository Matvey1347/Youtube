# Editorial Typography reconstruction QA

## Deliverables

- `out/editorial-typography.mp4` — 1920×1080, 30fps, 14s.
- `out/editorial-typography-comparison.mp4` — 1920×1080, 30fps, 14s; source and rebuild side by side on normalized timelines.
- `out/motion-library-smoke.mp4` — 1920×1080, 30fps, 4s sample of reusable components.
- `references/analysis/editorial-typography-contact-sheet.png` — decoded source frames at 1s steps.
- `references/analysis/editorial-transition-checks.png` — rendered stills at the start, middle, and end of scene reveals.
- `projects/editorial-typography/storyboard.json` and `scene-data.json` — creative timing and validated scene content.
- `references/analysis/editorial-typography-motion-spec.md` — source map and visual grammar.

## Checks actually run

- `cd studio && npm run typecheck` — PASS.
- `cd studio && npm run qa` — PASS: existing smoke-test manifest, timeline and asset.
- `cd studio && npm run qa:editorial` — PASS: format, 14s duration, reference/output paths, 7 beats, contiguous scene timings.
- `cd studio && npm run render:motion-test` — PASS, 120 frames encoded.
- `cd studio && npm run render:editorial` — PASS, 420 frames encoded; MP4 probed as 1920×1080, 30/1fps, 14.000s.
- `cd studio && npm run render:comparison` — PASS, 420 frames encoded; MP4 probed as 1920×1080, 30/1fps, 14.000s.
- `cd studio && npm run smoke` — PASS after correcting the existing nested `<Composition>` registration; 90 frames encoded.
- `cd studio && npm run preview:editorial` plus `curl -I http://localhost:3216` — PASS, Studio returned HTTP 200.
- Extracted frames with the bundled FFmpeg and visually reviewed the opening, all scene reveal windows, midpoints, final typing scene, and the comparison end card. The source contact sheet was also inspected.
- Verified `buffett-explainer/` and `buffett-pilot-v2/` remain in Git (96 tracked files total across both paths).

## Corrections made from rendered review

- The initial smoke render exposed that `StudioComposition` returned a `<Composition>` inside a registered composition. Refactored it into the video component and registered the root composition once. The smoke render then passed.
- Timed the scene boundaries contiguously so old foreground layers do not bleed over a new beat.
- Repositioned the first kicker and added the missing CTA end card.
- Changed the wipe from corner decoration to an animated organic reveal mask on every beat. Rendered transition frames show the irregular edge crossing the frame; display type separately resolves from blur.
- Put comparison labels above both video panels with a dark backing after the first sample showed low contrast and clipping.
- Shifted the phone rig until its screen overlaps the end of “new eyes”; reviewed the rendered 8.4s frame.

## Remaining differences and limits

- The landscape adaptation changes the source's page geometry. Type spans horizontal bands; chess and foreground figures anchor lower center or left/right rather than occupying the portrait's single lower half.
- The sculpture, chess, phone rig and typing subject are hand-authored SVG illustrations. They reproduce graphic mass, layering and overlap, not the source's photographic detail or exact poses.
- Arial/Helvetica bold italic and Georgia italic approximate the observed type. The source file has no font metadata, so its exact family is unknown.
- Source times and easing are estimated from integer-second samples, not original project files or source frame-by-frame optical tracking.
- The source is sped up to fit the comparison's 14-second timeline. The comparison preserves its 9:16 aspect ratio within the left panel; it does not claim pixel-level parity.
- No narration, music or Foley was added; this deliverable is the requested visual motion study.
