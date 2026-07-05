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
  -> stock state later
  -> notification state later

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

- `productsSlice`: stores product catalog, selected category, search keyword, loading, and error state.
- `cartSlice`: stores cart items, checkout step, and cart error state.
- `voucherSlice`: stores voucher input, validation status, discount, and error message.
- `stockSlice`: stores stock counts and live update status.
- `notificationsSlice`: stores visible notification messages.

## Current Milestone: Product List And Cart

The first implemented milestone uses Redux Toolkit for the basic shop loop:

```text
ProductCard button click
  -> dispatch(cartItemAdded(product))
  -> cart reducer adds or increments an item
  -> Redux store updates cart.items
  -> Header cart badge and CartSummary re-render from useSelector
```

Product filtering uses Redux state for the stable filter values:

```text
Category select
  -> dispatch(categorySelected(value))
  -> products reducer updates selectedCategory
  -> ProductList reads Redux state and displays matching products

Search input typing
  -> ProductSearch updates local input state immediately
  -> ProductSearch sends values through an RxJS Subject
  -> debounceTime(400) waits for typing to pause
  -> dispatch(searchKeywordChanged(keyword))
  -> products reducer stores the stable search keyword
  -> ProductList derives visible products from Redux state
```

Search typing is a stream because each keystroke is an event over time. The product filter is shared feature state because the active keyword is useful for the product list, Debug Panel, and teaching flow. The product list result is not stored separately; it is derived in the UI from `items`, `selectedCategory`, and `searchKeyword`.

## Voucher Validation Flow

Voucher validation is split between an RxJS stream and Redux state:

```text
Voucher input event
  -> VoucherBox dispatches voucherInputChanged(value)
  -> VoucherBox sends value to an RxJS Subject
  -> RxJS handles debounce, duplicate values, cancellation, and fake API calls
  -> dispatch voucher validation actions
  -> voucherSlice stores the latest result
  -> CartSummary and DebugPanel read voucher state from Redux
```

The voucher input is a stream because typing and validation are time-based. Users may type quickly, change a code before validation finishes, or trigger a simulated service error. RxJS makes those timing and cancellation rules visible for teaching.

The voucher result belongs in Redux because it is business-relevant shared state. Cart totals, checkout messaging, and the Debug Panel all need the same current answer: the code, status, discount percent, message, and error.

RxJS and Redux have different jobs here:

- RxJS manages the event process: wait for typing to pause, ignore repeated values, call the fake API, and ignore stale requests with `switchMap`.
- Redux stores the current business state: what code was typed, whether validation is idle, typing, validating, valid, invalid, or error, and what discount should affect cart totals.

The current fake API is `validateVoucherApi(code)`. It supports:

- `SAVE20`: valid with 20% discount
- `FOOD10`: valid with 10% discount
- `ERROR`: simulated service error
- Any other code: invalid

## Teaching Note

Not every piece of state belongs in Redux. The lesson should include examples where local state is the better choice. Central state is useful when many components need the same truth, when updates must be predictable, or when debugging and governance matter.

## Non-Goals

- Server-side rendering
- Persistent storage
- Complex middleware setup
- Enterprise ecommerce modeling
- Authentication or authorization
- Real network integration
