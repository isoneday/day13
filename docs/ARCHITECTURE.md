# Architecture

## Architecture Goal

The architecture is small, explicit, and easy to teach. The app favors readable components and visible state boundaries over production abstractions.

## Folder Structure

```text
src/
  app/
    store.js
  components/
    ArchitectureDecisionPanel.jsx
    BuggyCartBadge.jsx
    CartSummary.jsx
    DebugPanel.jsx
    Header.jsx
    LiveStockSimulator.jsx
    NotificationCenter.jsx
    ProductCard.jsx
    ProductList.jsx
    ProductSearch.jsx
    VoucherBox.jsx
  data/
    products.js
  features/
    cart/
      cartSlice.js
    notifications/
      notificationsSlice.js
    products/
      productsSlice.js
    voucher/
      voucherSlice.js
  services/
    fakeApi.js
```

## Redux Store Structure

The Redux store is configured in `src/app/store.js`.

```text
store
  products
    items
    selectedCategory
    searchKeyword
    loading
    error
    lastStockUpdate
  cart
    items
    checkoutStep
    error
  voucher
    code
    status
    discountPercent
    message
    error
  notifications
    items
    unreadCount
```

## Local Vs Central State

Use local React state for:

- Immediate search input display
- Component-only draft values
- Small UI toggles or local display details

Use Redux for:

- Product catalog and current stock
- Category and stable search keyword
- Cart items and checkout state
- Voucher validation result
- Notification list and unread count

Use derived UI state for:

- Filtered product list
- Cart total quantity
- Cart subtotal, discount amount, and final total
- Checkout blocked state
- Out-of-stock button state

Do not store derived arrays or totals unless the lesson explicitly requires it.

## RxJS Stream Decisions

RxJS is used only where timing matters:

- `ProductSearch`: typing is debounced before updating the stable Redux search keyword.
- `VoucherBox`: voucher input is debounced, validated through a fake Promise API, and protected from stale responses with `switchMap`.
- `LiveStockSimulator`: stock changes arrive as simulated system events every 5 seconds.
- `NotificationCenter`: notifications arrive as simulated events every 8 seconds.

Redux stores the current business result of those streams. RxJS manages event timing; Redux owns the durable state the UI reads.

## Key Flows

Product search:

```text
local input state
  -> RxJS Subject
  -> debounceTime(400)
  -> searchKeywordChanged
  -> products.searchKeyword
  -> ProductList derives visible products
```

Voucher validation:

```text
voucher input
  -> voucherInputChanged
  -> RxJS Subject
  -> debounceTime(500)
  -> switchMap(validateVoucherApi)
  -> voucherValidationSucceeded / Failed / Errored
  -> voucher state affects CartSummary totals
```

Live stock:

```text
interval(5000)
  -> random product stock update
  -> productStockUpdated
  -> product cards and checkout validation update
```

Notifications:

```text
interval(8000)
  -> notificationReceived
  -> notifications.items and unreadCount
  -> Header badge and NotificationCenter update
```

## Known Simplifications

- There is no backend.
- Stock, voucher, and notification events are simulated in the browser.
- Checkout does not place an order.
- Frontend checkout validation is only a teaching aid; real systems need backend validation.
- There is no persistence across page reloads.
- The Buggy Cart Badge is intentionally incorrect for a debugging exercise.
- The app uses simple CSS and no UI component library.
