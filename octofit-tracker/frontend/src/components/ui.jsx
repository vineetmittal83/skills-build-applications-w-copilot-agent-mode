export function DataPage({ title, kicker, error, children }) {
  return <section className="data-page"><p className="eyebrow">{kicker}</p><h1>{title}</h1>{error ? <ErrorState message={error} /> : children}</section>
}

export function EmptyState() { return <p className="empty-state">No records found yet.</p> }
export function ErrorState({ message }) { return <p className="error-state">Unable to load data: {message}</p> }
