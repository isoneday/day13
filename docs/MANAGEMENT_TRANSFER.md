# Management Transfer

## Purpose

Management transfer connects technical state management decisions to team architecture and governance. ShopSphere Day 13 uses a small shop scenario to show how local coding choices can become coordination issues in a larger organization.

## From Code To Governance

State decisions answer technical questions:

- Where does this value live?
- Who can update it?
- What is derived from it?
- What happens when updates arrive out of order?
- Which components depend on it?

The same decisions also answer management questions:

- Which team owns this business behavior?
- Who approves changes to shared state?
- How are regressions detected?
- How do teams coordinate cross-feature changes?
- How is complexity kept visible?

## Example: Cart State

Technical view:

- Cart items should be central state because product cards, cart summary, totals, and checkout-like UI all depend on them.

Management view:

- Cart behavior needs clear ownership because many features may want to add discounts, stock rules, or notifications.

Governance question:

- Who reviews changes that modify cart state shape or cart actions?

## Example: Voucher Validation

Technical view:

- Voucher validation has loading, success, error, and stale-result concerns.
- RxJS can model timing and cancellation.
- Redux can store the current validation result.

Management view:

- Voucher rules often belong to a business or growth team.
- UI teams need stable contracts for voucher status.

Governance question:

- How are voucher rule changes communicated and tested before release?

## Example: Live Stock

Technical view:

- Stock affects product cards, cart quantity, and notifications.
- Central state prevents conflicting views.

Management view:

- Inventory behavior may be owned by a different team than the shopping UI.

Governance question:

- What happens when inventory state changes while a user is buying?

## Example: Checkout Reliability

Technical view:

- Checkout must check current stock before allowing the user to continue.
- Frontend validation can block obviously invalid checkout attempts.
- Backend validation is still required before accepting an order.

Management view:

- Checkout reliability affects customer trust, support volume, refund risk, and revenue reporting.
- Inventory, checkout, and customer experience teams need shared rules for unavailable items.

Governance question:

- Who owns the final decision when cart state and inventory state disagree?

## Example: Notifications

Technical view:

- Incoming notification events are a stream because they arrive over time.
- The current notification list and unread count are Redux state because the header and notification center both display them.

Management view:

- Notifications affect user attention, operational messaging, and trust.
- Message priority, wording, and ownership need clear governance.

Governance question:

- Who decides which events deserve notifications, and who is accountable when notifications are noisy, stale, or misleading?

## Management Transfer Card Template

Use this template to turn a state decision into an architecture and management discussion:

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

## Example Answers From This App

Cart state:

- Technical decision: store cart items in Redux.
- Why this state lives there: header, cart summary, checkout, and debugging all need one source of truth.
- Teams or roles affected: frontend, checkout, product, support.
- Risk if unmanaged: wrong totals, wrong badges, and customer confusion.
- Backend or governance dependency: checkout must validate final order details.
- Decision owner: checkout or commerce experience owner.
- How we verify it: reducer tests, cart UI checks, and checkout validation checks.

Voucher validation:

- Technical decision: process typing with RxJS and store the result in Redux.
- Why this state lives there: typing is time-based, but the validation result affects cart totals.
- Teams or roles affected: growth, pricing, checkout, frontend.
- Risk if unmanaged: stale discounts, unclear errors, or inconsistent pricing.
- Backend or governance dependency: real voucher rules must come from a trusted service.
- Decision owner: pricing or promotion owner.
- How we verify it: stream timing tests, fake API cases, and cart total checks.

Live stock:

- Technical decision: simulate stock updates with RxJS and store current stock in Redux.
- Why this state lives there: stock can change without user action and affects product cards and checkout.
- Teams or roles affected: inventory, checkout, frontend, customer support.
- Risk if unmanaged: users may try to buy unavailable items.
- Backend or governance dependency: backend stock validation is required before accepting orders.
- Decision owner: inventory or order management owner.
- How we verify it: stock reducer checks, disabled add-to-cart behavior, and checkout blocking.

Notifications:

- Technical decision: generate simulated events with RxJS and store the list plus unread count in Redux.
- Why this state lives there: header and notification center need the same unread count and current list.
- Teams or roles affected: product, operations, support, frontend.
- Risk if unmanaged: noisy or stale messages can train users to ignore important information.
- Backend or governance dependency: real systems need event ownership, priority rules, and auditability.
- Decision owner: product operations or customer experience owner.
- How we verify it: reducer tests, unread count checks, and message display checks.

Small UI state:

- Technical decision: keep component-only state local.
- Why this state lives there: local toggles and draft display values do not need global coordination.
- Teams or roles affected: mainly the owning frontend feature team.
- Risk if unmanaged: Redux becomes noisy and harder to govern.
- Backend or governance dependency: usually none.
- Decision owner: feature owner.
- How we verify it: component behavior checks.

## Open Level-3 Management Questions

- Who is allowed to add a new Redux slice?
- Which state changes require architecture review?
- Which business rules must be validated on the backend even if the frontend already checks them?
- Who owns pricing conflicts between voucher state and checkout totals?
- Who owns inventory conflicts between cart state and stock state?
- How should teams communicate changes to shared selectors, action names, or state shape?
- What telemetry would reveal state mismatch problems in production?
- Which customer promise is implied when checkout is enabled?

## Discussion Prompts

- What state should require architectural review before changing?
- What state can feature teams own independently?
- What selector or action names become shared contracts?
- What tests protect teams from breaking each other?
- How can a team prevent the Redux store from becoming a dumping ground?
- What customer promise is being made when checkout is enabled?
- Who governs notification priority and message quality?

## Training Takeaway

State management is not only a coding pattern. It is a decision system for ownership, predictability, communication, and change control.
