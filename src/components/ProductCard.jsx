import { useDispatch } from 'react-redux';
import { cartItemAdded } from '../features/cart/cartSlice.js';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isOutOfStock = product.stock <= 0;

  return (
    <article className={`product-card ${isOutOfStock ? 'product-card-out' : ''}`}>
      <div>
        <p className="category-label">{product.category}</p>
        <h3>{product.name}</h3>
      </div>
      <dl className="product-meta">
        <div>
          <dt>Price</dt>
          <dd>${product.price.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Stock</dt>
          <dd>{isOutOfStock ? 'Out of stock' : product.stock}</dd>
        </div>
      </dl>
      <button
        type="button"
        disabled={isOutOfStock}
        onClick={() => dispatch(cartItemAdded(product))}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to cart'}
      </button>
    </article>
  );
}

export default ProductCard;
