# ShopSphere Day 13

ShopSphere Day 13 is a teaching-focused mini online shop for practicing frontend state management with React, Redux Toolkit, React Redux, and RxJS.

The app is intentionally small. It is not a production ecommerce system. It exists so participants can see how local state, central Redux state, RxJS event streams, derived UI state, and architecture decisions fit together in one concrete case.

## Project Purpose

Use this repository as a complete Day 13 training package for:

- State management in modern frontend applications
- Local state vs shared state vs central state
- Redux store, slices, actions, reducers, and UI updates
- RxJS streams for debounced input, validation, system events, and notifications
- Management transfer: how technical state decisions become ownership and governance questions

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run lightweight state verification:

```bash
npm run verify
```

Build the app:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Learning Objectives

By the end of the session, participants should be able to:

- Classify state as local, shared feature state, central Redux state, stream event, or derived UI state.
- Trace a user action through dispatch, reducer, store update, selector, and UI re-render.
- Explain why not every UI value belongs in Redux.
- Use RxJS when timing, debounce, cancellation, or recurring events are part of the behavior.
- Identify duplicated state bugs and choose a single source of truth.
- Connect state ownership to architecture review, team responsibility, and business risk.

## Feature Overview

The app includes:

- Product list with local demo data
- Category filtering with Redux state
- Debounced product search with local input state, RxJS, and Redux keyword state
- Cart state with add, remove, clear, totals, and checkout step
- Voucher validation using RxJS and a fake Promise API
- Live stock simulation using RxJS interval events
- Checkout stock validation that blocks unavailable items
- Notification Center using RxJS event simulation and Redux unread state
- Redux Debug Panel for live store inspection
- Buggy Cart Badge for duplicated-state debugging
- Architecture Decision Panel for management transfer discussion

## Recommended Teaching Sequence

1. Start with state identification on the visible shop screen.
2. Demonstrate product list and cart as the basic Redux loop.
3. Use the Redux Debug Panel to trace actions and store updates.
4. Show debounced search as local state plus RxJS plus stable Redux state.
5. Demonstrate voucher validation with debounce, cancellation, success, invalid, and error paths.
6. Show live stock updates as system events that change Redux state.
7. Discuss checkout stock validation and backend validation limits.
8. Use the Buggy Cart Badge to debug duplicated local state.
9. Use the Notification Center as the final participant assignment.
10. Debrief with the Architecture Decision Panel and Management Transfer questions.

## Documentation

- [Project Brief](docs/PROJECT_BRIEF.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Hands-On Guide](docs/HANDS_ON_GUIDE.md)
- [Instructor Guide](docs/INSTRUCTOR_GUIDE.md)
- [Test Plan](docs/TEST_PLAN.md)
- [Management Transfer](docs/MANAGEMENT_TRANSFER.md)

Future coding tasks should also follow [AGENTS.md](AGENTS.md).

## Important Boundaries

- Plain JavaScript only.
- No backend, database, authentication, payment service, browser push API, or external API.
- No UI component framework.
- Demo data and simulated APIs stay inside the frontend project.
- Keep code beginner-readable and useful for instruction.
