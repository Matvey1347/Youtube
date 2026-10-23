# Editorial Typography: visual analysis and motion specification

## Source and inspection

Inspected `references/originals/editorial-typography.mp4` with Remotion-bundled ffprobe and decoded a frame at each integer second. Source: 720×1280, 30fps, 17.513991s, H.264, SHA-256 `cfd2818409fdf8ee36a6b962dc7bd22c14c87ef6caf5f73cef3c9d7473d3c682`. The downloaded filename was unrelated to visual content; category confirmed by the frames. The contact sheet is `editorial-typography-contact-sheet.png`.

## Frame map (approximate, sampled at 1s)

| Source time | Visible state and layout | Motion / transition |
|---|---|---|
| 0s | Nearly blank white vertical canvas | Brief white hold/flash |
| 1s | Dark classical bust lower/right; tiny italic line near upper center | Bust already present; restrained hold |
| 2s | Huge rose-red italic “no one tells you” fills upper/right, behind bust | Fast scale/position reveal, foreground occlusion preserves depth |
| 3s | White panel, small italic copy at left; black pointed shape enters upper-right; chess pair low center | Organic black corner matte sweeps across; text becomes supporting label |
| 4s | Chess pair and barcode anchor lower third; phrase begins above | Headline grows in behind pieces; shallow push |
| 5s | Rose display phrase “is just posting and …” dominates center, chess overlaps bottom | Staggered phrase build, slight softness on moving type |
| 6s | Phrase completes as “hoping”; black points frame panel | Continued scale and settling |
| 7s | Near-black card, centered white italic sentence with rose final phrase, burgundy edge glow | Toned cut; blur/glow converges to crisp center copy |
| 8s | White field, small centered kicker, phone on gimbal at lower-right | Return through organic corner shape; phone rises into frame |
| 9s | “either” above phone; large type at left/center | Stacked kinetic headline, foreground phone remains crisp |
| 10s | “either attract” builds; phone overlaps the right side | Staggered word arrival; subtle camera push |
| 11s | “new eyes” completes; small support copy below | Type settles; phone and gimbal form strong foreground silhouette |
| 12s | Dark interstitial with centered line and rose emphasis | Blur-to-sharp phrase, burgundy corner light |
| 13s | Same dark card; emphasis resolves to “into action” | Short hold/finish |
| 14s | White background; seated statue at laptop lower-left/right-center, small kicker above, social marks near edges | Organic corner reveal, subject occupies bottom half |
| 15s | Rose type begins behind seated statue | Text is deliberately occluded by subject; slight push-in |
| 16s | Full “none of the three consistently”; social marks at front edges | Type sharpens/builds behind figure; foreground remains layered |
| 17s | Circular profile and small follow CTA, centered | Abrupt concise end card |

## Visual grammar

- Portrait frame is a sparse editorial page: large negative space above, subject anchored in lower half.
- Palette: warm white, near-black, muted dark rose; monochrome stone/chess with soft contact shadows.
- Display type is a heavy geometric grotesk, italic, tightly tracked, lower case. It spans about 55–95% of canvas width, often in 2–3 compact lines. Kicker/body is much smaller, thin italic serif/sans, centered or aligned to a generous left margin.
- Main copy uses changing scale, vertical stacking, staggered timing, and a short blur-to-sharp settle. The words feel assembled, not placed as a static card.
- Foreground cutouts cross the display type. The title belongs behind the statue/device; it does not sit on top of them.
- Black organic corner shapes have long tapered points and bowed edges. They reveal white scenes and frame their outer corners, rather than functioning as simple rectangular wipes.
- Most perceived camera motion is a restrained push (roughly a few percent); primary energy is typography and cutout movement.
- Density alternates: sparse statue intro, tightly layered chess headline, isolated dark card, dense phone/type composition, isolated dark card, dense statue/type/social end section.

## Horizontal adaptation implemented

The target remains 16:9. Typography is composed across a wide central field and stacked to retain scale; the statue/phone/laptop art is enlarged and anchored to lower corners so each overlaps the type. Chess and barcode occupy a deliberate lower-center band. Organic matte points are retained at opposite corners. Dark cards keep centered copy and edge glow. The original portrait is displayed in its full aspect ratio in the comparison render, with neutral side gutters. Text is original English copy about content consistency; artwork is original inline SVG, not extracted from the reference.

## Typeface / source limits

The source file does not include font metadata. The display face appears to be a heavy italic grotesk with rounded bowls and tight tracking; exact family cannot be reliably inferred from sampled pixels. This implementation uses the system Arial/Helvetica bold italic fallback; serif kicker uses Georgia italic. The SVG cutouts reproduce silhouette, tonal hierarchy, and overlap, but are not photoreal marble photography. Source times above are approximate integer-second samples, not exact edit decision points.
