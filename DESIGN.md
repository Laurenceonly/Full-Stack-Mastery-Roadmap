---
name: Full-Stack Mastery Roadmap
description: Compact subject-connected learning workspace
colors:
  ground: "#080d16"
  paper: "#0b121e"
  raised: "#111b2a"
  ink: "#eef2fb"
  muted: "#a0aec5"
  line: "#233044"
  accent: "#a77aff"
  selected: "#21163f"
  success: "#1bdfaa"
  blue: "#34bdff"
  violet: "#a578ff"
  green: "#1bdfaa"
  amber: "#ffc25c"
  pink: "#f77bce"
  cyan: "#24d9e5"
  completion-start: "#6837e5"
  completion-end: "#5121ce"
  completion-ink: "#fff"
  completion-complete: "#09674f"
typography:
  headline:
    fontFamily: '"Aptos", "Segoe UI", sans-serif'
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.015em"
  title:
    fontFamily: '"Aptos", "Segoe UI", sans-serif'
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.35
  summary:
    fontFamily: '"Aptos", "Segoe UI", sans-serif'
    fontSize: "14px"
    lineHeight: 1.8
  body:
    fontFamily: '"Aptos", "Segoe UI", sans-serif'
    fontSize: "12px"
    lineHeight: 1.75
  label:
    fontFamily: '"Aptos", "Segoe UI", sans-serif'
    fontSize: "11px"
    fontWeight: 600
rounded:
  micro: "4px"
  select: "6px"
  row: "7px"
  action: "8px"
  control: "9px"
  guide: "13px"
  track: "14px"
spacing:
  micro: "4px"
  compact: "8px"
  control: "12px"
  panel: "16px"
  comfortable: "20px"
  branch: "24px"
  section: "32px"
  group-row: "40px"
  wide-group: "48px"
components:
  button-completion:
    textColor: "{colors.completion-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "11px"
  button-completion-complete:
    backgroundColor: "{colors.completion-complete}"
    textColor: "{colors.completion-ink}"
    rounded: "{rounded.action}"
  button-icon:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    rounded: "{rounded.control}"
    size: "38px"
  input-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "38px"
  navigation-item:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "12px 10px"
  navigation-item-active:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  topic-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "7px 9px"
  optional-tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.micro}"
    padding: "1px 4px"
  topic-guide:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.guide}"
    padding: "16px"
  certificate-card:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px"
---

# Design System: Full-Stack Mastery Roadmap

## Overview

**Creative North Star: "The Connected Learning Workspace"**

A compact navy workspace makes subject branches, technology marks, and the selected topic guide the visual anchors. Six neon subject colors identify the learning groups; restrained glow and a dotted canvas support the map without competing with its labels. This is the implemented interpretation of the user-pinned neon dashboard reference.

The workspace uses the neon dark theme only. Density follows the task: compact desktop rows expose the path, while small screens enlarge touch targets and place the guide inline. Actual learning content and progress provide the interface copy; decorative slogans and illustrative statistics are excluded.

**Key Characteristics:**

- Neon dark navy theme only; no theme toggle or stored appearance preference.
- Six subject colors and compact branch-connected rows.
- Local SVG technology marks and clear selected/completed states.
- Aligned track summaries, shared gaps, and an adjacent or inline topic guide.

## Colors

The palette combines dark navy neutrals with bright subject colors, with a single shared semantic token system. Frontmatter values are normative; the source variables live on the workspace in src/index.css.

### Primary

- **Violet accent:** brand emphasis, search caret, selection text highlight, and secondary links. The completion action uses its own fixed violet gradient.
- **Selection blue:** selected topic outlines, focus rings, utility icons, and resource accents.
- **Completion green:** actual completion, saved-device status, and verified free-certificate labels.

### Secondary

- **Subject violet, blue, green, amber, pink, and cyan:** Web foundations, Frontend, Backend, Database & ORM, Mobile, and Quality & delivery respectively. Each branch derives its border, faint fill, connector, and progress bar from its subject color.
- **Selected violet surface:** active navigation, view choices, and detail tabs.

### Neutral

- **Ground:** page, header, navigation, and exterior guide background.
- **Paper:** topic rows, search, controls, and the topic guide.
- **Raised:** resource rows, certificate cards, and hover surfaces.
- **Ink / muted:** primary labels versus explanatory text, counts, metadata.
- **Line:** borders, dividers, and empty progress tracks.

**The Subject Color Rule.** Use the six track colors to identify subjects; retain blue selection and green completion cues alongside labels and icons.

## Typography

**Display and Body Font:** Aptos, then Segoe UI, then sans-serif. These are system fonts; the app does not download a font. No separate display or monospace family is introduced.

The hierarchy is compact and practical. Titles use semibold weight; body and topic names stay regular. Progress figures use tabular numerals.

- **Headline:** topic-guide title; shrinks to (16px) at desktop widths up to (1120px), enlarges to (22px) in the inline guide.
- **Title:** track headings use the frontmatter title role by default, (13px) on narrow desktop and phone layouts. The canvas heading is (16px), then (14px) up to (1120px), and (18px) on phones.
- **Summary:** guide introduction uses the frontmatter summary role; inline guide uses (13px).
- **Body:** guide lists and paragraphs use the body role; inline guide uses (13px). Resource names use (12px), with provider text at (10px).
- **Label:** completion and utility labels; smaller counts and metadata range from (8px) to (11px). Topic names are (12px), reduced to (11px) only from (901px) through (1300px).
- **Brand:** default (20px), semibold (650), tracking (-.025em); responsive rules reduce it at smaller widths.

## Layout

The desktop shell has an (80px) header spanning three columns: navigation (176px), flexible learning canvas, guide (320px). Header padding is (16px 24px); its gap is (24px). Search is at most (420px) wide. Canvas padding is (24px).

The default track grid has two equal columns, a horizontal gap of (32px), and a vertical gap of (40px). Each group pairs a (128px) summary card with a flexible topic list across a (24px) gap. Summaries are (172px) tall. Topic lists have (5px) gaps; rows have a minimum height of (38px). Summary/list connectors meet at the midpoint of the gap. Groups align at their top edges so expanding one guide does not vertically center its neighbor.

The right guide is sticky at (top: 0), with height (100dvh - 80px) and minimum height (540px). Its interior scrolls independently, keeping the completion action below the scrollable content. Overall progress stays in the header; there is no duplicate bottom statistics bar.

Responsive behavior, including later CSS overrides:

| Width | Implemented behavior |
| --- | --- |
| At least 1600px | Rail/guide (192px/352px), canvas padding (32px), track-grid gaps (48px), summary width (144px), branch gap (28px), summary height (188px). |
| Up to 1300px | Rail/guide (160px/296px), canvas padding (20px), grid gaps (32px vertical / 24px horizontal), summary width (112px), branch gap (20px), summary height (164px). |
| Up to 1120px, above 900px | Rail/guide (152px/280px), one group column, summary width (128px), branch gap (24px), group gap (28px). |
| Up to 900px | Single shell column. Header wraps; full-width search becomes (42px) tall. Navigation scrolls horizontally; completion filter remains visible below it. Right guide hides; selecting a topic reveals its inline guide. Track grid returns to two columns with (112px) summaries and (20px) branch gaps. |
| Up to 600px | One group column; canvas padding (20px 16px); summary width (116px), gap (24px), summary height (168px). Topic rows and inline actions are at least (44px) tall. Search text is (16px); shortcut hint hides. Toolbar stacks; the duplicate statistics bar remains absent. |
| Up to 360px | Summary width (102px), gap (20px), tighter summary padding; optional row tag hides. |

The certificate directory uses two columns and (24px) gaps; it becomes one column at (1120px), with (16px) gaps on phones. The alternate dependency map is (620px) tall, reduced to (500px) on phones.

**The Alignment Rule.** Align summary cards and topic lists to the shared grid. Use the established branch gap and connector geometry when adding groups.

## Elevation & Depth

Depth comes primarily from paper/raised surfaces and thin borders. The canvas has a subtle dot grid: radial dots at (24px) intervals. Summary cards use a slight subject-tinted gradient, inset tint, and low exterior glow. Selected topic rows get a small blue glow. The brand mark and track icons use restrained drop shadows. There is no glass blur or animated ambient effect.

- **Track summary:** inset (0 0 20px), plus exterior (0 5px 20px), each using the subject accent mixed to (5%) against transparency.
- **Selected row:** (0 0 10px), selection blue mixed to (14%) against transparency.
- **Active navigation:** an inset left stripe (3px), in subject violet.
- **Track icon:** drop shadow (0 0 5px), subject accent mixed to (35%) against transparency.
- **Brand mark:** drop shadow (0 3px 7px #8145ff55).

No transition or animation durations are defined for these controls. Hover changes apply immediately. Reduced-motion handling disables animation and transitions and restores automatic scroll behavior.

## Shapes

Compact rounded rectangles recur throughout: topic/resource rows use the row radius; search, navigation, and certificate cards use the control radius. Summary cards and the guide have slightly rounder corners. Borders are thin (1px); the selected tab underline is (2px). Progress tracks and small status dots use rounded ends. Connections are simple orthogonal strokes, with no animated path tracing.

## Components

### Buttons

The completion action is the strongest filled control: a violet diagonal gradient (115deg), white semibold text, a fixed violet border, full width, and a minimum height of (38px). Hover brightens it by a factor of (1.15). Completed state uses a dark green fill, success-colored border, check icon, and changed label. Mobile inline completion height is at least (44px).

Theme controls are square paper buttons with blue icons. Hover uses the raised surface. View buttons use ground fill and muted text; active state uses selected fill, violet border, and ink text.

All interactive controls receive a visible blue outline (2px) with (3px) offset. The search wrapper instead uses an accent outline (2px), offset (2px), when any child is focused.

### Chips

Optional tags are small muted outline labels with the micro radius. They identify optional content, not a completion state. Free-certificate badges use success text and require verified resource data.

### Cards / Containers

Track summaries are subject-tinted, lightly glowing anchor cards with an icon, title, actual topic count, and progress. The guide is a paper card within the right rail, or a full-width inline card under its selected group. Resource links use raised fill, row radius, thin borders, external-link marks, and blue hover borders.

Certificate cards present the free-completion-certificate label, linked course title, provider, completion requirements, evidence link, and verification date. Directory cards use paper fill and (20px) padding; topic-guide cards use raised fill and (14px) padding.

### Inputs / Fields

Search uses a paper field with muted search icon, text placeholder, and a keyboard shortcut hint that becomes a clear button when populated. Its input has no independent border. Completion filtering uses a native select with paper background, thin line border, select radius, and (8px) padding.

### Navigation

The left rail stacks track buttons with (8px) gaps. Active navigation has selected fill, violet outline, and an inset stripe. Hover raises the background and promotes text to ink. At (900px) and below, navigation becomes a horizontally scrollable row; later destinations require horizontal scrolling. The filter remains accessible below that row.

### Connected Topic Row and Guide

Each topic row combines local SVG technology marks, a regular-weight name, optional tag when relevant, completion check when saved, and a chevron on desktop. Hover promotes its border to the subject accent. Selection uses blue border, a blue-tinted paper fill, and small glow.

Selecting a topic updates the guide; on narrow screens it also toggles the inline guide beneath that group. Overview, Resources, Practice, and Certificates are button-based section choices. Overview includes multiple resources. The guide has no prerequisite section; dependencies remain available in the alternate graph. The desktop guide scrolls internally; inline content expands naturally. Tablet inline expansion may leave whitespace in the adjacent grid column.

**The Content Evidence Rule.** Use actual catalog counts and provider evidence. Keep unknown certificate claims unknown.

## Do's and Don'ts

### Do:

- **Do** keep the neon dark palette on shared semantic CSS variables.
- **Do** retain recognizable local SVG technology marks and label each topic.
- **Do** use shared grid gaps, compact connected rows, and visible keyboard focus.
- **Do** show multiple learning resources and certificate evidence with requirements.
- **Do** preserve actual catalog counts and distinguish core progress from optional completion.

### Don't:

- **Don't** copy illustrative statistics, decorative heatmaps, or slogans from the reference.
- **Don't** add a prerequisite section to the topic guide.
- **Don't** use emoji substitutes for technology logos or invent certificate claims.
- **Don't** add ambient motion, large hero typography, or unrelated decorative imagery.

## Scrollbar stability

The root reserves scrollbar space with `scrollbar-gutter: stable`, keeping header, canvas, and topic-panel columns aligned when page height changes. Browsers without support use a permanently reserved vertical scrollbar. The internal topic-guide scroller reserves its own gutter so switching sections does not move the text.

## Focused subject pages

Selecting one of the six subjects adds the focused-track-grid layout. It is centered horizontally and vertically within its canvas area, with a maximum width of 920px and a minimum height of calc(100dvh - 260px). Desktop summary cards are 340px high, with 28px titles and 56px icons; topic rows are at least 72px high with 18px text and 24px logos. Required topics remain before optional topics. The page heading names the selected subject, and the guide selects a relevant topic when changing subjects.

At 900px and below, focus views use a 680px maximum width and 280px summary height. At 600px and below, the summary becomes a centered full-width 220px-tall card above full-width topic rows of at least 56px. The overview uses its original compact grid.
