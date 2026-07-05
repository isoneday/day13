import { useDispatch, useSelector } from 'react-redux';
import { categorySelected, searchKeywordChanged } from '../features/products/productsSlice';
import ProductCard from './ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  const { items, selectedCategory, searchKeyword, loading, error } = useSelector(
    (state) => state.products,
  );

  const categories = ['All', ...new Set(items.map((product) => product.category))];
  const normalizedSearch = searchKeyword.trim().toLowerCase();

  const visibleProducts = items.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="panel product-section" aria-labelledby="products-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Redux Products Slice</p>
          <h2 id="products-title">Kitchenware Products</h2>
        </div>
      </div>

      <div className="filters">
        <label>
          Category
          <select
            value={selectedCategory}
            onChange={(event) => dispatch(categorySelected(event.target.value))}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Search
          <input
            type="search"
            value={searchKeyword}
            onChange={(event) => dispatch(searchKeywordChanged(event.target.value))}
            placeholder="Search products"
          />
        </label>
      </div>

      {loading && <p className="muted">Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p className="empty-state">No products match the current filters.</p>
      )}
    </section>
  );
}

export default ProductList;
