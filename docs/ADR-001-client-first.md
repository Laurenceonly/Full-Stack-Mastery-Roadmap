# ADR-001: Client-first persistence for V2

Date: 2026-10-23<br>
Status: Accepted for V2

## Context

The roadmap currently supports a single learner in one browser. Accounts and cross-device synchronization are not required for V2. Adding a server would introduce authentication, hosting, database migrations, and operational work before there is a product need.

## Decision

Keep V2 as a static React/Vite application. Separate canonical catalog data, validation, progress calculations, and UI adapters. Retain V1 boolean progress under `roadmap-progress` during V2a. V2c will introduce a versioned storage adapter and validated migration while preserving the legacy key.

## Consequences

The app can be deployed as static files. Progress remains device-local and may be cleared by browser storage cleanup. Export/import and safe storage error handling remain planned V2c work. No account or sync guarantees should be presented.

Revisit when accounts, multiple devices, or shared progress become a demonstrated need. Compare an Express/PostgreSQL service with managed backends before choosing V3 infrastructure.
