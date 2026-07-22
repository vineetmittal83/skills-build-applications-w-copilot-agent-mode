import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { formatDate } from './utils.js'
import { DataPage, EmptyState } from './ui.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <DataPage title="Activities" kicker="MOVEMENT LOG" error={error}>
      <div className="table-wrap"><table><thead><tr><th>Type</th><th>Member</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>
        {activities.map((activity) => <tr key={activity._id}><td className="strong">{activity.type}</td><td>{activity.user?.name ?? activity.user ?? 'Unknown'}</td><td>{activity.durationMinutes} min</td><td>{activity.calories ?? '-'} kcal</td><td>{formatDate(activity.completedAt)}</td></tr>)}
      </tbody></table></div>
      {!error && activities.length === 0 && <EmptyState />}
    </DataPage>
  )
}

export default Activities