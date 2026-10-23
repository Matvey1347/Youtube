# Reusable motion library

All motion derives from Remotion's local frame (`useCurrentFrame`) and fixed props. No random values, clocks, API calls, or wall-time animation are used, so a frame is reproducible in Studio and render.

| Component | Main props | Use it for | Limits |
| --- | --- | --- | --- |
| `KineticTypography` | `text`, `top`, `left`, `width`, `fontSize`, `delay`, `stagger`, `tracking`, `color` | Tight, word-by-word editorial headline builds | A single line box wraps by browser font metrics; exact line breaks are `\n`. Supply a measured width for the target font. |
| `BlurToSharpReveal` | `children`, `delay`, `duration`, `maxBlur`, `rise` | Resolving focus on labels, figures, and short copy | Large blur radii cost render time; keep under roughly 28px at 1080p. |
| `MaskedTextReveal` | `text`, `delay`, `duration`, `fontSize`, `color` | Vertical clipping reveals on kickers or support copy | One-line text only. Put it in a fixed-width wrapper for wrapping. |
| `ForegroundOcclusion` | `background`, `type`, `middle`, `foreground` | Declare the semantic depth order of a scene | The foreground asset must contain a real alpha or a carefully art-directed crop/mask; this component does not cut images out. |
| `LayeredParallax` | `children`, `depth`, `direction`, `duration`, `distance` | Small independent depth drift for a foreground layer | Supply image overscan; avoid large depth values and use `CameraMove` for a shot-wide move. |
| `OrganicLiquidWipe` | `children`, `from`, `duration`, `amplitude`, `waves`, `direction` | A soft irregular edge on scene entrances | SVG/CSS polygon has 41 edge samples and is designed for 1920×1080. It is an editorial wipe, not fluid simulation. |
| `StaggeredObjectEntrance` | `children`, `index`, `delay`, `stagger`, `duration`, `fromX`, `fromY`, `fromScale` | Sequential collage entrances | `index` must be stable; do not derive it from array order that changes between renders. |
| `CameraMove` | `children`, `duration`, `fromScale`, `toScale`, `panX`, `panY`, `delay` | A restrained push/pan across a shot | Add image overscan (about 4%) to prevent exposed edges during zoom. |

`MotionLibrarySmoke` combines all eight effects and is a four-second render target. The project test command also checks wipe geometry determinism, kinetic line tokens, timeline duration, and asset existence.
