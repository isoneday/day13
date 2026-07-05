import { store } from '../src/app/store.js';
import { cartItemAdded, checkoutStarted } from '../src/features/cart/cartSlice.js';
import {
  allNotificationsMarkedRead,
  notificationReceived,
} from '../src/features/notifications/notificationsSlice.js';
import { productStockUpdated } from '../src/features/products/productsSlice.js';
import {
  voucherInputChanged,
  voucherValidationSucceeded,
} from '../src/features/voucher/voucherSlice.js';
import { validateVoucherApi } from '../src/services/fakeApi.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function runVerification() {
  const firstProduct = store.getState().products.items[0];

  store.dispatch(checkoutStarted());
  assert(
    store.getState().cart.error === 'Add at least one product before checkout.',
    'Empty checkout should set a cart error.',
  );

  store.dispatch(cartItemAdded(firstProduct));
  store.dispatch(cartItemAdded(firstProduct));
  assert(store.getState().cart.items[0].quantity === 2, 'Adding the same product should increment quantity.');

  store.dispatch(
    productStockUpdated({
      productId: firstProduct.id,
      stock: -3,
      updatedAt: 'verification',
    }),
  );
  assert(store.getState().products.items[0].stock === 0, 'Stock updates should not go below 0.');
  assert(
    store.getState().products.lastStockUpdate === 'verification',
    'Stock updates should record lastStockUpdate.',
  );

  const save20 = await validateVoucherApi('SAVE20');
  const food10 = await validateVoucherApi('FOOD10');
  const invalid = await validateVoucherApi('UNKNOWN');
  assert(save20.valid && save20.discountPercent === 20, 'SAVE20 should return 20% discount.');
  assert(food10.valid && food10.discountPercent === 10, 'FOOD10 should return 10% discount.');
  assert(!invalid.valid && invalid.discountPercent === 0, 'Unknown voucher should be invalid.');

  try {
    await validateVoucherApi('ERROR');
    throw new Error('ERROR voucher should reject.');
  } catch (error) {
    assert(
      error.message === 'Voucher service is temporarily unavailable.',
      'ERROR voucher should return the expected service error.',
    );
  }

  store.dispatch(voucherInputChanged('SAVE20'));
  store.dispatch(voucherValidationSucceeded(save20));
  assert(store.getState().voucher.discountPercent === 20, 'Voucher success should update discount.');

  store.dispatch(
    notificationReceived({
      id: 'verification-notification',
      type: 'system message',
      message: 'Verification notification',
      read: false,
      createdAt: 'verification',
    }),
  );
  assert(store.getState().notifications.unreadCount === 1, 'Notification should increment unread count.');

  store.dispatch(allNotificationsMarkedRead());
  assert(store.getState().notifications.unreadCount === 0, 'Mark all as read should reset unread count.');
  assert(
    store.getState().notifications.items.every((notification) => notification.read),
    'Mark all as read should mark each notification as read.',
  );

  console.log('State verification passed.');
}

runVerification().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
