import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyState } from './ui.jsx'

const USERS_ENDPOINT = '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(USERS_ENDPOINT).then(setUsers).catch((requestError) => setError(requestError.message)) }, [])
  return <DataPage title="Members" kicker="YOUR COMMUNITY" error={error}><div className="card-grid">{users.map((user) => <article className="info-card" key={user._id}><span className="avatar">{user.name?.charAt(0) ?? '?'}</span><h2>{user.name}</h2><p>{user.email}</p><strong>{user.weeklyGoalMinutes ?? 0} min weekly goal</strong></article>)}</div>{!error && users.length === 0 && <EmptyState />}</DataPage>
}

export default Users