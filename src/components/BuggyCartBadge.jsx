import { useSelector } from 'react-redux';

function BuggyCartBadge() {
  const realCartQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <section className="panel bug-panel" aria-labelledby="bug-title">
      <div>
        <p className="eyebrow">Bug Fixed</p>
        <h2 id="bug-title">State Mismatch: Cart Badge</h2>
      </div>
      <p>
        This panel used to keep a duplicated local cart count that never updated. The fix was to
        delete that local state entirely and read the Redux cart quantity directly, instead of
        syncing two sources of truth.
      </p>
      <div className="bug-count-grid">
        <div>
          <span>Redux cart quantity</span>
          <strong>{realCartQuantity}</strong>
        </div>
        <div>
          <span>Local cart count (now the same selector)</span>
          <strong>{realCartQuantity}</strong>
        </div>
      </div>
      <p className="bug-note">
        There is now only one source of truth: <code>state.cart.items</code>.
      </p>
    </section>
  );
}

export default BuggyCartBadge;
