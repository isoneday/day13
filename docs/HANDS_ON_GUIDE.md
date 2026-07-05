# Hands-On Guide

## Purpose

This guide walks participants through the app as a state management lab. Move slowly and keep asking: Where does this state live, and why?

## Checkpoint 1: Identify State

Open the app and list all visible state:

- Product data
- Category filter
- Search input text
- Stable Redux search keyword
- Cart items
- Cart totals
- Voucher code and validation status
- Current stock
- Checkout blocked warning
- Notifications and unread count
- Debug panel state
- Buggy local cart count

Expected observation: not all state has the same owner. Some values are local, some are Redux state, some are RxJS events, and some are derived from existing state.

## Checkpoint 2: Product List And Redux Cart

1. Add a product to the cart.
2. Watch Header cart count update.
3. Watch Cart Summary update.
4. Open Redux Debug Panel and inspect `cart.items`.

Expected observation:

```text
ProductCard click
  -> cartItemAdded
  -> cartSlice reducer
  -> cart state changes
  -> Header and CartSummary re-render
```

Teaching point: cart is shared business state, so Redux is the right owner.

## Checkpoint 3: Category Filter

1. Change the category dropdown.
2. Watch visible products update.
3. Inspect `products.selectedCategory` in Debug Panel.

Expected observation: category is stable feature state in Redux. The visible product list is derived in the UI.

## Checkpoint 4: RxJS Debounced Search

1. Type `glass` in the search input.
2. Notice the input updates immediately.
3. Watch `Redux search keyword` update after the debounce delay.
4. Inspect `products.searchKeyword`.

Expected observation:

- Local state owns immediate typing display.
- RxJS owns timing with `debounceTime(400)`.
- Redux owns the stable search keyword.
- ProductList derives filtered results from Redux state.

Teaching point: typing is a stream, but the product feature needs stable shared state.

## Checkpoint 5: Voucher Validation

Try these voucher codes:

- `SAVE20`
- `FOOD10`
- `NOPE`
- `ERROR`

Expected observations:

- `SAVE20` gives a 20% discount.
- `FOOD10` gives a 10% discount.
- Unknown codes become invalid.
- `ERROR` shows a simulated service error.
- Debug Panel shows `voucher.status`, `discountPercent`, `message`, and `error`.

Stream path:

```text
VoucherBox input
  -> voucherInputChanged
  -> RxJS Subject
  -> debounceTime(500)
  -> distinctUntilChanged
  -> filter length >= 3
  -> switchMap fake API
  -> Redux validation result
```

Teaching point: RxJS handles timing and cancellation. Redux stores the current validation result.

## Checkpoint 6: Live Stock Updates

1. Watch the Live Stock Simulator.
2. Wait at least 5 seconds.
3. Inspect product stock in the product cards and Debug Panel.
4. Watch for products that reach 0 stock.

Expected observation: stock can change because of system events, not only user actions.

Teaching point: the stream creates stock update events, but current stock is Redux state because product cards and checkout validation both need it.

## Checkpoint 7: Checkout Stock Validation

1. Add a product to cart.
2. Wait until the same product becomes out of stock, or use instructor-provided Redux DevTools steps.
3. Inspect Cart Summary.

Expected observation:

- Cart Summary warns that checkout is blocked.
- `Start checkout` is disabled.
- The user must remove unavailable items manually.

Teaching point: frontend validation improves clarity, but real checkout must validate stock on the backend.

## Checkpoint 8: Buggy Cart Badge Debugging

1. Add products to cart.
2. Compare the Header badge, Redux Debug Panel, and Buggy Cart Badge.

Questions:

- Which state is inconsistent?
- Which source is correct?
- What is the business risk?
- What is the fix direction?

Expected observation: the local cart count is wrong because it duplicates Redux cart state.

Fixed direction:

```jsx
const cartQuantity = useSelector((state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0),
);
```

Teaching point: important shared state should have one source of truth.

## Checkpoint 9: Notification Center Assignment

1. Wait at least 8 seconds.
2. Watch a notification appear.
3. Check Header unread notification count.
4. Click `Mark all as read`.
5. Inspect `notifications.items` and `notifications.unreadCount`.

Expected observation:

- Notifications arrive over time through RxJS `interval(8000)`.
- Redux stores current notification items and unread count.
- Header and NotificationCenter read the same state.

Participant extension ideas:

- Remove one notification.
- Filter unread notifications.
- Limit the list to the latest 10 notifications.
- Add type-specific styling.
- Add reducer tests for notification actions.

## Checkpoint 10: Architecture Decision Panel

Read the table row by row.

Expected observation: every technical state choice has a reason and an unmanaged risk.

Debrief questions:

- Which decisions use local state?
- Which decisions use Redux?
- Which decisions use RxJS?
- Which decisions need backend validation in a real product?
- Which decisions require team ownership?

## Final Reflection

Participants should be able to explain one complete flow using this sentence:

```text
This event starts in ____, is processed by ____, stores state in ____, and updates UI in ____.
```
