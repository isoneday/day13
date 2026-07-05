import { useSelector } from 'react-redux';

function DebugPanel() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const voucher = useSelector((state) => state.voucher);

  return (
    <section className="panel debug-panel" aria-labelledby="debug-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Teaching Tool</p>
          <h2 id="debug-title">Redux Debug Panel</h2>
        </div>
      </div>

      <div className="debug-grid">
        <div>
          <h3>products state</h3>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
        <div>
          <h3>cart state</h3>
          <pre>{JSON.stringify(cart, null, 2)}</pre>
        </div>
        <div>
          <h3>voucher state</h3>
          <pre>{JSON.stringify(voucher, null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}

export default DebugPanel;
