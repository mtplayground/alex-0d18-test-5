# Product Contract

## Current State

This project is a minimal static web page skeleton. It provides a semantic HTML entry point with a linked stylesheet and no application framework, build pipeline, JavaScript, backend service, or database.

## What It Does

- Serves a single `index.html` document.
- Links `styles.css` for site styling.
- Presents basic semantic structure with document metadata, a header, a main content area, and an accessible section heading.

## Key Files

- `index.html`: Root HTML document with viewport metadata, description metadata, page title, and linked stylesheet.
- `styles.css`: Baseline CSS for system fonts, light/dark color scheme support, border-box sizing, full-height body, and constrained page content width.
- `README.md`: Repository title only.

## Architectural Decisions

- Use plain HTML and CSS until a future issue explicitly requires framework or build tooling.
- Keep files at the repository root for the current single-page static structure.
- Avoid adding runtime dependencies, package managers, generated assets, or deployment configuration before they are needed.

## Conventions

- Product or brand naming must come from `PRODUCT.md` or an issue, not from agent-specific placeholders.
- Static assets should stay simple and directly linked unless the project scope expands.
