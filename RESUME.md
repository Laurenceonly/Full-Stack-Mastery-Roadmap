# Resume and work log

Last updated: 2026-10-23

## Read first

This file is the session handoff. Read [KNOWLEDGE.md](KNOWLEDGE.md) for the project overview and [ARCHITECTURE_AND_PROJECT_PLAN.md](ARCHITECTURE_AND_PROJECT_PLAN.md) for requirements. Verify the current files and Git state before continuing.

## Current checkpoint

- Working branch: `feat/typed-catalog`, created from local `main` at `ad7227d`.
- Checkpoint: local commit titled `feat: add typed curriculum and neon roadmap workspace` on `feat/typed-catalog`. Use `git log -1` for its hash. No push, PR, merge, or deployment has been performed.
- V2a typed catalog and validation are implemented. V2b grouped browsing and the reference-based neon redesign are implemented and browser-checked locally. Independent UI review returned ship with no material findings.
- Catalog: 13 topics, 12 required and 1 optional (Tailwind CSS), 38 resource records, 11 named stages.
- All nine original V1 topic IDs remain. New IDs: `html`, `css`, `javascript`, `tailwind`.
- Latest focus behavior: subject pages enlarge and center their group; overview stays compact. Session wrapped up at user request; resume from this saved checkpoint next time.
- Latest UI refinements: dark theme only, no theme toggle, no redundant bottom statistics bar, and stable scrollbar gutters for page/tab alignment.
- Progress still uses boolean values under `roadmap-progress`; no V2c storage migration has happened.

## User direction

- Include HTML, CSS, Tailwind CSS, and JavaScript explicitly.
- Keep `RESUME.md` as a durable log of completed work and how to resume.
- Keep `KNOWLEDGE.md` as an overview of the project and its purpose.
- Replace the sparse graph-first presentation with a clean theme and closely grouped subjects such as frontend and backend.
- Use consistent spacing, alignments, and gaps; remove unnecessary words and decorative filler.
- Follow the supplied dark neon dashboard image, preserved at `docs/references/neon-roadmap-dashboard.png`.
- Include recognizable technology/tool logos, multiple resources per topic, and verified free certificate options. Remove prerequisites from the topic guide.

## Work log

### 2026-10-23 — Catalog foundation and project documentation

- Read the architecture plan and inspected the actual app, package scripts, and Git state. The architecture document existed as an untracked root file and was preserved there.
- Created `feat/typed-catalog` after the sandbox blocked Git metadata writes; branch creation succeeded with approval.
- Added typed topic, stage, catalog, resource, and learning-status contracts.
- Normalized topics/resources and added named stages. Each topic has objectives, practice tasks, completion criteria, and resource/prerequisite IDs.
- Added HTML → CSS → JavaScript → TypeScript dependencies and an optional CSS → Tailwind branch. Renamed the existing TypeScript topic title while preserving its ID and stored completion association.
- Added validation for duplicate/invalid IDs, missing references, self-dependencies, cycles, missing content, effort ranges, safe resource URLs, and verification dates.
- Added a catalog-to-V1 adapter, prerequisite-driven graph positioning, and separate required/optional completion calculations.
- Added Node's built-in test runner without new dependencies. Production builds run tests first through `prebuild`.
- Added `KNOWLEDGE.md`, this log, continuation instructions in `AGENTS.md`, a client-first ADR, and a project-specific README. Updated the architecture document's implementation note and actual location.
- Resource access remains `null`, certificate status remains `unknown`, and verification dates are omitted. External resource contents/costs were not independently checked.

### 2026-10-23 — Grouped interface and theme

- User requested a theme and grouping after reviewing the spread-out graph.
- Added browsing groups: Web foundations, Frontend, Backend & data, Mobile, Quality & delivery.
- Made grouped topic lists the primary view; retained the dependency map as an alternate view.
- Added track navigation, topic search, completion filtering, a resettable empty state, and a suggested next required topic based on completed prerequisites.
- Added a navy navigation rail and light/dark workspace themes, with shared spacing and alignment rules. Removed slogans and redundant helper text after the user's clarification.
- Topic guides now display objectives, practice, completion criteria, prerequisites, resources, and the completion action. Narrow layouts show guides inline; desktop uses a detail panel.
- Completion writes preserve the original V1 key. Invalid existing progress is left untouched on load; storage failures show feedback rather than crashing. An explicit completion change replaces malformed saved progress, with the warning shown first.
- Added `PRODUCT.md` for durable product facts. Design documentation and final validation results will be recorded below before handoff.

### 2026-10-23 — Reference-based neon design, resources, certificates, and logos

- The user supplied a neon dashboard reference, superseding the earlier light-workspace assumption. Preserved the image at `docs/references/neon-roadmap-dashboard.png` for future sessions.
- Rebuilt the shell around a dark canvas, colored branch groups, compact connected topic rows, top search/progress/theme controls, left navigation, and a right topic guide. A light theme remains available.
- Split Backend and Database into separate groups, making six groups. Actual counts are 13 topics, 12 required, 1 optional, 38 resources, and 7 verified free-certificate courses. The reference image's example counts were not copied.
- Added Overview, Resources, Practice, and Certificates sections to the topic guide, plus a searchable Free certificates catalog. Removed the prerequisite section at the user's request; dependency data still supports validation, suggested next topics, and the alternate graph.
- Every topic now has at least two resource choices. Added Google web.dev, GitHub Learn, provider documentation, playgrounds, and university course modules.
- Checked official provider evidence for five freeCodeCamp certifications, the Full Stack Open core certificate, and the free Harvard CS50 Web certificate. Stored verification dates, source links, and completion rules. The paid edX verified credential is explicitly distinguished from the free CS50 certificate. Individual extension-module certificate claims remain unknown.
- Added 19 locally bundled Simple Icons SVGs, mapped to stack technologies and tools; included provenance in `public/logos/README.md`. No new runtime dependency was installed.
- Improved text sizes and tablet group alignment after the first screenshot pass. Fixed a hidden skip-link screenshot artifact. Required topics sort before optional topics within groups.
- Created current product/design context and updated this log, the project overview, README, and architecture implementation notes. Final design documentation is in `DESIGN.md` and `.impeccable/design.json`; its structure and JSON checks passed. The documentation handoff changed no UI source. The user-requested changes supersede conflicting suggestions in the original planning baseline.

### 2026-10-23 — Dark-only appearance and stable page alignment

- Removed the light/dark toggle, appearance state, light-palette CSS, and theme preference reads/writes. The app and alternate graph now use the neon dark appearance only. Older `roadmap-theme` values are ignored; learning-progress data is untouched.
- Removed the redundant bottom Topics / Sections / Completed / To learn statistics bar and its CSS. Overall core progress remains in the header.
- Added `scrollbar-gutter: stable` to the document root, with an `overflow-y: scroll` fallback, so short and tall pages retain the same viewport layout width. Reserved the internal topic-guide gutter as well so section changes do not shift its text.
- Updated KNOWLEDGE.md, PRODUCT.md, DESIGN.md, its machine-readable sidecar, and the local browser scripts to reflect these requests.
- Final checks: lint passed; production build passed with all 17 Node tests. Focused Chromium check passed: grouped page did not scroll vertically, certificates page did, and the x/y/width values of the header, brand, search, header progress, navigation, main content, and topic panel stayed equal within 0.5px. Empty results also preserved widths; topic-guide section changes preserved the scroller width.
- Verified no theme toggle or bottom statistics bar, and confirmed a legacy light preference cannot change the fixed dark appearance. Phone/tablet checks at 390px and 768px had no document-level horizontal overflow; desktop was checked at 1536px. Refreshed and visually opened those three screenshots. No page errors during the focused run.
- The initial browser retry found the preview server had stopped after the interrupted turn. Restarted Vite at `http://127.0.0.1:5173/`; the subsequent focused run passed. Its local script is `output/playwright/dark-only-layout.js`.
- The earlier independent review and full interaction smoke cover the prior baseline; this follow-up received the focused checks above. The old light-theme screenshot is historical and does not represent the current UI.

### 2026-10-23 — Larger centered subject pages; session wrapped up

- User requested larger boxes centered on each subject page, then asked to wrap up and continue next time after saving progress.
- Selecting any of the six subject navigation items now displays one enlarged group centered horizontally and vertically in the learning canvas. Desktop summary cards are 340px high, topic rows at least 72px high, and typography/logos are larger. The overview stays compact.
- The heading reflects the selected subject. Changing subject selects a relevant required topic for the right guide when the previous selection belongs elsewhere.
- Tablet focus views scale down; phones stack a full-width 220px-tall summary above larger topic rows. Inline topic details remain usable.
- Final lint passed. Final production build passed with all 17 Node tests. Browser assertions passed for every subject: horizontal and vertical center offsets were both exactly 0px; each desktop summary was 340px and each tested row 72px. Checked no horizontal overflow at 320/390/768/1536px, mobile inline details, relevant guide selection, and the unchanged six-group overview.
- Captured and visually opened focused-desktop.png, focused-tablet.png, and focused-mobile.png in output/playwright/. The focused browser script is output/playwright/focused-track.js (local ignored artifacts).
- Updated KNOWLEDGE.md, PRODUCT.md, DESIGN.md, and the design sidecar. Source files are saved locally on feat/typed-catalog; no commit, push, PR, merge, or deployment was performed.
- Session ends here at the user's request. Next session: read this file and inspect Git state; review the saved UI checkpoint before starting V2c four-level progress and versioned persistence. Do not automatically start a new milestone or reopen the theme/design choices.

### 2026-10-23 — Local checkpoint commit

- User explicitly requested committing the completed work with the supplied commit message.
- Saved this checkpoint on `feat/typed-catalog` under `feat: add typed curriculum and neon roadmap workspace`, including the source, tests, logos, reference image, and documentation.
- Prior passing lint, build, 17 tests, and browser checks remain the validation evidence; no application code changed during the commit step.
- Updated README.md with the finished features, actual overview/focused screenshots, Node 24 setup commands, architecture map, validation, and remaining milestones. Included the two screenshots under docs/screenshots/.
- Local browser outputs and temporary commit-message files remain ignored. No remote push or deployment was requested.
- Next session: inspect `git status` and `git log -1`, read this log, then continue from the saved checkpoint.

## Verification

- Node version: `v24.22.1`.
- `npm.cmd run lint`: passed on final source.
- `npm.cmd run build`: passed on final source; includes 17 passing Node tests through `prebuild`. Production JS bundle: about 438.18 kB (138.31 kB gzip).
- Automated browser smoke: passed in Chromium at 1536px desktop, 768px tablet, and 390px phone widths. Checked six groups/13 topics, local logo loading, no prerequisite guide, multiple resources, certificate catalog/search/evidence links, topic tabs, subject/status filters, empty state reset, completion persistence across reload, optional denominator, light/dark, alternate graph, Ctrl K and representative keyboard focus. No page errors were reported during the fresh smoke runs, and narrow layouts had no document-level horizontal overflow.
- Browser test data was restored afterward; the test did not leave artificial completion records in the browser.
- Screenshots and the local smoke script are in `output/playwright/` (ignored artifacts). Captures include dark/light desktop, certificate catalog, phone default/expanded details, and tablet. They were opened for visual verification.
- Impeccable mechanical detector ran once on the UI source and returned `[]`; design hooks also reported no deterministic issues.
- Independent finish review: `ship`, no material findings. It reviewed the pinned reference, all six captures, code, and product context. This was a screenshot/code review, not a replacement for browser tests or measured contrast auditing.
- Nonblocking UI observations: expanded tablet details leave space beside the inline guide; later mobile navigation items require horizontal scrolling. Both remain reachable. No further redesign was requested by the reviewer.
- Tests used Node `v24.22.1`. Windows PowerShell blocks `npm.ps1`; use `npm.cmd`, without changing execution policy.
- A temporary UTF-8 encoding build failure during development was corrected before the passing final build.
- No real-device testing, complete screen-reader audit, CI workflow, deployment, or versioned progress migration has been performed.

## Remaining work and next step

The requested local implementation is complete and checked. The user authorized a local checkpoint commit titled `feat: add typed curriculum and neon roadmap workspace`. No PR, push, merge, or deployment has been performed. The local preview is available at `http://127.0.0.1:5173/` while the Vite process is running; otherwise start it with `npm.cmd run dev -- --host 127.0.0.1`.

Next implementation milestone: V2c four-level status and versioned persistence with safe migration, reset, and validated export/import. Keep the original `roadmap-progress` key through migration. A full accessibility audit and real-device checks remain follow-up quality work. Expand umbrella topics into detailed curriculum in V2d. CI and deployment remain V2e.

Do not introduce accounts or a backend without a validated need. Do not mark later milestones complete because the catalog contracts or UI placeholders exist.

## Updating this log

At each session end, append a dated entry with the change, reason, actual check results, limitations, branch/commit/PR context, and one concrete next step. Refresh the current checkpoint. Keep earlier entries and never record secrets. Update `KNOWLEDGE.md` when capabilities or architecture change.
