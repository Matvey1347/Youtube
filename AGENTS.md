# Project instructions

## Video projects

- `studio/` contains the reusable Remotion renderer and shared production contracts.
- `projects/<project-id>/` contains project data, storyboards, captions, media and asset manifests. Keep it independent from React scene implementation.
- `buffett-explainer/`, `buffett-pilot-v2/` and `ref/` are preserved source material. Do not remove or relocate their media as part of architecture work.
- Prefer data-driven scene presets in `studio/src/scenes/` over copying a previous project's React source.
- Keep output at 1920×1080. Projects may use 30 or 60 fps.
- Keep keys in local `.env` files. Asset generation scripts can incur charges; never run them without an explicit request.

## Commands

Run from the named directory:

```bash
cd studio && npm ci
cd studio && npm run studio
cd studio && npm run typecheck
cd studio && npm run smoke
cd buffett-pilot-v2 && npm ci && npm run lint
cd buffett-pilot-v2 && npm run render
cd buffett-explainer && npm ci && npm run lint
cd buffett-explainer && npm run render:pilot
```

To open a different data project in Studio, use `npm run studio -- --props ../projects/<project-id>/project.json`. The composition recalculates its duration, frame rate, and canvas dimensions from that validated project manifest.

See `ARCHITECTURE.md` for current implementation boundaries and audit findings.
