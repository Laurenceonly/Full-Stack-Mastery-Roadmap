# Project knowledge

## What this project is

Full-Stack Mastery Roadmap is an interactive learning guide for becoming an independent full-stack engineer. It helps learners choose a skill, find learning resources, practice it, and track completion. Its development also serves as an engineering portfolio project.

The current product is a single-user web application. Progress stays in the current browser and device. There are no accounts, backend services, or cross-device synchronization.

## Learning path

Planning, HTML, CSS, and JavaScript lead into TypeScript, React/Next.js, Node.js/Express, PostgreSQL/Prisma, API integration and security, React Native/Expo, testing, and deployment. Tailwind CSS is an optional branch after CSS fundamentals.

The catalog has 13 topics: 12 required and 1 optional. Topics are still broad; later curriculum work will break them into smaller skills. Security, accessibility, testing, Git, and documentation should recur throughout the journey.

Each topic has a stable ID, named stage, summary, objectives, difficulty, optional/required flag, practice tasks, completion criteria, and resource references. Dependency IDs remain available to domain logic and the alternate graph. At the user's request, the topic panel does not display prerequisites.

## What works today

- A dark neon roadmap based on the user's [visual reference](docs/references/neon-roadmap-dashboard.png), using a single neon dark theme.
- Six subject groups: Web foundations, Frontend, Backend, Database & ORM, Mobile, and Quality & delivery.
- Compact connected topic rows with recognizable technology and tool logos bundled locally.
- Search, subject navigation, completion filters, and an alternate interactive dependency graph. Selecting a subject opens a larger centered focus view; the full overview stays compact.
- A topic guide with Overview, Resources, Practice, and Certificates sections. Desktop uses a right panel; mobile uses inline details.
- At least two learning resources per topic, with 38 normalized resource records overall.
- Seven verified free-certificate courses, available through the Free certificates navigation item and relevant topic guides. Provider evidence, dates, and requirements are stored with the records; see [resource verification](docs/RESOURCE_VERIFICATION.md).
- Completion actions saved as V1 booleans under `roadmap-progress`, with separate required/optional totals. The overall percentage uses required topics only.
- A suggested next required topic based on completed dependencies, and Ctrl/Cmd K to focus search.
- Catalog, dependency, graph-position, progress, group-membership, certificate-metadata, and logo checks run before production builds.

A course completion certificate is distinct from a paid verified credential. No certificate is promised for a technology just because a related full-course certificate exists. Unknown claims remain unknown.

## Architecture

React, TypeScript, Vite, Tailwind CSS, React Flow (`@xyflow/react`), and Lucide icons. V2 remains client-first and produces static files. Learning backend technologies does not require adding a backend to the roadmap app.

| Location | Responsibility |
| --- | --- |
| `src/data/catalog.ts` | Assemble and validate the canonical catalog. |
| `src/data/topics/` | Topics with learning content and dependency/resource references. |
| `src/data/resources/` | Resource metadata, including certificate evidence. |
| `src/data/stages.ts` | Eleven named learning stages; some await detailed topics. |
| `src/data/tracks.ts` | Six browsing groups spanning those stages. |
| `src/data/technologies.ts` | Technology/tool logo associations. |
| `public/logos/` | Locally bundled Simple Icons SVGs and provenance. |
| `src/types/roadmap.ts` | Catalog, topic, resource, stage, and compatibility contracts. |
| `src/lib/catalog-validation.ts` | IDs, references, cycles, learning content, URLs, and certificate evidence. |
| `src/features/roadmap/graph.ts` | Deterministic positions based on dependency depth. |
| `src/data/roadmap.ts` | Retained compatibility adapter for the V1 data shape. |
| `src/domain/progress.ts` | Required/optional completion totals. |
| `src/components/` | Topic guide, certificate cards, and technology logos. |
| `src/App.tsx` | Application state, grouped/map views, navigation, search, and V1 persistence. |
| `src/index.css`, `src/App.css` | Theme tokens and responsive layout. |
| `tests/` | Node's built-in test runner; no additional test dependency. |

Preserve IDs when editing content: stored completion refers to them. Keep content, domain calculations, graph adaptation, and UI separate. Group branches show topic membership; the alternate graph shows actual dependencies.

The implemented visual system is recorded in [DESIGN.md](DESIGN.md), with machine-readable tokens in `.impeccable/design.json`.

Subject pages enlarge the group card, topic rows, text, and logos. On desktop the card is 340px tall and topic rows are at least 72px; phones stack the enlarged card above full-width topic rows. Subject navigation also selects a relevant topic for the guide.

The header carries the overall progress summary. The redundant bottom statistics bar and theme toggle have been removed. The viewport and topic-panel scroller reserve scrollbar space so switching pages or topic sections keeps columns aligned. Old `roadmap-theme` preferences are ignored; saved learning progress is preserved.

## Planned work

V2c adds four learning statuses, versioned storage, safe V1 migration, reset, and validated export/import. V2d expands the curriculum and resource coverage. V2e adds CI, component/E2E suites, deployment, and release documentation. Any backend/account/sync work remains conditional on a demonstrated need.

## Continuing development

Read [RESUME.md](RESUME.md) for the actual checkpoint, checks, limitations, and next task. Read [ARCHITECTURE_AND_PROJECT_PLAN.md](ARCHITECTURE_AND_PROJECT_PLAN.md) for the larger plan, [PRODUCT.md](PRODUCT.md) for current product requirements, and [README.md](README.md) for commands. See [ADR-001](docs/ADR-001-client-first.md) for the client-first persistence decision.

Update this overview when capabilities, architecture, or curriculum scope change. Append individual sessions to `RESUME.md` and keep its current checkpoint accurate.
