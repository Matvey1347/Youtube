# Editorial motion specification

## Direction

The source uses large, tightly tracked italic grotesk headlines in muted rose, small italic support copy, high-contrast foreground objects, warm off-white scenes, and two brief near-black statements. Its portrait frame was adapted by widening the type field and anchoring the photo crops along the lower and right edges. The story still alternates dense collage beats with short dark pauses.

## Output beat map (30fps)

| Output time | Scene | Choreography |
| --- | --- | --- |
| 0.0–2.4s | Bust / “no one tells you” | Kicker clips on; words resolve from blur in a stagger; marble bust moves independently across title; a 2.5D push continues. |
| 2.4–5.6s | Chess / “is just posting and hoping” | Wavy edge starts the new field; headline words assemble in three lines; chess photograph rises across the lower half and occludes its baseline; camera pushes. |
| 5.6–6.4s | “and hope is not a growth plan” | Dark tonal interruption; rose emphasis sharpens while the burgundy glow breathes. |
| 6.4–9.6s | Phone / “either attract new eyes” | Kicker reveals; headline stacks in three staggered lines; photo of hands and phone drifts in front and masks the right ends of the words; support line follows. |
| 9.6–11.2s | “or convert attention into action” | Short dark beat; two-part copy sharpens at different times. |
| 11.2–13.6s | Typewriter / “none of the three consistently” | Archival photo rises from soft focus; headline builds over the image; small rose marks counterbalance the heavy photo crop. |
| 13.6–14.0s | Follow CTA | Monogram eases into scale and the CTA resolves to a short hold. |

Each scene transition has 18 frames of overlap. The incoming scene is placed above the outgoing scene and revealed by a deterministic 41-point sine-deformed mask over 22 frames. The maximum edge variation is 96px at 1080p. Camera movement is a restrained ~3.2% shot-wide scale drift; collage photos receive their own parallax offsets.

## Type and layering

The source does not contain font metadata. This pilot uses system Arial bold italic for the display and Georgia italic for supporting copy. The headline component accepts explicit line breaks and word stagger. `ForegroundOcclusion` declares background → type → middle → foreground stacking; the statue uses a local Vision-generated alpha matte cropped to the upper torso, while the phone photo gets a soft edge mask. The latter remains a photographic plane with background texture.

## Effect examples

The four-second `MotionLibrarySmoke` composition demonstrates all reusable effects together. Component props, suitable use cases, and visual limitations are documented in `studio/src/motion/README.md`. The same effects are composed in `EditorialTypography.tsx`; no scene-specific timing lives inside the motion primitives.
