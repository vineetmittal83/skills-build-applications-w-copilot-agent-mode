import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Members' },
  { to: '/workouts', label: 'Workouts' },
]

function Overview() {
  return (
    <section className="welcome-panel">
      <p className="eyebrow">OCTOFIT TRACKER</p>
      <h1>Train together. Go further.</h1>
      <p className="lead">A shared view of movement, momentum, and the people making it happen.</p>
      <div className="overview-grid">
        <NavLink className="overview-link" to="/activities">Log activity <span aria-hidden="true">&rarr;</span></NavLink>
        <NavLink className="overview-link" to="/leaderboard">See leaderboard <span aria-hidden="true">&rarr;</span></NavLink>
        <NavLink className="overview-link" to="/workouts">Find a workout <span aria-hidden="true">&rarr;</span></NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand" to="/" aria-label="OctoFit Tracker home">
            <img src="/octofitapp-small.png" alt="" />
            <span>OctoFit</span>
          </NavLink>
          <nav className="main-nav" aria-label="Primary navigation">
            {navigation.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
