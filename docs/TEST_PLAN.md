# Test Plan

## Test Strategy

ShopSphere Day 13 uses lightweight verification because it is a teaching app. Manual checks are the primary classroom test method. A small Node verification script checks core reducer and fake API behavior without adding a large test framework.

## Commands

Install dependencies when needed:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Build the app:

```bash
npm run build
```

Run lightweight state verification:

```bash
npm run verify
```

## Manual Test Cases

### Product List Rendering

1. Run `npm run dev`.
2. Open the Vite local URL.
3. Confirm five kitchenware or meal-prep products are visible.
4. Confirm each product shows name, category, price, and stock.

Expected result: the product list renders from local demo data.

### Category Filter

1. Open the category dropdown.
2. Select `Storage`.
3. Confirm only storage products are visible.
4. Select `All`.

Expected result: category filtering updates the visible product list.

### RxJS Debounced Search

1. Type `glass` in the search input.
2. Watch the input update immediately.
3. Watch `Redux search keyword` update after a short delay.
4. Confirm the visible product list filters after the debounce.
5. Clear the search input.

Expected result: local input changes immediately, Redux keyword updates after debounce, and products filter from Redux state.

### Add To Cart

1. Click `Add to cart` on any in-stock product.
2. Check Cart Summary.
3. Add the same product again.

Expected result: the cart item appears and quantity increases on repeated add.

### Cart Badge Update

1. Add one product to the cart.
2. Check the header cart badge.
3. Add another product.

Expected result: the header cart badge matches the total cart quantity.

### Checkout Empty Cart Error

1. Click `Clear cart`.
2. Click `Start checkout`.

Expected result: Cart Summary shows `Add at least one product before checkout.`

### Voucher SAVE20

1. Add at least one product to the cart.
2. Type `SAVE20` in the voucher field.
3. Wait for validation.

Expected result: voucher status becomes `valid`, message confirms 20% off, and final price includes a 20% discount.

### Voucher FOOD10

1. Replace the voucher code with `FOOD10`.
2. Wait for validation.

Expected result: voucher status becomes `valid`, message confirms 10% off, and final price includes a 10% discount.

### Invalid Voucher

1. Type an unknown code such as `NOPE`.
2. Wait for validation.

Expected result: voucher status becomes `invalid` and the UI shows an invalid voucher message.

### ERROR Voucher

1. Type `ERROR`.
2. Wait for validation.

Expected result: voucher status becomes `error` and the UI shows the simulated service error.

### Live Stock Update

1. Watch the Live Stock Simulator panel.
2. Wait at least 5 seconds.
3. Confirm `Last stock update` changes.
4. Check product cards and Debug Panel.

Expected result: one product stock changes automatically and Redux product state reflects the update.

### Checkout Blocked When Stock Unavailable

1. Add a product to cart.
2. Wait for live stock updates until that product reaches `0`, or use Redux DevTools during instruction to set that product stock to `0`.
3. Check Cart Summary.

Expected result: Cart Summary shows a checkout blocked warning, and `Start checkout` is disabled until unavailable items are removed.

### Notification Center

1. Wait at least 8 seconds.
2. Confirm a notification appears in Notification Center.
3. Confirm the header unread notification count increases.
4. Click `Mark all as read`.

Expected result: notifications are stored in Redux, unread count appears in the header, and marking all as read resets unread count to `0`.

## Teaching Panels

### Redux Debug Panel

1. Interact with cart, product search, voucher, stock, and notifications.
2. Observe the matching Redux slices.

Expected result: the panel shows live state changes for classroom explanation.

### Buggy Cart Badge

1. Add products to the cart.
2. Compare Redux cart quantity with the incorrect local cart count.

Expected result: the mismatch remains visible as a deliberate debugging exercise.

## Future Automated Tests

If a test framework is added later, prioritize:

- Reducer behavior for cart, products, voucher, and notifications.
- Selector behavior for cart totals and product availability.
- RxJS stream timing for search, voucher validation, stock updates, and notifications.
- Checkout blocking behavior when stock becomes unavailable.

## Acceptance Criteria

The app is ready for training when:

1. `npm run build` passes.
2. `npm run verify` passes.
3. Manual test cases can be demonstrated in class.
4. Participants can trace whether each behavior uses local state, Redux, RxJS, or derived UI state.
