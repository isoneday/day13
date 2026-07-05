const decisions = [
  {
    topic: 'Cart state',
    decision: 'Store in Redux',
    reason: 'Header, cart summary, checkout, and debug tools need one shared truth.',
    risk: 'Wrong totals, inconsistent badges, and broken checkout trust.',
  },
  {
    topic: 'Voucher typing',
    decision: 'Process as RxJS stream',
    reason: 'Typing needs debounce, duplicate filtering, and cancellation.',
    risk: 'Stale validations can overwrite newer user intent.',
  },
  {
    topic: 'Voucher result',
    decision: 'Store in Redux',
    reason: 'Discount and validation status affect cart totals and checkout messaging.',
    risk: 'Different screens may show different discount decisions.',
  },
  {
    topic: 'Live stock update',
    decision: 'Use RxJS event stream, store stock in Redux',
    reason: 'Stock changes over time and multiple UI areas need current availability.',
    risk: 'Users may add unavailable products or start invalid checkout.',
  },
  {
    topic: 'Small UI state',
    decision: 'Keep local',
    reason: 'Component-only toggles and draft display values do not need global ownership.',
    risk: 'Redux becomes noisy and harder to govern.',
  },
  {
    topic: 'Search input',
    decision: 'Local display, RxJS debounce, Redux keyword',
    reason: 'Typing should feel immediate while product filtering uses a stable keyword.',
    risk: 'Filtering may feel jumpy or shared state may update too often.',
  },
  {
    topic: 'Global error/loading state',
    decision: 'Keep feature-scoped first',
    reason: 'Errors and loading states should stay near the behavior they describe.',
    risk: 'A generic global bucket can hide ownership and recovery rules.',
  },
];

function ArchitectureDecisionPanel() {
  return (
    <section className="panel architecture-panel" aria-labelledby="architecture-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Management Transfer</p>
          <h2 id="architecture-title">Architecture Decision Panel</h2>
        </div>
      </div>

      <div className="decision-table-wrap">
        <table className="decision-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Decision</th>
              <th>Reason</th>
              <th>Risk if unmanaged</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((decision) => (
              <tr key={decision.topic}>
                <th scope="row">{decision.topic}</th>
                <td>{decision.decision}</td>
                <td>{decision.reason}</td>
                <td>{decision.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ArchitectureDecisionPanel;
