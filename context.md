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
## 2026-09-10 — Resolve Vercel build log errors & warnings

### Trigger
Vercel deploy (commit `9938d84`) succeeded but emitted one error and several warnings.

### 1. `error: Unknown lockfile version` at `bun.lock:2:22` — FIXED
`bun.lock` declares `"lockfileVersion": 2` + `"configVersion": 1`, which is the **Bun 1.4**
lockfile format. Vercel's build image ships **Bun 1.3.14**, which only reads v0/v1, so it
printed `warn: Ignoring lockfile` and re-resolved every dependency from scratch.

**Impact:** builds were *not reproducible* — a transitive dependency could silently publish a
breaking patch and reach production without any change on our side. That is the real risk
here, not the log line.

Bun is not installed on this machine, so the lockfile could not be regenerated downward.
Per Vercel's own guidance there is no `.bun-version` file and no `packageManager` support for
Bun — the supported way to pin the build-phase Bun version is an Install Command override.

**Added `vercel.json`:**
```json
{ "installCommand": "bunx bun@1.4.2 install" }
```
Vercel's preinstalled Bun runs `bunx` to fetch 1.4.2, which understands the v2 lockfile.
This is the only key in the file, so all other Project Settings are left as-is.

> `--frozen-lockfile` was deliberately **not** used: `package.json` changed in step 2 below
> and `bun.lock` cannot be regenerated here, so a frozen install would hard-fail the build.
> Once someone with Bun 1.4 runs `bun install` and commits the refreshed lockfile, adding
> `--frozen-lockfile` would be a good hardening step.

### 2. `warn: Duplicate dependency: "vite"` — FIXED
`vite@^6.2.3` was listed in **both** `dependencies` (line 24) and `devDependencies` (line 35).
Removed the `devDependencies` entry; Vite stays in `dependencies` next to its siblings
(`@vitejs/plugin-react`, `@tailwindcss/vite`), matching the convention already used in this
project and guaranteeing it is installed no matter how devDependencies are treated.

### 3. `(!) Some chunks are larger than 500 kB` — FIXED
The app shipped as one 786.58 kB chunk. Added `build.rollupOptions.output.manualChunks` to
`vite.config.ts`, splitting vendor code by `node_modules` path.

| Before | After |
| --- | --- |
| `index.js` **786.58 kB** (gzip 219.00 kB) | `index.js` **363.47 kB** (gzip 75.37 kB) |
| | `react-vendor.js` 223.21 kB (gzip 69.23 kB) |
| | `map-vendor.js` 175.80 kB (gzip 66.57 kB) |
| | `icons-vendor.js` 24.20 kB (gzip 5.29 kB) |

Total bytes are unchanged; the win is that vendor chunks now stay cached in returning
visitors' browsers across deploys, and the warning is gone.

Two notes on how this was arrived at:
- The **object** form of `manualChunks` was tried first and did *not* work — it only captured
  bare entry modules, producing a 4 kB `react-vendor` (the app imports `react-dom/client`,
  not `react-dom`). The **function** form captures the whole dependency subtree correctly.
- A `motion-vendor` chunk was dropped after it built empty: `motion`, `@google/genai`,
  `express` and `dotenv` are all in `package.json` but **not imported anywhere in `src/`**,
  so none of them are in the bundle. Worth a future cleanup, left alone here as out of scope.

### 4. `Blocked 2 postinstalls` — reviewed, intentionally left alone
The packages with install scripts in this tree are `esbuild` (postinstall), `protobufjs`
(postinstall) and `@google/genai` (preinstall). Bun blocks these by default as a supply-chain
safety measure. Neither is required: modern esbuild resolves its platform binary through
`optionalDependencies`, and protobufjs's script only matters for its CLI. The successful
build is the proof. Adding `"trustedDependencies": ["esbuild"]` to `package.json` would
silence the note, but it trades a security default for cosmetics, so it was not done.

### Verification
- `npm run lint` (`tsc --noEmit`) — passes, 0 errors
- `npm run build` — succeeds, **no chunk-size warning**
- Production build served via `vite preview` and driven in a real browser:
  React mounts, **0 runtime errors**, all 5 tabs (Home, Programs, Jobs, Success Stories,
  Centres, ALC Partner) render, the `@svg-maps/india` map still draws from its new separate
  chunk, and all 4 new reel images load. Chunk splitting broke nothing.

### Files changed
- **Added** `vercel.json`
- **Modified** `package.json` — removed duplicate `vite` from `devDependencies`
- **Modified** `vite.config.ts` — added `build.rollupOptions.output.manualChunks`

---
## 2026-09-10 — Replace the 24 Success Story student photos with the real flyer headshots

### Request
Client supplied `mokkamamma-attachments/` (20 PNG selection flyers) and asked that every
success-story photo be replaced using them — **opening each image, reading the name printed
on it**, and matching it to the existing entry of that name. Explicitly: no mismatches, and
nothing else may break.

### Key finding — the photo slot is a headshot, not a flyer
`StudentFlyerCard.tsx` (poster variant) **recreates the BankPlus flyer in React**: it draws
the BankPlus header, the decorative SVG curves, the Instagram-verified badge, and prints the
student's name, role and bank itself. `studentPhoto` feeds only a small **square** frame
(`w-32 h-32 sm:w-36 sm:h-36`, `object-cover`).

Dropping the full 1080×1080 flyer PNG into that slot would shrink the whole poster into a
128 px square — unreadable name text inside the frame, with the UI printing the same name,
role and bank again directly underneath. That doubled-up look is visible in the screenshot
the client sent.

So each flyer's **passport photo was extracted** and used as `studentPhoto`. The UI supplies
the branding and captions, exactly as it was designed to.

### How the crops were produced
The portrait sits on a white field, with blue corner triangles, the BankPlus logo top-right
and caption text below — position and size differ per flyer, so a fixed crop was not viable.
Detection instead scans the central region for the tallest contiguous band of rows
containing a long unbroken run of non-white pixels, then measures that band's column extent.

Two flyers (509 Darshit Dwivedi, 514 Hardik Saxena) have subjects photographed on a **white
studio backdrop** that blends into the white page, so a single threshold failed on them. The
detector escalates its whiteness threshold (238 → 249 → 252 → 254) until a plausibly tall
block appears — all 20 then resolved correctly.

Each detected box was cropped square, biased 18% upward so the face centres rather than
being cut at the forehead, and written to `public/assets/students/<slug>.jpg` at 600×600.
A contact sheet of all 19 was reviewed visually before wiring anything up.

### Matching result
Full table in `verification-screenshots/photo-mapping.md`.

- **19 of 20** flyers matched a story by exact `studentName` and were applied.
- **1 flyer unused** — `518.png` is **Anjani Sharma**, a name that appears nowhere in
  `SUCCESS_STORIES`. Left unused rather than forced onto an unrelated student.
- **5 stories have no flyer** — Priya Prajapati, Gaurav Jaisawal, Saurabh Mishra,
  Lovely Gupta, Govind Trivedi — and keep their existing stock photos. Flyers needed.

Matching was on name only. Position/order was never used, so a missing flyer cannot shift
every subsequent photo onto the wrong person.

### ⚠️ Four bank discrepancies — site copy deliberately NOT changed
The name matches exactly in all four; only the bank printed on the flyer disagrees with the
bank in the site's story text. Changing the copy is a content decision, so it was left alone
and flagged for the client:

| Student | Bank on site | Bank on flyer |
| --- | --- | --- |
| Deeksha Singh | Kotak Mahindra Bank | Indiabulls Home Loans |
| Sashi Sharma | Axis Bank | HDFC Bank |
| Ashwini Kumar | Kotak Mahindra Bank | HDFC Bank |
| Gopi Chand | HDB Financial Services | HDFC Bank |

Note `Deeksha Singh` and `Deeksha Tiwari` are two different people with two separate flyers
(505 and 521); both were matched correctly and were not conflated.

### Files changed
- **Added** `public/assets/students/*.jpg` — 19 headshots, named by story slug so the
  filename itself states who it belongs to
- **Modified** `src/data/mockData.ts` — only the `studentPhoto` field of the 19 matched
  `SUCCESS_STORIES` entries. Names, roles, banks, salaries, hometowns, quotes, journeys and
  `originalFlyerFile` are all untouched.

`originalFlyerFile` was deliberately left as-is: it records the client's own original
archive filenames (`3.png`, `January 2019.png`, …) and overwriting it with the new
attachment numbers would destroy a reference only they can interpret.

### Verification
- `npm run lint` (`tsc --noEmit`) — passes, 0 errors
- `npm run build` — succeeds; all 19 headshots emitted to `dist/assets/students/`
- Automated cross-check: for all 24 stories, each `studentPhoto` path was re-parsed and
  asserted to (a) exist on disk and (b) have a filename slug whose first and last name-parts
  match that entry's `studentName` — **0 mismatches**, 19 local, 5 stock
- Browser: all 19 load at 600×600, `alt` text matches the filename in every case
- Poster variant, **Executive** variant (19 local photos, 0 broken) and the
  **View Interview Journey** modal (serves `/assets/students/aishwarya-tiwari.jpg`) all work
- Screenshots in `verification-screenshots/before|after/` — `wall-of-fame-row1`,
  `wall-of-fame-row2` (desktop) and `wall-of-fame-mobile`

### Pre-existing issues found (not introduced here, not fixed)
- **Lovely Gupta's** stock Unsplash URL (`photo-1534751516642-a1714f5a5467`) is dead and
  renders broken. She is one of the 5 with no flyer; her flyer would fix it.
- `StoryModal.tsx:18` seeds state with `story?.studentPhoto || ''`, so React logs
  *"An empty string was passed to the src attribute"* when the modal closes. Cosmetic
  console warning, pre-existing, untouched.

### ⚠️ Same localStorage caveat as the reels
`StudentFlyerCard` reads `getCustomPhoto(story.id)` **before** `story.studentPhoto`, so any
photo previously uploaded through the Photo Manager still wins on that browser. Use the
Photo Manager's reset (or clear site data) to see the new defaults. New visitors see them
immediately.

---
## 2026-09-11 — Fix Lovely Gupta's broken placeholder photo

### Request
Client asked for a suitable Unsplash photo for Lovely Gupta (Officer, HDFC Bank, Varanasi),
the one remaining story whose stock portrait rendered broken.

### Cause
Her `studentPhoto` pointed at `photo-1534751516642-a1714f5a5467`, which **404s** from
images.unsplash.com. Curl-tested all five stock URLs: the other four return 200, only hers
was dead. It was the last broken image on the page.

### Choice of replacement
Rather than pull an arbitrary new ID, the candidate pool was the portrait URLs **freed up**
when 19 students received their real flyer headshots — already present in this codebase,
already known to load. Six were confirmed 200 **and** no longer referenced anywhere in
`src/`, so reusing one creates no duplicate face on the site.

All six were downloaded and viewed as a contact sheet before choosing. Two were fashion/
beauty shots and two were casual — unsuitable for a bank placement card. The pick was
`photo-1567532939604-b6b5b0db2604` (previously Shivani Shrivastava's, freed when flyer
520.png replaced it):

- **head-and-shoulders framing** — crops cleanly into the card's small square
  (`w-32 h-32`, `object-cover`) with the face filling the frame, matching the 19 real
  passport headshots beside it
- neutral background, dark top — reads as a professional portrait
- the runner-up (`photo-1573496359142-b8d87734a5a2`) wears a blazer but is a wide seated
  shot whose face would shrink to a fraction of a 128 px square

### Files changed
- `src/data/mockData.ts` — **one line**, Lovely Gupta's `studentPhoto` only. Verified before
  writing that the URL being replaced belonged to her entry.

### Verification
- `npm run lint` — passes; `npm run build` — succeeds
- In-browser: her image loads at 450×675, and a sweep of all 34 images on the Success
  Stories page reports **0 broken** — previously 1
- Screenshot: `verification-screenshots/after/lovely-gupta-photo-AFTER.png`, showing her
  card framed consistently beside Deeksha Singh and Ashwini Kumar's real headshots

### ⚠️ Still a placeholder
This is a stock portrait standing in for a named real person, exactly as the site already
does for the other four students without flyers. It should be replaced as soon as Lovely
Gupta's actual flyer is supplied.

---
## 2026-09-11 — Final 5 student photos (all 24 now on real flyer headshots)

### Request
Client sent a second flyer batch (`mokkamamma-attachments (1)/`) covering the five students
who had no flyer, with one explicit override: *"use ashwini kumar for Govind Trivedi, rest
align with respective names."*

### Flyers received (5)
`516.png` was **byte-identical** (md5 `b35aa905…`) to the `516.png` already in the first
batch — re-sent deliberately so it could be used for Govind Trivedi. The other four were new
and were copied into `mokkamamma-attachments/` (now 24 flyers archived).

| Flyer | Name on flyer | Role / bank on flyer | Applied to |
| --- | --- | --- | --- |
| 499.png | Gaurav Jaisawal | Phone Banker · HDB Financial Services | story-gaurav-jaisawal |
| 503.png | Priya Prajapati | Officer · HDFC Bank | story-priya-prajapati |
| 512.png | Lovely Gupta | CRM · Indiabulls Home Loans | story-lovely-gupta |
| 513.png | Saurabh Mishra | Officer · HDFC Bank | story-saurabh-mishra |
| 516.png | **Ashwini Kumar** | Officer · HDFC Bank | **story-govind-trivedi** (client override) |

Three of the five (Gaurav Jaisawal, Priya Prajapati, Saurabh Mishra) match the site copy
exactly on name, role **and** bank.

### Method
Identical to the first batch: the same detector locates the passport photo on the flyer,
crops it square with an 18% upward bias, and writes 600×600 JPEG to
`public/assets/students/<slug>.jpg`. All five resolved at the base threshold (238) — no
white-backdrop escalation needed. Crops were reviewed on a contact sheet before wiring up.

### ⚠️ Govind Trivedi and Ashwini Kumar now share one photo
Because `516.png` is the source for both, `ashwini-kumar.jpg` and `govind-trivedi.jpg` are
the **same file** (md5 `4c4277ba…`). The same face therefore appears on two cards:
Ashwini Kumar (Assistant Manager, Kotak Mahindra) and Govind Trivedi (Junior Associate,
State Bank of India). Done exactly as instructed and flagged back to the client — if a
distinct photo of Govind Trivedi exists, it should replace this.

### Bank discrepancies — site copy still NOT changed
Two more added to the running list (now 6 total, see `photo-mapping.md`):
- **Lovely Gupta** — site: HDFC Bank / Officer · flyer: Indiabulls Home Loans / CRM
- **Govind Trivedi** — site: State Bank of India / Junior Associate · flyer used is Ashwini
  Kumar's (HDFC Bank / Officer), which is expected given the override

### Files changed
- **Added** 4 flyers to `mokkamamma-attachments/` (499, 503, 512, 513)
- **Added/updated** 5 files in `public/assets/students/` — `lovely-gupta.jpg` overwrites
  nothing (she was on a stock URL); the other four are new
- **Modified** `src/data/mockData.ts` — only the `studentPhoto` field of those 5 entries

### Verification
- Cross-check over all 24 stories: **24 local photos, 0 stock, 0 missing files**, every
  filename slug matching its `studentName`
- `npm run lint` passes; `npm run build` succeeds with all **24** headshots in `dist/`
- Browser: the 5 cards load at 600×600, **0 unsplash images and 0 broken images** remain on
  the Success Stories page (previously 5 stock, and earlier 1 broken)
- Screenshots: `verification-screenshots/before/final5-students-BEFORE.png`,
  `after/final5-students-AFTER.png`, `after/govind-trivedi-card-AFTER.png`

### Note
`photo-1567532939604-b6b5b0db2604`, the Unsplash placeholder picked for Lovely Gupta on
2026-09-11, is now unused — her real flyer replaced it as intended.

---
## 2026-09-11 — Campus Life gallery (last section of Success Stories)

### Request
Client's *"These images are not done"* (68633.jpg) referred back to his 2026-09-10 4:38 PM
message **"Again in success stories page last"** (67802.jpg) — the **last section** of the
Success Stories page, i.e. `STUDENT_COMMUNITY_GALLERY` / `#bankplus-campus-life-section`.
He confirmed to use the photos already in `images/` (the same 7-file batch sent with the
reels instruction, under his blanket rule *"match with what you see" / "what looks best"*).

### Before
All 6 cards were Unsplash stock (western students in a library, etc.). Cards 3 and 4 pointed
at the **same file** (`classroom/IMG-20260515-WA0024.jpg`), so two cards rendered identically.

### Mapping (caption-matched)
| Slot | Tag / caption | Source | Note |
| --- | --- | --- | --- |
| gallery-1 | Classroom Life — mock interview & GD practice | `64625.jpg` | seated classroom, "Know Your Role in Branch Banking" |
| gallery-2 | Interview — Panel Mock Interview | `64641.jpg` | the only true mock-interview panel in the batch |
| gallery-3 | 1-on-1 Mock Prep — with former RBI/SBI CGMs | `64655.jpg` | senior faculty leading a live session |
| gallery-4 | Banking Systems Lab — Core Banking/Finacle | `64640.jpg` | branch-simulation lab, Teller counter + screens |
| gallery-5 | Selection Moment — felicitation / letter handover | `3444.jpg` | placed cohort, "1000 Vacancies" banner |
| gallery-6 | Alumni Network — gathering of placed POs | `64619.jpg` | 1.45x tighter crop, see below |

### Aspect handling
The slot is `h-52` full-width with `object-cover` — roughly **1.9:1 landscape**, which suits
these landscape sources directly (unlike the 9:14 reel slot, which needed blurred-fill).
Each was cropped to 1200×624: sources wider than the slot were trimmed at the sides, taller
ones trimmed top/bottom with a 25% upward bias so heads survive.

### Known limitation — only 5 distinct scenes for 6 slots
Of the 7 photos in `images/`, `64619`/`64640` and `3486`/`3444` are near-duplicate frames of
the same two moments, so the batch holds **5 distinct scenes**, and 4 of them already appear
in the reels section higher up the same page. Some repetition was therefore unavoidable and
the client was told so before proceeding.

Mitigations applied:
- Only **one** member of the `64619`/`64640` pair is used in the gallery (`64640`); `64619`
  stays exclusive to the reels.
- Both members of the `3486`/`3444` pair are used (slots 5 and 6), so `gallery-6` was given a
  **1.35× tighter crop** to read as its own photograph rather than a duplicate of slot 5.
- Nothing in the batch actually depicts an alumni gathering or a Finacle/systems lab; the
  nearest-fitting scenes were used and the captions left untouched.

### Files changed
- **Added** `public/assets/campus/gallery-{1..6}-*.jpg` (6 files, 1200×624)
- **Modified** `src/data/mockData.ts` — only `image` and `fileName` on the 6
  `STUDENT_COMMUNITY_GALLERY` entries. Captions, tags, ids and `fallbackImage` untouched.
- The old stock files under `public/assets/drills/` and `public/assets/classroom/` were left
  in place (nothing else references them, but they are harmless and reverting is trivial).

### Verification
- `npm run lint` passes; `npm run build` succeeds with all 6 campus files in `dist/`
- Browser: all 6 load at 1200×624; the Success Stories page reports **0 Unsplash images and
  0 broken images** across the whole page
- Screenshots: `verification-screenshots/before/campus-life-gallery-BEFORE.png`,
  `after/campus-life-gallery-AFTER.png`, `after/campus-life-gallery-mobile-AFTER.png`

---
## 2026-09-11 — Campus Life gallery: reorder so no two consecutive cards repeat

### Request
Client (in Urdu): *"images ko aisy lagao k 1st and 2nd different hon, 2nd and 3rd different
hon, 3rd and 4th, 4th and 5th, and finally 5th and sixth"* — i.e. **every consecutive pair
of cards must show a different scene**.

### Problem with the previous order
Slots 5 and 6 were `3486.jpg` and `3444.jpg` — two frames of the **same** group photo, sitting
directly next to each other. A 1.35× crop had been applied to slot 6 to soften it, but they
were still the same moment side by side.

### The five distinct scenes
| Group | Files | Scene |
| --- | --- | --- |
| A | `64625` | seated classroom, blue striped curtains |
| B | `64641` | mock interview semicircle |
| C | `64655` | faculty leading a session, "HIRING" banner |
| D | `64640` + `64619` | formal cohort, branch-simulation lab (near-dupes) |
| E | `3486` + `3444` | large group, "1000 Vacancies" banner (near-dupes) |

Six slots, five scenes — so exactly one group must appear twice. The fix is to place that
repeat **non-consecutively**.

### New order: A · B · C · D · E · D
| Slot | Tag | Source | Group |
| --- | --- | --- | --- |
| 1 | Classroom Life | `64625` | A |
| 2 | Interview | `64641` | B |
| 3 | 1-on-1 Mock Prep | `64655` | C |
| 4 | Banking Systems Lab | `64640` | D |
| 5 | Selection Moment | `3444` | E |
| 6 | Alumni Network | `64619` | D (1.45× tighter crop) |

Consecutive check: 1≠2 ✓ 2≠3 ✓ 3≠4 ✓ 4≠5 ✓ 5≠6 ✓. The repeated D pair sits at slots 4 and 6,
separated by slot 5 — and slot 6 is cropped 1.45× tighter so the two read as different
photographs even when seen in the same row on desktop.

Changing slot 5 from `3486` to `3444` also has a side benefit: `3486` stays **exclusive to the
reels** section, cutting cross-section repetition from 4 photos to 3.

### Why `src/data/mockData.ts` is untouched by this change
Only the two JPEG files were regenerated — the output filenames
(`gallery-5-selection-moment.jpg`, `gallery-6-alumni-network.jpg`) are unchanged, and those
names describe the caption slot rather than the source photo. Verified the dev server serves
the new bytes (135,291 and 144,633) rather than cached copies.

### Verification
- `npm run lint` passes; `npm run build` succeeds with all 6 campus files in `dist/`
- Browser (cache-busted to defeat the identical filenames): all 6 load, 0 broken images
- Screenshots refreshed: `after/campus-life-gallery-AFTER.png` and
  `after/campus-life-gallery-mobile-AFTER.png`

---
## 2026-09-11 — Official brand logo in the header and footer

### Request
Client supplied `public/bankplus-logo.png` and asked for it in the **top-left of the menu**
and the **top-left of the footer**, without breaking anything else.

### Starting state
The client had already deleted five older logo files from `public/`
(`bankplus-logo-dark{,-solid}.png`, `bankplus-logo-{dark,light}.svg`, `bankplus-logo-light.png`).
Checked first: **none of them were referenced anywhere in `src/`**, and the favicon points at
a different file (`public/assets/bankplus-logo.svg`) which still exists — so the deletions
broke nothing.

`BankPlusLogo.tsx` does not use an image at all by default; it **draws the logo as inline
SVG**, with a `customLogo` branch in front of it for logos uploaded through the Logo Manager.

### Asset prep — the supplied PNG could not be used as-is
`bankplus-logo.png` is 1622×1091 but the artwork only occupies a 1006×518 region — **29.4% of
the canvas**, off-centre. Dropped into the `h-10` slot it would have rendered at roughly half
size and visually misaligned. Alpha was verified genuinely transparent (corners `a=0`), which
matters because the footer places the logo on a white chip inside a dark bar.

Trimmed to the artwork bounds and exported at 800×412 as
`public/assets/bankplus-logo-official.png` (65 KB). **The client's original file is left
untouched** at `public/bankplus-logo.png`.

### Implementation
Added an opt-in `officialAsset` prop to `BankPlusLogo`, rather than swapping the component's
default. Render priority is now:

1. `customLogo` from localStorage (Logo Manager upload) — **unchanged, still wins**
2. `officialAsset` PNG — new, only where explicitly requested
3. the drawn inline SVG — unchanged default everywhere else

`Navbar.tsx` and `Footer.tsx` pass `officialAsset`. `StudentFlyerCard` (the logo on all 24
story cards) and the `LogoManagerModal` previews were deliberately **not** changed, since the
client named only the menu and the footer.

### Layout bug found and fixed during verification
First render put the header logo at **9×48 px**. The header row is
`flex items-center justify-between` and the logo wrapper is a shrinkable flex item, so
`max-w-full` on the image let the nav links squeeze it to almost nothing. Fixed by dropping
`max-w-full` and adding `shrink-0` on the image and its wrapper in the `officialAsset` branch,
plus `shrink-0` on the Navbar's logo container. Now 93×48 on desktop, 78×40 on mobile.
This only affects the image branch — the SVG branches are untouched.

### Verification
- `npm run lint` (`tsc --noEmit`) passes; `npm run build` succeeds, both
  `assets/bankplus-logo-official.png` and the original `bankplus-logo.png` ship
- Browser: exactly **2** official logos on the page — one inside `<header>`, one inside
  `<footer>` — both loading, 0 broken images anywhere
- Responsive: 1440px → 93×48, 390px → 78×40, **no horizontal overflow at either width**
- **Logo Manager regression test**: injected a custom logo into
  `bankplus_custom_logo_data` → official count dropped to 0 and 5 custom logos rendered
  (header, footer and story cards); removing it restored the official logo. The upload
  override still takes priority exactly as before.
- Screenshots: `after/logo-header-desktop-AFTER.png`, `after/logo-footer-desktop-AFTER.png`,
  `after/logo-header-mobile-AFTER.png`

### Offer left open
The same logo also appears on the **24 success-story flyer cards** (`StudentFlyerCard`) and in
the Logo Manager preview, both still on the drawn SVG. Switching those is a one-word change
(`officialAsset` on that call site) if the client wants full brand consistency.

---
