# Verification Screenshots

Before/after evidence. Full rationale for each change is in `../context.md`.

## Success Story photos (2026-09-10)
Flyer→student mapping table: **`photo-mapping.md`**

| File | What it shows |
| --- | --- |
| `before/wall-of-fame-row1-desktop-BEFORE.png` | Wall of Fame, first cards @1440px, stock photos |
| `before/wall-of-fame-row2-desktop-BEFORE.png` | Wall of Fame, next cards @1440px, stock photos |
| `before/wall-of-fame-mobile-BEFORE.png` | Wall of Fame @430px, stock photos |
| `after/wall-of-fame-row1-desktop-AFTER.png` | Same view with the real flyer headshots |
| `after/wall-of-fame-row2-desktop-AFTER.png` | Same view with the real flyer headshots |
| `after/wall-of-fame-mobile-AFTER.png` | Same view @430px with the real headshots |

The row2 pair is the clearest check: each card shows the name, role and bank directly under
the photo, so photo↔identity can be confirmed at a glance.

## Instagram reels photos (2026-09-10)

| File | What it shows |
| --- | --- |
| `before/reels-section-desktop-BEFORE.png` | Reels grid @1440px before the change |
| `before/reels-section-mobile-BEFORE.png` | Reels grid @430px before the change |
| `after/reels-section-desktop-AFTER.png` | Reels grid @1440px after the change |
| `after/reels-section-mobile-AFTER.png` | Reels grid @430px after the change |

All captured from `npm run dev` (localhost:3000) on a clean browser profile with empty
localStorage, so they show the committed defaults rather than any locally uploaded photos.
