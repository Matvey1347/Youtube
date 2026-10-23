# Buffett documentary video project

This repository contains the editable Remotion source and media for the Warren Buffett documentary work.

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
