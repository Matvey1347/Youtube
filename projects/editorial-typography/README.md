# Editorial Typography Pilot

A reusable 14-second, 1920×1080, 30fps Remotion project. The scene copy and edit points live in `scene-data.json`; beat intent and source-to-output timing live in `storyboard.json`; React implements layouts and effect choreography in `studio/src/scenes/editorial-typography/`. The original pilot is preserved at `archive/editorial-typography-v1.mp4`.

## Run from `studio/`

```sh
npm ci
npm run typecheck
npm run test:motion
npm run qa:editorial
npm run preview:editorial
npm run render:motion-test
npm run render:editorial
npm run render:comparison
npm run render:version-comparison
```

`render:editorial` creates `out/editorial-typography-v2.mp4`. `render:comparison` synchronizes the vertical source to 14 seconds and places it beside the horizontal rebuild. `render:version-comparison` places the preserved v1 and updated v2 at the same 14-second duration. Outputs are intentionally local under the ignored `out/` folder; the archived baseline is tracked with this project.

The source is 720×1280 at 30fps and 17.513991s. The deliverable is 1920×1080 at 30fps and 14s. Horizontal framing uses full-width display type, large lower-third image crops, edge masks, and independent camera drift; it does not stretch portrait footage. See `MOTION_SPEC.md`, `ASSET_SOURCES.md`, and the root `reports/editorial-typography-qa.md` for the audit, asset terms, and QA evidence.

No paid API or generated asset was used. External image credits and licenses are recorded in `ASSET_SOURCES.md`.

The David alpha matte can be regenerated locally on macOS with Vision, without a network request:

```sh
cd studio
swift scripts/make-editorial-cutouts.swift ../projects/editorial-typography/assets/marble-david-optimized.jpg /tmp/marble-david-full-cutout.png
sips --cropToHeightWidth 1100 1800 --cropOffset 190 0 /tmp/marble-david-full-cutout.png --out ../projects/editorial-typography/assets/marble-david-bust.png
```
