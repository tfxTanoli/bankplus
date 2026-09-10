# Verification Screenshots

Before/after evidence for the Success Stories reels photo replacement (2026-09-10).
Full rationale is in `../context.md`.

| File | What it shows |
| --- | --- |
| `before/reels-section-desktop-BEFORE.png` | Reels grid @1440px before the change |
| `before/reels-section-mobile-BEFORE.png`  | Reels grid @430px before the change |
| `after/reels-section-desktop-AFTER.png`   | Reels grid @1440px after the change |
| `after/reels-section-mobile-AFTER.png`    | Reels grid @430px after the change |

Captured from `npm run dev` (localhost:3000) → Success Stories tab → `#student-reels-section`,
on a clean browser profile with empty localStorage.

Note: the BEFORE shots show Unsplash stock portraits. That is the genuine committed default
state — the real photos previously visible in the client's browser were their own local
uploads stored in localStorage/IndexedDB, not files in this repository.
