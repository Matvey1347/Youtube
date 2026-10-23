# Verification record

Run on macOS arm64 with Node v22.21.1 and npm 10.9.4. No Fal or Lumean requests were made.

| Command / check | Result |
| --- | --- |
| `cd buffett-pilot-v2 && npm ci` | Passed; 257 packages installed, 0 vulnerabilities reported. |
| `cd buffett-pilot-v2 && npm run lint` | Passed (`tsc --noEmit`). |
| `cd buffett-explainer && npm ci` | Passed; 354 packages installed, 0 vulnerabilities reported. |
| `cd buffett-explainer && npm run lint` | Passed (`eslint src && tsc`). |
| `cd studio && npm ci` | Passed after lockfile generation; dependency versions are pinned, including Remotion-compatible zod 4.5.4. |
| `cd studio && npm run typecheck` | Passed (`tsc --noEmit`). |
| `cd studio && npm run qa` | Passed schema, storyboard link, timeline duration/continuity, and local asset checks: one scene, 90 frames at 30 fps, one SVG asset. |
| `cd studio && npm run smoke` | Passed; Remotion encoded `studio/out/studio-smoke-test.mp4` (`DocumentaryStudio`, 90 frames, H.264, 38.2 kB). |
| `cd studio && npm run studio -- --no-open --port=3201` | Passed; Studio built and served `DocumentaryStudio`. Browser preview showed the title and loaded `smoke-test/assets/paper.svg`. |
| `cd buffett-pilot-v2 && npm run render` | Passed; rendered the registered `BuffettPilotV2` composition, 450 frames, H.264, 9.8 MB. The original tracked MP4 was restored after this check so the pilot deliverable remains byte-for-byte unchanged in the branch. |

The first V2 render attempt used the default Remotion port, which was occupied by an unrelated local web server and returned a 404. The render script now uses port 3127 and the retry completed. An initial Studio process was also restarted after pinning zod to the version required by Remotion; the fresh Studio build succeeded.

`ffmpeg` and `ffprobe` executables are not installed on this host. Remotion downloaded and used its own Chromium renderer. Composition frame count is validated from project data; external probing of MP4 metadata was unavailable.
