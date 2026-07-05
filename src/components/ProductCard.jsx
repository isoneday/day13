import { useDispatch } from 'react-redux';
import { cartItemAdded } from '../features/cart/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
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
          <dd>{product.stock}</dd>
        </div>
      </dl>
      <button type="button" onClick={() => dispatch(cartItemAdded(product))}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
