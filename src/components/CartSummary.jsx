import { useDispatch, useSelector } from 'react-redux';
import {
  cartCleared,
  cartErrorCleared,
  cartItemRemoved,
  checkoutStarted,
} from '../features/cart/cartSlice';

function CartSummary() {
  const dispatch = useDispatch();
  const { items, checkoutStep, error } = useSelector((state) => state.cart);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

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

      <dl className="totals">
        <div>
          <dt>Total quantity</dt>
          <dd>{totalQuantity}</dd>
        </div>
        <div>
          <dt>Total price</dt>
          <dd>${totalPrice.toFixed(2)}</dd>
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
