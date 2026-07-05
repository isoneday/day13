# Test Plan

## Strategy

This training app uses manual verification plus one lightweight script. There is no heavy test framework because the project is optimized for classroom readability.

## Required Commands

Install dependencies when needed:

```bash
npm install
```

Run verification:

```bash
npm run verify
```

Build:

```bash
npm run build
```

Run locally:

```bash
npm run dev
```

## Manual Verification Steps

### Product List Rendering

1. Open the app.
2. Confirm five kitchenware or meal-prep products render.
3. Confirm each product shows name, category, price, and stock.

Expected result: products render from local demo data.

### Category Filter

1. Select `Storage`.
2. Confirm only storage products are visible.
3. Select `All`.

Expected result: category state updates and the full list returns.

### RxJS Debounced Search

1. Type `glass`.
2. Confirm the input changes immediately.
3. Confirm `Redux search keyword` updates after the debounce.
4. Confirm products filter after the Redux keyword changes.

Expected result: local input is immediate; Redux search keyword is delayed and stable.

### Add To Cart

1. Click `Add to cart` on an in-stock product.
2. Add the same product again.
3. Check Cart Summary.

Expected result: cart item appears and quantity increases.

### Cart Badge Update

1. Add products to cart.
2. Check Header cart badge.
3. Compare with Debug Panel `cart.items`.

Expected result: Header cart badge matches Redux cart quantity.

### Checkout Empty Cart Error

1. Click `Clear cart`.
2. Click `Start checkout`.

Expected result: Cart Summary shows `Add at least one product before checkout.`

### Voucher SAVE20

1. Add a product to cart.
2. Type `SAVE20`.
3. Wait for validation.

Expected result: voucher status is `valid`, discount is 20%, and final price is reduced.

### Voucher FOOD10

1. Type `FOOD10`.
2. Wait for validation.

Expected result: voucher status is `valid`, discount is 10%, and final price is reduced.

### Invalid Voucher

1. Type `NOPE`.
2. Wait for validation.

Expected result: voucher status is `invalid` and the invalid message appears.

### ERROR Voucher

1. Type `ERROR`.
2. Wait for validation.

Expected result: voucher status is `error` and the simulated service error appears.

### Live Stock Update

1. Watch the Live Stock Simulator.
2. Wait at least 5 seconds.
3. Check product stock and Debug Panel `products.lastStockUpdate`.

Expected result: one product stock changes and state updates.

### Checkout Blocked When Stock Is Unavailable

1. Add a product to cart.
2. Wait until that product reaches stock `0`, or use Redux DevTools during instruction to set its stock to `0`.
3. Check Cart Summary.

Expected result: warning appears and `Start checkout` is disabled.

### Notification Center

1. Wait at least 8 seconds.
2. Confirm a notification appears.
3. Confirm Header unread notification count increases.
4. Click `Mark all as read`.

Expected result: unread count resets to `0`, and notification items are marked read.

### Debug Panel

1. Interact with search, cart, voucher, stock, and notifications.
2. Inspect matching Redux slices.

Expected result: Debug Panel reflects live Redux state.

### Buggy Cart Badge

1. Add products to cart.
2. Compare real Redux cart quantity with incorrect local cart count.

Expected result: mismatch remains visible as a deliberate teaching bug.

## Lightweight Verification Script

`npm run verify` checks:

- Empty checkout error
- Cart item quantity increment
- Stock clamping at `0`
- Voucher API results for `SAVE20`, `FOOD10`, invalid codes, and `ERROR`
- Voucher reducer success state
- Notification unread count increment and reset

## Acceptance Criteria

Before classroom use:

1. `npm run verify` passes.
2. `npm run build` passes.
3. Manual checks are understood by the instructor.
4. Known limitations are explained to participants.

## Known Limitations

- No automated browser tests.
- RxJS timing is mainly verified manually.
- Live stock and notifications are random simulations.
- No backend validation is implemented.
