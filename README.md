# ShopSphere Day 13

ShopSphere Day 13 is a teaching-focused mini online shop application for practicing frontend state management with React, Redux Toolkit, React Redux, and RxJS.

The project is intentionally small. It is not a real ecommerce platform. It exists to help participants compare local component state, shared React state, central Redux state, and reactive RxJS streams in a concrete shop scenario.

## Learning Objectives

By the end of this training project, participants should be able to:

- Explain when state should stay local to a component.
- Identify when state should be shared between components.
- Use a Redux store for central application state.
- Trace Redux actions, reducers, selectors, and UI updates.
- Use RxJS streams for event-like flows such as search input, voucher checks, stock updates, and notifications.
- Discuss how technical state decisions become architecture, ownership, and governance decisions.

## Planned Technology

- React
- Vite
- Redux Toolkit
- React Redux
- RxJS
- Plain JavaScript
- Simple CSS

No backend, database, authentication service, or external API should be added. Demo data should live inside the frontend project.

## Intended App Scope

The future app should include only a compact shop experience:

- Product listing
- Search input
- Cart actions
- Voucher validation
- Simulated live stock updates
- Notification stream
- Small teaching panels or debug views when useful

## Documentation

Start with these files:

- [Project Brief](docs/PROJECT_BRIEF.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Hands-On Guide](docs/HANDS_ON_GUIDE.md)
- [Instructor Guide](docs/INSTRUCTOR_GUIDE.md)
- [Test Plan](docs/TEST_PLAN.md)
- [Management Transfer](docs/MANAGEMENT_TRANSFER.md)

Future coding tasks should also follow [AGENTS.md](AGENTS.md).

## Setup

The React/Vite app has not been scaffolded yet. When implementation begins, use a simple Vite React JavaScript setup and install only the required state management libraries.

Expected future commands:

```bash
npm install
npm run dev
```

## Project Rule

Build this as a training project first. Prefer readable code, small components, clear state boundaries, and teaching notes over completeness or production features.
