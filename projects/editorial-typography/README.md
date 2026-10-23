# Editorial Typography motion study

A 1920×1080, 30fps, 14-second Remotion composition. `scene-data.json` is validated at runtime by the Zod contract in `studio/src/scenes/editorial-typography/project.ts` and supplies scene content and timing. `storyboard.json` and the motion spec record the creative direction separately from the React implementation.

Run from `studio/`:

```sh
npm ci
npm run typecheck
npm run qa:editorial
npm run preview:editorial
npm run render:motion-test
npm run render:editorial
npm run render:comparison
```

`render:comparison` uses the source at `references/originals/editorial-typography.mp4` and the 14-second reconstruction. It preserves the portrait source ratio in the left panel. Artwork is original inline SVG; no paid assets or API calls were used.
