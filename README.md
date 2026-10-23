# Buffett documentary video project

This repository contains the editable Remotion source and media for the Warren Buffett documentary work.

## Reusable video studio foundation

[`studio/`](studio/) is the new data-driven Remotion renderer. Projects keep scripts, storyboard, style tokens, scene timing, captions, audio tracks and asset manifests under [`projects/`](projects/) instead of copying a previous video's React source. Start with the three-second smoke project:

```bash
cd studio
npm ci
npm run studio
```

Start a different project by passing its manifest as input props: `npm run studio -- --props ../projects/<project-id>/project.json`. The Studio renderer recalculates its duration and frame rate from the selected project data.

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the module boundaries and audit, and [`AGENTS.md`](AGENTS.md) for the full command list.

## Current 15-second pilot

- [Watch the finished English V2 MP4](buffett-pilot-v2/out/buffett-pilot-v2-15s.mp4)
- [Open the self-contained V2 project](buffett-pilot-v2/)
- [Read the V2 setup, narration and source notes](buffett-pilot-v2/README.md)

The current pilot is 1920 × 1080 at 30 fps. It uses Fal-generated illustrative scenes, Lumean narration, original music and Foley, and photographs of real 1936 American coins. The filmed child and transactions are reconstructions, not archival images of Buffett.

## Earlier working project

[`buffett-explainer/`](buffett-explainer/) holds the longer-running Remotion project, reference analysis, scripts and earlier pilot. It is an ordinary directory in this repository, so its source files can be browsed directly on GitHub. The earlier MP4 is at [`buffett-explainer/out/buffett-pilot-15s.mp4`](buffett-explainer/out/buffett-pilot-15s.mp4).

The self-contained V2 folder is the recommended starting point for the next edit:

```bash
cd buffett-pilot-v2
npm install
npm run dev
npm run render
```

The API keys are intentionally omitted. All media needed to edit and render the current pilot is checked in. The original reference video is in [`ref/`](ref/).
