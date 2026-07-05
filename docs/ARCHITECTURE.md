# Architecture

## Architecture Goal

The architecture should be small, explicit, and easy to teach. The app should show state boundaries clearly rather than hide them behind generic abstractions.

## Planned Layers

```text
React UI components
  -> local component state for isolated UI details
  -> React Redux hooks for central shop state
  -> RxJS subscriptions for reactive event flows

Redux Toolkit store
  -> product state
  -> cart state
  -> voucher state
  -> stock state
  -> notification state

RxJS streams
  -> debounced search input
  -> voucher validation simulation
  -> live stock simulation
  -> notification timing

Local demo data
  -> products and sample vouchers
```

## State Ownership Guide

Use local React state for:

- Input text before it becomes a shared concern
- UI toggles
- Selected tab or small view-only state
- Temporary component-only values

Use Redux for:

- Product list state used by multiple components
- Cart items and totals
- Voucher validation result
- Stock values shown across the app
- Notifications that may be triggered from different features

Use RxJS for:

- Debounced search changes
- Simulated async voucher validation
- Periodic stock updates
- Timed notification dismissal
- Streams where cancellation or timing is part of the lesson

## Suggested Redux Slices

- `productsSlice`: stores product catalog and search result metadata if needed.
- `cartSlice`: stores cart items, quantities, and cart actions.
- `voucherSlice`: stores voucher input, validation status, discount, and error message.
- `stockSlice`: stores stock counts and live update status.
- `notificationsSlice`: stores visible notification messages.

## Teaching Note

Not every piece of state belongs in Redux. The lesson should include examples where local state is the better choice. Central state is useful when many components need the same truth, when updates must be predictable, or when debugging and governance matter.

## Non-Goals

- Server-side rendering
- Persistent storage
- Complex middleware setup
- Enterprise ecommerce modeling
- Authentication or authorization
- Real network integration
