function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Day 13 Training Project</p>
        <h1>ShopSphere Day 13</h1>
        <p className="intro">
          A mini online shop for practicing React state management, Redux central state, and RxJS
          reactive streams.
        </p>
      </section>

      <section className="learning-panel" aria-labelledby="learning-title">
        <h2 id="learning-title">Training Focus</h2>
        <ul>
          <li>Local state for small UI details</li>
          <li>Redux Toolkit for shared shop state</li>
          <li>RxJS for timed event streams</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
