import ArchitectureDecisionPanel from './components/ArchitectureDecisionPanel';
import BuggyCartBadge from './components/BuggyCartBadge';
import CartSummary from './components/CartSummary';
import DebugPanel from './components/DebugPanel';
import Header from './components/Header';
import LiveStockSimulator from './components/LiveStockSimulator';
import NotificationCenter from './components/NotificationCenter';
import ProductList from './components/ProductList';

function App() {
  return (
    <main className="app-shell">
      <Header />

      <section className="intro-panel">
        <p className="intro">
          Practice the Redux loop: user action, dispatched action, reducer update, store change, and
          UI refresh.
        </p>
      </section>

      <div className="shop-layout">
        <ProductList />
        <CartSummary />
      </div>

      <LiveStockSimulator />
      <NotificationCenter />
      <BuggyCartBadge />
      <ArchitectureDecisionPanel />
      <DebugPanel />
    </main>
  );
}

export default App;
