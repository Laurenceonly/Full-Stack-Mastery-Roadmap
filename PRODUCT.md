# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Learners following a path toward independent full-stack engineering, as described in the architecture plan the user asked to implement.

## Product Purpose

Help a learner choose the next topic, understand prerequisites, practice concrete skills, and track progress. The app also serves as an engineering portfolio project.

## Operating Context

Browser-based learning and reference on desktop and mobile. The user has requested a cohesive theme and closer grouping by subjects such as frontend and backend, finding the existing graph too spread out.

## Capabilities and Constraints

React, TypeScript, Vite, Tailwind CSS, and React Flow are already installed. The current catalog contains 13 topics, including the explicitly requested HTML, CSS, JavaScript, and Tailwind CSS. Preserve all nine V1 IDs and the device-local `roadmap-progress` key. V2 has no backend, accounts, or synchronization. Keep unknown resource claims unknown.

Group browsing must remain usable by keyboard and on small screens. The graph may be an alternate view. Progress, topic details, and resource access remain available. The user explicitly requested that prerequisites not appear in the topic panel; dependency metadata stays internal to validation, recommendations, and the alternate graph.

Every topic must offer multiple learning resources. Show free certificates only with verified provider evidence and requirements. Include recognizable technology and tool logos.

The user subsequently requested removing the light/dark toggle and the redundant bottom Topics/Sections/Completed/To learn statistics bar. Keep the neon dark theme only. Page and topic-section changes must preserve horizontal alignment when scrollbars appear or disappear.

Selected subject pages must enlarge and center the group, topic rows, text, and logos. Preserve the compact full-roadmap overview. On phones, use a full-width stacked focus layout. The user requested wrapping up this session and continuing later after saving the current checkpoint.

## Evidence on Hand

The typed catalog, existing V1 application, and architecture plan are the source material. `KNOWLEDGE.md` is the project overview; `RESUME.md` records implementation sessions. Do not invent learners, testimonials, or mastery results.

The user supplied `Neon Full-Stack Mastery Roadmap Dashboard.png` as the visual reference. Its dark surfaces, colored subject branches, compact topic lists, header search/progress, and right-side topic panel supersede the earlier light-workspace assumption. Keep consistent alignments/gaps and remove unnecessary copy. Use actual catalog counts rather than the image's illustrative statistics.

## Product Principles

- Teach foundational skills before framework-specific tools.
- Group related topics so the learning path can be understood at a glance.
- Show practice and completion evidence alongside learning resources.
- Preserve progress through content and presentation changes.
