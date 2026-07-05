import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { interval } from 'rxjs';
import { productStockUpdated } from '../features/products/productsSlice.js';

function LiveStockSimulator() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const lastStockUpdate = useSelector((state) => state.products.lastStockUpdate);
  const productsRef = useRef(products);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    const subscription = interval(5000).subscribe(() => {
      const currentProducts = productsRef.current;

      if (currentProducts.length === 0) {
        return;
      }

      const product = currentProducts[Math.floor(Math.random() * currentProducts.length)];
      const stockChanges = product.stock === 0 ? [1, 2] : [-2, -1, 1, 2];
      const stockChange = stockChanges[Math.floor(Math.random() * stockChanges.length)];
      const nextStock = Math.max(0, product.stock + stockChange);

      dispatch(
        productStockUpdated({
          productId: product.id,
          stock: nextStock,
          updatedAt: new Date().toLocaleTimeString(),
        }),
      );
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <section className="panel stock-simulator" aria-labelledby="stock-title">
      <div>
        <p className="eyebrow">RxJS System Event</p>
        <h2 id="stock-title">Live Stock Simulator</h2>
      </div>
      <p>
        A simulated stock event updates one random product every 5 seconds. Real shops must still
        validate stock on the backend before checkout.
      </p>
      <p className="stock-update-time">
        Last stock update: <strong>{lastStockUpdate || 'waiting for first update'}</strong>
      </p>
    </section>
  );
}

export default LiveStockSimulator;
