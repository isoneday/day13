# AGENTS.md

Durable guidance for Codex tasks in the **ShopSphere Day 13** repository.

For supporting context, read [README.md](README.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before making broad implementation or architecture changes.

## 1. Project Purpose

ShopSphere Day 13 is a teaching-focused mini online shop for practicing frontend state management. The project should help participants understand local state, shared state, Redux central state, RxJS reactive streams, and the management implications of state ownership.

This is a training project, not a production ecommerce system.

## 2. Tech Stack

- React
- Vite
- Plain JavaScript, not TypeScript
- Redux Toolkit
- React Redux
- RxJS
- Simple CSS

Use only the libraries needed for the lesson. Do not add unnecessary dependencies.

## 3. Folder Conventions

Prefer a simple structure:

```text
src/
  app/
    store.js
  components/
  data/
  features/
    cart/
    products/
    voucher/
    stock/
    notifications/
    checkout/
  streams/
  styles/
docs/
```

Keep feature code close to the feature it supports. Keep demo data local in the repository.

## 4. Coding Standards

- Use clear component names that describe the UI or feature.
- Prefer small readable components.
- Write code for teaching clarity, not advanced abstraction.
- Keep business logic easy to trace from UI event to state update to UI result.
- Add comments only where they help learning or clarify non-obvious state or stream behavior.
- Keep all UI text and documentation in English.
- Use simple CSS and avoid UI frameworks.

## 5. State Management Rules

- Do not put every UI state into Redux.
- Keep small UI state local, such as open panels, selected tabs, input draft values, and component-only toggles.
- Use Redux Toolkit for central state that is shared, business-relevant, or needed across features.
- Keep cart, voucher result, stock availability, checkout state, and notifications in Redux when they are shared or business-relevant.
- Prefer selectors for derived values such as cart count, subtotal, discounts, and availability.
- Keep reducers predictable and easy to test.
- Do not duplicate derived state unless there is a clear teaching reason.

## 6. RxJS Usage Rules

- Use RxJS only for event streams or asynchronous flows where timing matters.
- Good uses include debounced search, voucher validation simulation, live stock updates, notification timing, cancellation, and merging event streams.
- Do not use RxJS as a replacement for Redux state ownership.
- Do not add streams for simple synchronous UI state.
- Keep stream code readable and scoped to the teaching scenario.

## 7. Documentation Rules

- Update documentation when project structure, architecture, or learning flow changes.
- Keep documentation concise, practical, and in English.
- Add teaching notes when they explain tradeoffs.
- Do not leave empty placeholders.
- Keep README.md useful for setup, purpose, and learning objectives.
- Keep docs/ARCHITECTURE.md aligned with actual state ownership and stream design.

## 8. Testing And Verification Expectations

- Verify user-facing behavior after changes when the app exists.
- Add or update tests for reducers, selectors, and stream behavior when those areas change.
- Prefer focused tests over broad brittle tests.
- Check cart transitions, voucher states, stock availability, checkout state, notifications, and search stream behavior.
- If tests cannot be run, state that clearly in the final response.

## 9. Do-Not Rules

- Do not create a backend.
- Do not add a database.
- Do not add authentication, payments, or external APIs.
- Do not convert the project to TypeScript.
- Do not add unnecessary libraries or UI frameworks.
- Do not over-engineer with generic architecture patterns.
- Do not hide the learning path behind large abstractions.
- Do not mix unrelated refactors into focused training tasks.

## 10. Definition Of Done

A task is done when:

- The requested change is implemented within the training scope.
- State ownership follows the local state, Redux, and RxJS rules above.
- Code remains readable for participants.
- Relevant documentation is updated.
- Relevant tests or manual verification have been run, or limitations are clearly reported.
- No backend, unnecessary library, or out-of-scope production feature was introduced.
