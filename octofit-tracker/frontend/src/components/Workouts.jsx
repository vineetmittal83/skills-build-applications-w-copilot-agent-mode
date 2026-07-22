import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyState } from './ui.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((requestError) => setError(requestError.message)) }, [])
  return <DataPage title="Workouts" kicker="YOUR NEXT SESSION" error={error}><div className="card-grid">{workouts.map((workout) => <article className="info-card" key={workout._id}><span className="card-index">{workout.difficulty ?? 'ALL LEVELS'}</span><h2>{workout.title}</h2><p>{workout.description ?? 'A focused session for your goals.'}</p><strong>{workout.durationMinutes ?? workout.duration ?? '-'} min</strong></article>)}</div>{!error && workouts.length === 0 && <EmptyState />}</DataPage>
}

export default Workouts