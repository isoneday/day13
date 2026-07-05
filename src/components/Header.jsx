import { useSelector } from 'react-redux';

function Header() {
  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">Day 13 Training Project</p>
        <h1>ShopSphere Day 13</h1>
      </div>
      <div className="cart-badge" aria-label={`Cart contains ${totalQuantity} items`}>
        Cart <span>{totalQuantity}</span>
      </div>
    </header>
  );
}

export default Header;
