# Instructor Guide

## Teaching Goal

Use ShopSphere Day 13 to help participants reason about state placement. The goal is not to memorize Redux or RxJS syntax. The goal is to make state ownership decisions visible and defensible.

## Recommended Timing

- 10 minutes: state identification
- 15 minutes: local state examples
- 20 minutes: Redux store and cart flow
- 20 minutes: RxJS search and voucher streams
- 15 minutes: stock and notifications
- 10 minutes: management transfer discussion

Adjust timing based on participant experience.

## Key Concepts To Reinforce

- Local state is not inferior. It is often the simplest correct choice.
- Shared state creates coordination pressure.
- Redux centralizes important shared state and makes updates traceable.
- Reducers should be predictable and easy to test.
- Selectors protect components from store shape details.
- RxJS is useful for event timing, cancellation, merging, and simulation.
- Technical state decisions become architecture and governance decisions as teams grow.

## Suggested Demonstrations

### Demo 1: Search Text

Show search as local state first. Then explain what changes when other components need to know the search term or results.

### Demo 2: Cart Count

Add an item from a product card and show the cart count in the header. This demonstrates why cart state should be central.

### Demo 3: Voucher Validation

Use a simulated delay and show loading, success, and failure states. Emphasize why stale validations should not overwrite the latest input.

### Demo 4: Live Stock

Simulate stock changing while the cart is open. Discuss why derived UI state must respond to central stock changes.

## Questions For Participants

- Which state can stay inside one component?
- Which state needs a single source of truth?
- What should be derived instead of stored?
- What user actions should become Redux actions?
- Which flows need stream behavior?
- What risks appear if every feature writes to the same central state?

## Common Mistakes To Watch For

- Moving all state into Redux too early.
- Duplicating derived values in the store.
- Putting async or timing logic directly inside reducers.
- Making RxJS responsible for state that Redux should own.
- Creating large components that hide state changes.
- Treating demo ecommerce rules as production requirements.

## Facilitation Note

Keep the app small. If participants ask for payments, login, backend APIs, or persistence, frame those as future architecture topics and return to the state management lesson.
