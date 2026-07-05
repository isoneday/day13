# Hands-On Guide

## Session Flow

This guide describes the intended participant journey once the app is implemented.

## Part 1: Identify State

Ask participants to inspect the shop screen and list possible state:

- Product data
- Search text
- Filtered products
- Cart items
- Item quantities
- Voucher code
- Voucher validation status
- Stock count
- Notifications
- UI-only state such as open panels or selected tabs

Teaching note: the first exercise is classification, not coding.

## Part 2: Local State

Start with small component state:

- Search text inside a search component
- A local toggle for showing a cart summary
- A local input value before validation is introduced

Discussion prompt:

When does this state become difficult to keep local?

## Part 3: Shared State Pressure

Introduce interactions that require multiple components to agree:

- Product cards add items to cart.
- Header shows cart count.
- Cart panel shows quantities and totals.
- Product cards need stock information.

Teaching note: shared state pressure is the reason to introduce a central store. Redux should solve a visible problem, not appear as ceremony.

## Part 4: Redux Store

Add Redux Toolkit concepts in this order:

1. Store
2. Slice
3. Reducer
4. Action
5. Selector
6. React Redux hooks

Recommended exercise:

- Implement `addToCart`.
- Implement `removeFromCart`.
- Implement `changeQuantity`.
- Display cart total from a selector.

## Part 5: RxJS Search Stream

Use RxJS to model search input as a stream:

- Capture input changes.
- Debounce typing.
- Ignore repeated values.
- Dispatch a Redux action or update search results after the stream emits.

Teaching note: RxJS should be introduced for timing and event coordination, not as a replacement for all state.

## Part 6: Voucher Validation Stream

Simulate voucher validation:

- User enters a voucher code.
- Stream waits briefly to simulate validation.
- Latest input wins.
- Valid voucher updates Redux state.
- Invalid voucher shows an error notification.

Discussion prompt:

Why is cancellation useful when a user types quickly?

## Part 7: Live Stock Stream

Simulate changing stock:

- Periodically update stock counts.
- Disable cart actions when stock reaches zero.
- Notify the user when a cart item becomes unavailable.

Teaching note: stock is central state because product cards and cart behavior both depend on it.

## Part 8: Management Transfer

End by connecting code decisions to team decisions:

- Who owns cart behavior?
- Who owns voucher rules?
- Who approves new global state?
- How are state changes tested?
- How do teams prevent every component from depending on everything?
