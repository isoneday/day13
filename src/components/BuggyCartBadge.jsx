import { useState } from 'react';
import { useSelector } from 'react-redux';

function BuggyCartBadge() {
  const realCartQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
  const [localCartCount] = useState(0);

  return (
    <section className="panel bug-panel" aria-labelledby="bug-title">
      <div>
        <p className="eyebrow">Deliberate Bug Simulation</p>
        <h2 id="bug-title">State Mismatch: Cart Badge</h2>
      </div>
      <p>
        This teaching panel intentionally keeps an incorrect local cart count. Add products to the
        cart and compare both values with the Redux Debug Panel.
      </p>
      <div className="bug-count-grid">
        <div>
          <span>Redux cart quantity</span>
          <strong>{realCartQuantity}</strong>
        </div>
        <div className="incorrect-count">
          <span>Incorrect local cart count</span>
          <strong>{localCartCount}</strong>
        </div>
      </div>
      <p className="bug-note">
        The bug is duplicated state: the component displays a local value that is not updated from
        the real cart source of truth.
      </p>
    </section>
  );
}

export default BuggyCartBadge;
