# Documentary video studio architecture

## Boundaries

| Area | Implementation |
| --- | --- |
| Studio / Renderer | `studio/` Remotion Studio and composition registration |
| Motion Engine | `studio/src/motion/` reusable easing and paper wipe |
| Scene Library | `studio/src/scenes/` typed `editorial-card`, `image-panel`, and `stat-card` presets |
| Style System | Project theme tokens in `projects/*/project.json`, consumed by all presets |
| Asset Providers | Typed Fal/Lumean request and result contracts in `studio/src/providers/`; existing provider-specific scripts remain optional in `buffett-explainer/scripts/` |
| Audio Pipeline | Typed audio track data and Remotion audio renderer in `studio/src/audio/` |
| Caption Pipeline | Timed JSON cues and reusable caption renderer in `studio/src/captions/` |
| Timeline | `studio/src/timeline/` derives and validates duration from scene timing data |
| Director | Project brief and storyboard are stored as project data and validated by the director schema |
| Quality Assurance | `studio/scripts/qa.ts` checks schema, timeline, and local asset existence; `npm run smoke` also renders a short scene |
| Projects | Independent manifests and media under `projects/<id>/` |
| References | Existing source reference and editorial notes in `ref/` and `buffett-explainer/STYLE_GUIDE.md` |

The renderer defaults to `projects/smoke-test/project.json`; another project is selected with Remotion's `--props ../projects/<id>/project.json` option. Composition metadata is recalculated from the validated manifest. Scene content and timings live in JSON and React components only interpret typed preset data. New projects add data and assets without copying source code. Only the smoke-test project is scaffolded now; the Buffett films remain untouched.

## Audit findings

- `buffett-explainer/` is the full earlier Remotion project: six Russian explainer scenes, an earlier English pilot, narration captions, custom paper wipes, generation scripts, and a full reference style guide. Its timeline is fixed in `src/Composition.tsx`; scene copy and layout are embedded in React components.
- `buffett-pilot-v2/` is a self-contained 15-second English pilot with its video, music, voice, Foley, coin photographs, and source manifests. Its single `PilotV2.tsx` holds five scene timings, visuals, audio, and transitions. It is renderable without provider credentials.
- The two pilots duplicate the narration and music audio files. V2 contains its own copy of the v2 image/video assets; the originals are also in the earlier project. No media was removed.
- Existing reusable ideas are the project palette/primitives, directional `SceneWipe`, frame-based transitions, captions, and audio cross-fades. Existing pilot scenes are content-specific and remain in place.
- Fal is only used by optional image/video/masking scripts. Lumean is only used by optional narration/caption-download scripts. Rendering existing media does not require either key. Generation commands can incur cost and were not run.
- `@remotion/transitions` is declared in the earlier project but not imported by its source. `@fal-ai/client` is needed only by optional generation scripts. The V2 project has no Fal dependency.
- The repository has a tracked `ref/videoplayback.mp4` and reference observations in `buffett-explainer/STYLE_GUIDE.md`; no automated reference-analysis pipeline exists.
- No `ffmpeg` or `ffprobe` executable is installed on this host. Remotion's renderer may supply its own binary; external media probing is unavailable unless a project dependency supplies it.

## Run and validate

See `AGENTS.md` for real commands. No provider API calls are part of Studio, typecheck, QA, or smoke render. Copy `.env.example` only when a provider is intentionally used; never commit `.env`.
