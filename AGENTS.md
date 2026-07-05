# AGENTS.md

Guidance for future Codex tasks in the ShopSphere Day 13 project.

## Project Purpose

This repository is a Day 13 training project for frontend state management. The application name is **ShopSphere Day 13**.

The goal is to teach:

- Local state vs shared state vs central state
- Redux Toolkit store, actions, reducers, selectors, and UI updates
- React Redux integration
- RxJS streams for search, voucher validation, live stock simulation, and notifications
- Management transfer from technical state decisions to architecture and governance

## Hard Constraints

- Use React with Vite.
- Use plain JavaScript, not TypeScript.
- Use Redux Toolkit and React Redux for central state.
- Use RxJS only where reactive streams make the lesson clearer.
- Use simple CSS, no UI framework.
- Keep all documentation and UI text in English.
- Do not add a backend, database, authentication service, payment flow, or external API.
- Do not over-engineer. This is a training app, not a production ecommerce system.

## Implementation Style

- Prefer small readable components.
- Keep state ownership explicit.
- Use local state for isolated UI details.
- Use Redux for shared shop state such as products, cart, voucher status, and stock.
- Use RxJS for event streams that benefit from debouncing, timing, cancellation, merging, or simulation.
- Keep demo data in local files.
- Add comments only when they teach a state management idea or clarify non-obvious stream behavior.

## Suggested Future Structure

When the app is scaffolded, prefer a simple structure similar to:

```text
src/
  app/
    store.js
  data/
    products.js
  features/
    cart/
    products/
    voucher/
    notifications/
    stock/
  streams/
  components/
  styles/
```

This structure is guidance, not a requirement. Match the actual codebase once it exists.

## Teaching Requirements

Future changes should preserve the learning path:

1. Start with local state.
2. Introduce shared state pressure.
3. Move appropriate state into Redux.
4. Add RxJS for reactive flows.
5. Discuss management and governance implications.

Avoid hiding important concepts behind large abstractions. Participants should be able to trace state changes by reading the code.

## Documentation Rules

- Update documentation when architecture or learning flow changes.
- Keep docs practical and concise.
- Include teaching notes where they help instructors explain tradeoffs.
- Avoid empty placeholders.

## Testing Expectations

When tests are introduced, keep them focused on state behavior:

- Reducer behavior
- Selector output
- Cart state transitions
- Voucher validation states
- Stream behavior for debounce, cancellation, and simulated updates

Manual testing notes are acceptable early in the project.
