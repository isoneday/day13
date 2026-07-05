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

### Teaching Explanation: Product List And Cart

The current app demonstrates the basic Redux loop with the cart:

1. The user clicks **Add to cart** on a product card.
2. `ProductCard` dispatches the `cartItemAdded` action.
3. `cartSlice` receives the action and updates `cart.items`.
4. The Redux store now has a new cart state.
5. `Header` and `CartSummary` read cart state with `useSelector`.
6. React re-renders the cart badge, item list, total quantity, and total price.

The product filters use Redux state, but search typing now has one extra teaching layer:

1. The user changes the category field.
2. `ProductList` dispatches `categorySelected(value)`.
3. `productsSlice` stores the selected category.
4. `ProductList` reads that state and displays the matching products.

Search is different because typing is a stream:

1. The user types in `ProductSearch`.
2. Local React state updates immediately so the input feels responsive.
3. The same value is sent into an RxJS `Subject`.
4. `debounceTime(400)` waits until typing pauses.
5. `distinctUntilChanged()` ignores repeated stable keywords.
6. Redux receives `searchKeywordChanged(keyword)` only after the debounce.
7. `ProductList` derives visible products from Redux state.

Teaching note: local state owns the immediate input display, RxJS owns the timing of typing events, and Redux owns the stable search keyword used by the shared product feature.

### Instructor Explanation: Redux Debug Panel

The Redux Debug Panel shows the live `products`, `cart`, and `voucher` slices as formatted JSON. Use it during demonstrations so participants can see the store update immediately after an action is dispatched.

Suggested classroom flow:

1. Click **Add to cart** and watch `cart.items` change.
2. Remove an item and watch the cart array update.
3. Start checkout with an empty cart and point out the `error` value.
4. Change category or search text and watch `selectedCategory` and `searchKeyword` update.
5. Type a voucher code and watch `status`, `discountPercent`, `message`, and `error` change.

The panel connects the visible UI to the Redux path: component event, dispatched action, reducer update, store state, and re-rendered UI.

## Part 5: RxJS Search Stream

Use RxJS to model search input as a stream:

- Capture input changes.
- Debounce typing.
- Ignore repeated values.
- Dispatch `searchKeywordChanged` after the stream emits.
- Show the active Redux search keyword so participants can see the delay.

Teaching note: RxJS should be introduced for timing and event coordination, not as a replacement for all state. The product list result is derived in the UI from Redux state; it is not stored as another array in the store.

## Part 6: Voucher Validation Stream

Simulate voucher validation:

- User enters a voucher code.
- Stream waits briefly to simulate validation.
- Latest input wins.
- Valid voucher updates Redux state.
- Invalid voucher shows an error notification.

Discussion prompt:

Why is cancellation useful when a user types quickly?

### Teaching Explanation: Voucher Stream

The voucher box demonstrates how RxJS and Redux can work together without doing the same job.

Step-by-step flow:

1. The user types in the voucher input.
2. `VoucherBox` dispatches `voucherInputChanged(value)` so Redux stores the latest text.
3. `VoucherBox` also sends the value into an RxJS `Subject`.
4. The stream trims the value and waits with `debounceTime(500)`.
5. `distinctUntilChanged()` ignores the same code if it appears again.
6. `filter()` only allows codes with at least 3 characters.
7. `tap()` dispatches `voucherValidationStarted()` before the fake API call.
8. `switchMap()` calls `validateVoucherApi(code)` and keeps only the latest request result.
9. `catchError()` handles the simulated `ERROR` code and dispatches `voucherValidationErrored()`.
10. Valid results dispatch `voucherValidationSucceeded()`.
11. Invalid results dispatch `voucherValidationFailed()`.

Use `SAVE20` to show a 20% discount, `FOOD10` to show a 10% discount, any unknown code to show an invalid result, and `ERROR` to show the service error path.

Teaching note: debounce waits until the user pauses typing. `switchMap` protects the UI from older validation results arriving after a newer code was typed.

## Part 7: Live Stock Stream

Simulate changing stock:

- Periodically update stock counts.
- Disable cart actions when stock reaches zero.
- Notify the user when a cart item becomes unavailable.

Teaching note: stock is central state because product cards and cart behavior both depend on it.

### Teaching Explanation: Live Stock Stream

The live stock simulator shows that state changes can come from system events, not only user actions.

Step-by-step flow:

1. `LiveStockSimulator` starts an RxJS `interval(5000)`.
2. Every 5 seconds, the stream selects one random product.
3. The simulator calculates a new stock value and prevents it from going below 0.
4. It dispatches `productStockUpdated`.
5. `productsSlice` stores the new stock value and `lastStockUpdate`.
6. Product cards re-render from Redux state.
7. If a product reaches 0 stock, the card shows **Out of stock** and disables **Add to cart**.

Teaching note: the stream represents a system event. Redux stores the current stock availability. The UI derives button state from that current stock.

Real systems would not trust this frontend simulation for checkout. A backend must validate stock before an order is accepted.

### Teaching Explanation: Checkout Stock Validation

Checkout is business-critical because it is the point where a user expects the shop to honor the cart. If an item becomes unavailable while it is already in the cart, the UI should not allow the user to continue as if the item can still be purchased.

In this app, `CartSummary` compares cart items with the current product stock in Redux. If any cart item now has stock `0`, it shows a warning and blocks **Start checkout**. The user must remove unavailable items manually.

This frontend validation improves clarity and protects the user experience, but it is not enough for a real shop. Real systems also need backend validation at checkout because frontend state can be stale, delayed, or manipulated. The frontend can guide the user; the backend must make the final business decision.

### Debugging Exercise: Duplicated Cart State Bug

`BuggyCartBadge` is a deliberate bug simulation. It displays the real cart quantity from Redux and an incorrect local cart count in the same panel.

Ask participants:

- Which state is inconsistent?
- Which source is correct?
- What is the business risk?
- What is the fix direction?

Expected discussion:

- The local cart count is inconsistent because it is separate duplicated state.
- The Redux cart state is correct because cart items are shared business state.
- The business risk is that users may see the wrong cart count, lose trust, or make checkout decisions based on stale UI.
- The fix direction is to remove duplicated local state and derive the badge count from Redux.

Do not fix the component during the first debugging pass. Keep the bug visible so participants can compare the UI with the Redux Debug Panel.

Fixed version snippet:

```jsx
import { useSelector } from 'react-redux';

function FixedCartBadge() {
  const cartQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return <strong>{cartQuantity}</strong>;
}
```

The fixed version has one source of truth. It reads from Redux instead of storing a second local cart count.

### Final Participant Assignment: Notification Center

The Notification Center is a small feature for participants to study and extend.

What the current version does:

- `NotificationCenter` starts an RxJS `interval(8000)`.
- Every 8 seconds, the stream creates a simulated notification.
- `notificationsSlice` stores the notification list in Redux.
- `notificationsSlice` also stores `unreadCount`.
- `Header` reads `unreadCount` and shows it beside the cart badge.
- `NotificationCenter` can dispatch `allNotificationsMarkedRead()`.

Notification messages are related to stock updates, voucher campaigns, checkout reminders, and system messages.

Teaching point:

- Notifications are a stream because new events arrive over time.
- Notifications are state because the app must remember the current list and unread count.

Participant extension ideas:

- Add a button to remove one notification.
- Add a filter for unread notifications.
- Add a notification type label color.
- Limit the list to the latest 10 notifications.
- Add a reducer test for `notificationReceived`.

Questions for participants:

- Which part is the stream?
- Which part is Redux state?
- Why should unread count be consistent with the notification list?
- Who should own notification rules in a real product team?

## Part 8: Management Transfer

End by connecting code decisions to team decisions:

- Who owns cart behavior?
- Who owns voucher rules?
- Who approves new global state?
- How are state changes tested?
- How do teams prevent every component from depending on everything?
