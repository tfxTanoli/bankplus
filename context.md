# Project Context Log — BankPlus Modern Redesign

Running record of implementations. Updated after every change.

---

## 2026-09-10 — Replace the 4 Instagram Reel photos on the Success Stories page

### Request
Client asked to replace the 4 photos in the reels grid on the Success Stories page with
images already present in the root `images/` folder. Each replacement had to be chosen by
reading the existing card's **title / description**, then picking the best-matching image
from that folder. No other functionality was to be affected.

### Where these cards live
| Concern | File |
| --- | --- |
| Card data (titles, quotes, thumbnails) | `src/data/mockData.ts` → `INSTAGRAM_STUDENT_REELS` (from line ~1069) |
| Rendering | `src/views/SuccessStoriesView.tsx` → `#student-reels-section` |
| Merge / override logic | `src/utils/reelsSectionStorage.ts` → `getMergedReelsList()` |
| Admin editor for these cards | `src/components/ClassroomPhotoManagerModal.tsx` |

The same `INSTAGRAM_STUDENT_REELS` array also feeds `HomeView.tsx`, so the new photos
appear on the Home page reels strip too.

### Finding: the previous defaults were stock placeholders
The four files the cards pointed at (`public/assets/drills/IMG-2026*.jpg`) are **Unsplash
stock portraits**, not real BankPlus photos. The authentic photos the client sees in their
browser come from **their own localStorage/IndexedDB uploads** made through the Classroom
Photo Manager modal — which is also why their on-screen card titles differ from the titles
in source. See "Important caveat" below.

### Image matching rationale
Each image in `images/` was opened and matched against the card's title and quote:

| Card | Title / description signal | Chosen source | Why |
| --- | --- | --- | --- |
| `reel-1` | "From College Graduate to Axis Bank Asst. Manager in 75 Days!" — *"Zero corporate experience… 90-day BankPlus drills"*, Kanpur Central | `images/64625.jpg` | Classroom of seated trainees under the **"Know Your Role in Branch Banking"** board — the training journey a fresh graduate with zero corporate experience goes through. |
| `reel-2` | "SBI Junior Associate Selection Moment" — *"…showed the SBI appointment letter"*, Kanpur Kakadeo | `images/64619.jpg` | Full cohort in **formal banking dress code** (white shirts / black trousers) posed in the branch-simulation lab beside the Teller counter — reads as a selection-drive / offer-day photo. |
| `reel-3` | "Speed-Maths & **Live Mock Interview** Drill Session" — *"…Vedic tricks and **live screen timers**"* | `images/64641.jpg` | The only photo showing an **actual mock interview panel in session**, with the on-screen session timer (`00:53:22`) visible — a literal match for both the title and the quote. |
| `reel-4` | "**14 Students** Placed in a Single Day at Kotak Campus Drive" — *"Handing over real appointment letters"* | `images/3486.jpg` | The largest group photo in the set — **headcount is 14**, matching the title exactly — with the "More than 1000 Vacancies available in Banking" campus-drive banner behind. |

Not used: `3444.jpg` and `64640.jpg` are near-duplicate frames of `3486.jpg` / `64619.jpg`
(using both of a pair would have made two cards look identical). `64655.jpg` is the same
scene the client already has on card 1, so it was skipped to keep all four visibly new.

### Aspect-ratio handling (why the files were processed, not just copied)
The card image slot is `aspect-9/14` (portrait, ≈0.64) with `object-cover`, but every source
photo is landscape (1.33 → 2.23). A straight copy would have centre-cropped away **~52% of
the width**, cutting people off both edges — fatal for a card captioned "14 Students Placed".

So each photo was composed into a 900×1400 portrait canvas:
- **backdrop** — the same photo, cover-cropped, blurred (38) and darkened (0.62 brightness)
- **foreground** — the *complete, uncropped* photo scaled to full canvas width, positioned at
  40% height so the card's bottom text gradient falls over blur instead of over faces

This is the standard Instagram-reel letterbox treatment: nobody is cropped out, and the slot
is filled edge to edge. Script used: `sharp` (already a `devDependency`); it was a one-off and
the temporary script was removed after running.

### Files changed
**Added** (new files — nothing was overwritten):
- `public/assets/drills/reel-1-classroom-training-kanpur.jpg`
- `public/assets/drills/reel-2-selection-drive-cohort.jpg`
- `public/assets/drills/reel-3-live-mock-interview-drill.jpg`
- `public/assets/drills/reel-4-campus-drive-batch.jpg`

**Modified**:
- `src/data/mockData.ts` — only the `thumbnail` and `fileName` fields of the four
  `INSTAGRAM_STUDENT_REELS` entries. Titles, quotes, names, durations, view counts,
  Instagram links and `fallbackThumbnail` values are all unchanged.

### What was deliberately left alone
- The four original `IMG-2026*.jpg` files remain in place — `STUDENT_COMMUNITY_GALLERY`
  (same file, just below) still references three of them. Overwriting them would have
  silently changed the community gallery. Verified still intact after the change.
- `reelsSectionStorage.ts` priority order (custom upload → drill photo → default) was not
  altered, so the Classroom Photo Manager keeps working exactly as before.

### Verification
- Type check `npm run lint` (`tsc --noEmit`) — **passes, 0 errors**
- Production build `npm run build` — **succeeds**; all 4 new images emitted to `dist/assets/drills/`
- Browser check at 1440px and 430px: all 4 `<img>` elements report `naturalWidth 900 ×
  naturalHeight 1400` and `loaded: true`, i.e. the real files load and the Unsplash
  `fallbackThumbnail` no longer fires
- Whole-page image sweep: no broken images introduced. One pre-existing broken remote
  Unsplash URL (`photo-1534751516642-a1714f5a5467`) elsewhere on the page is unrelated to
  this change and was left as-is.
- Before/after screenshots: `verification-screenshots/before/` and `verification-screenshots/after/`
  (desktop + mobile). Note the "before" shots show the stock-photo defaults, which is the
  genuine repository state prior to this change.

### ⚠️ Important caveat for the client
`getMergedReelsList()` gives **locally uploaded images priority over the defaults** — by
design, so an admin's manual upload is never clobbered by a deploy. Anyone who previously
customised these four cards through the Classroom Photo Manager will keep seeing their old
uploads until they press **Reset** on those cards (or clear site data). On a fresh browser,
and for every new visitor, the new photos show immediately.

---
