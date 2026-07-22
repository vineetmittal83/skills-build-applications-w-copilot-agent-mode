import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyState, ErrorState } from './ui.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((requestError) => setError(requestError.message)) }, [])
  return <DataPage title="Leaderboard" kicker="WEEKLY MOMENTUM" error={error}><div className="rank-list">{entries.map((entry, index) => <article className="rank-row" key={entry._id}><span className="rank-number">{entry.rank ?? index + 1}</span><div><strong>{entry.user?.name ?? entry.user ?? 'Unknown athlete'}</strong><small>{entry.team?.name ?? 'Independent'}</small></div><b>{entry.points ?? entry.weeklyPoints ?? 0} pts</b></article>)}</div>{!error && entries.length === 0 && <EmptyState />}{error && <ErrorState message={error} />}</DataPage>
}

export default Leaderboard