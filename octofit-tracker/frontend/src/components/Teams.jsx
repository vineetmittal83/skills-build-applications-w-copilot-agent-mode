import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyState } from './ui.jsx'

const TEAMS_ENDPOINT = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(TEAMS_ENDPOINT).then(setTeams).catch((requestError) => setError(requestError.message)) }, [])
  return <DataPage title="Teams" kicker="THE CREW BOARD" error={error}><div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><span className="card-index">TEAM</span><h2>{team.name}</h2><p>{team.members?.length ?? 0} members</p><strong>{team.weeklyPoints ?? 0} weekly points</strong></article>)}</div>{!error && teams.length === 0 && <EmptyState />}</DataPage>
}

export default Teams