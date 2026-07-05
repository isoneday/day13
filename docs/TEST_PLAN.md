# Test Plan

## Test Strategy

Testing should focus on state behavior and user-visible outcomes. Early in the project, manual checks are acceptable. As the code grows, add focused automated tests for reducers, selectors, and stream behavior.

## Manual Test Checklist

### Product List

- Products render from local demo data.
- Product names, prices, and stock values are visible.
- Out-of-stock products cannot be added to cart.

### Search

- Typing filters or updates the product list.
- Repeated identical input does not cause unnecessary updates.
- Clearing search restores the product list.

### Cart

- Adding a product updates the cart count.
- Adding the same product increases quantity.
- Removing an item updates totals.
- Quantity cannot exceed available stock.
- Cart total updates after quantity changes.

### Voucher

- Empty voucher input does not apply a discount.
- Valid voucher shows success state.
- Invalid voucher shows error state.
- Fast typing does not allow an old validation result to overwrite the latest code.

### Stock Simulation

- Stock values can change through the simulation.
- Cart actions respond to stock changes.
- A notification appears if stock changes affect cart availability.

### Notifications

- Notifications appear for important user actions.
- Notifications dismiss after the expected timing.
- Multiple notifications do not break layout.

## Future Automated Tests

Recommended reducer tests:

- `addToCart` creates a new cart line.
- `addToCart` increments quantity for existing items.
- `removeFromCart` removes the selected item.
- `changeQuantity` respects valid bounds.
- Voucher actions update status correctly.
- Stock updates modify the correct product.

Recommended selector tests:

- Cart count is calculated correctly.
- Cart subtotal is calculated correctly.
- Discounted total is calculated correctly.
- Product availability is derived correctly from stock.

Recommended RxJS tests:

- Search stream debounces input.
- Search stream ignores duplicate values.
- Voucher stream returns only the latest validation result.
- Stock stream emits updates at the expected interval.
- Notification stream removes expired messages.

## Acceptance Criteria

The app is ready for training when a participant can perform a shop action and clearly see:

1. The UI event.
2. The state update path.
3. The resulting UI change.
4. Whether local state, Redux, or RxJS was responsible.
