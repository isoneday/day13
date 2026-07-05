# Management Transfer

## Purpose

Management transfer connects technical state management decisions to ownership, review, risk, and governance. ShopSphere Day 13 uses a small shop so participants can practice that translation safely.

## Architecture Decision Table

| Topic | Technical decision | Management concern |
| --- | --- | --- |
| Cart state | Store in Redux | Incorrect cart state affects checkout trust and support load. |
| Voucher typing | Process with RxJS | Timing and cancellation affect pricing clarity. |
| Voucher result | Store in Redux | Discount state affects totals and business rules. |
| Live stock | Stream updates, store current stock in Redux | Inventory changes affect purchase promises. |
| Checkout validation | Block unavailable items in UI, require backend validation in real systems | Customer trust depends on reliable checkout decisions. |
| Notifications | Stream arrival, store list and unread count in Redux | Message priority and quality affect user attention. |
| Small UI state | Keep local | Over-centralization increases maintenance and governance cost. |
| Search input | Local display, RxJS debounce, Redux keyword | Search behavior must feel responsive and explainable. |

## Management Transfer Card

Use this card for any state decision:

```text
Topic:
Technical decision:
Why this state lives there:
Teams or roles affected:
Risk if unmanaged:
Backend or governance dependency:
Decision owner:
How we verify it:
```

## Example Cards

Cart state:

- Technical decision: store cart items in Redux.
- Why this state lives there: header, cart summary, checkout validation, and debugging all need one source of truth.
- Teams or roles affected: frontend, checkout, product, support.
- Risk if unmanaged: wrong totals, wrong badges, and customer confusion.
- Backend or governance dependency: checkout must validate final order details.
- Decision owner: commerce experience owner.
- How we verify it: reducer checks, UI checks, and manual checkout scenarios.

Voucher validation:

- Technical decision: process typing with RxJS and store result in Redux.
- Why this state lives there: typing is time-based, but the validation result affects cart totals.
- Teams or roles affected: growth, pricing, checkout, frontend.
- Risk if unmanaged: stale discounts, unclear errors, or inconsistent pricing.
- Backend or governance dependency: real voucher rules must come from a trusted service.
- Decision owner: pricing or promotion owner.
- How we verify it: voucher cases, fake API checks, and total calculations.

Live stock:

- Technical decision: simulate stock updates with RxJS and store current stock in Redux.
- Why this state lives there: product cards and checkout validation need current availability.
- Teams or roles affected: inventory, checkout, frontend, customer support.
- Risk if unmanaged: users may try to buy unavailable items.
- Backend or governance dependency: backend stock validation is required before accepting orders.
- Decision owner: inventory or order management owner.
- How we verify it: stock update checks and checkout blocking checks.

Notifications:

- Technical decision: generate simulated events with RxJS and store notification list plus unread count in Redux.
- Why this state lives there: Header and NotificationCenter need the same current state.
- Teams or roles affected: product, operations, support, frontend.
- Risk if unmanaged: noisy or stale messages reduce trust and attention.
- Backend or governance dependency: real systems need event ownership, priority rules, and auditability.
- Decision owner: product operations or customer experience owner.
- How we verify it: unread count checks and message display checks.

Small UI state:

- Technical decision: keep component-only state local.
- Why this state lives there: local toggles and immediate draft display values do not need global coordination.
- Teams or roles affected: owning frontend feature team.
- Risk if unmanaged: Redux becomes noisy and harder to govern.
- Backend or governance dependency: usually none.
- Decision owner: feature owner.
- How we verify it: component behavior checks.

## Level-3 Management Questions

Use these for senior-level discussion:

- Who is allowed to add a new Redux slice?
- Which state shape changes require architecture review?
- Which frontend checks must also be validated on the backend?
- Who owns conflicts between voucher state and checkout totals?
- Who owns conflicts between cart state and inventory state?
- Who governs notification priority and message quality?
- How should teams communicate changes to shared selectors, action names, or state shape?
- What telemetry would reveal state mismatch problems in production?
- What customer promise is implied when checkout is enabled?

## Training Takeaway

State management is not only a coding technique. It is a decision system for ownership, predictability, communication, customer trust, and change control.
