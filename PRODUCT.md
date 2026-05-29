# Product Contract

## Current State

This project is a plain static web page that displays a centered, stylized owl built directly in inline SVG. It uses root-level HTML and CSS with a tiny Node static-file server for deployment, and no application framework, backend data service, or database.

## What It Does

- Serves a single `index.html` document.
- Displays an accessible inline SVG owl composed from primitive shapes.
- Labels the owl SVG and its major grouped parts: body, eyes, beak, wings, and feet.
- Centers the owl on the page and scales it responsively from mobile to desktop.
- Styles the page background, title, owl presentation, and caption with `styles.css`.
- Provides Playwright end-to-end smoke coverage for the rendered owl and cross-viewport layout.

## Key Files

- `index.html`: Root HTML document containing the semantic page structure and inline SVG owl.
- `styles.css`: Page layout, responsive SVG sizing, background, title, and caption styling.
- `server.js`: Silent Node static-file server used by the deployed app.
- `package.json` and `package-lock.json`: Node test tooling metadata for Playwright.
- `playwright.config.js`: Playwright configuration that serves the static site on `0.0.0.0:8080` and runs mobile, tablet, and desktop projects.
- `tests/owl.spec.js`: End-to-end smoke test for SVG rendering, labeled parts, and basic viewport layout.
- `README.md`: Repository title only.

## Architectural Decisions

- Keep the application itself as plain HTML and CSS.
- Use the Node runtime only to serve static files in deployment.
- Use inline SVG instead of image assets so the owl remains inspectable, accessible, and directly testable.
- Keep all static page source at the repository root while test files live under `tests/`.
- Use Playwright only as development/test tooling; it is not part of the runtime page.

## Conventions

- Product or brand naming must come from `PRODUCT.md` or an issue, not from agent-specific placeholders.
- Run `npm run install:browsers` when a fresh environment needs the Playwright Chromium browser.
- Run `npm run test:e2e` to validate the static page smoke test.
- Generated Playwright artifacts and dependency folders stay out of version control.
