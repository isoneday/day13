import { useDispatch, useSelector } from 'react-redux';
import {
  cartCleared,
  cartErrorCleared,
  cartItemRemoved,
  checkoutStarted,
} from '../features/cart/cartSlice';
import VoucherBox from './VoucherBox';

function CartSummary() {
  const dispatch = useDispatch();
  const { items, checkoutStep, error } = useSelector((state) => state.cart);
  const voucher = useSelector((state) => state.voucher);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = totalPrice * (voucher.discountPercent / 100);
  const finalPrice = totalPrice - discountAmount;

  return (
    <aside className="panel cart-summary" aria-labelledby="cart-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Redux Cart Slice</p>
          <h2 id="cart-title">Cart Summary</h2>
        </div>
      </div>

      {error && (
        <div className="error-box" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => dispatch(cartErrorCleared())}>
            Clear
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <p className="empty-state">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <button type="button" onClick={() => dispatch(cartItemRemoved(item.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <VoucherBox />

      <dl className="totals">
        <div>
          <dt>Total quantity</dt>
          <dd>{totalQuantity}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>${totalPrice.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Voucher discount</dt>
          <dd>
            {voucher.discountPercent}% (-${discountAmount.toFixed(2)})
          </dd>
        </div>
        <div className="final-total">
          <dt>Final price</dt>
          <dd>${finalPrice.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Checkout step</dt>
          <dd>{checkoutStep}</dd>
        </div>
      </dl>

      <div className="cart-actions">
        <button type="button" onClick={() => dispatch(checkoutStarted())}>
          Start checkout
        </button>
        <button type="button" className="secondary-button" onClick={() => dispatch(cartCleared())}>
          Clear cart
        </button>
      </div>
    </aside>
  );
}

export default CartSummary;
