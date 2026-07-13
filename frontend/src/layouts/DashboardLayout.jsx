import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

const dashboardLinks = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/packages', label: 'Packages' },
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/payments', label: 'Payments' },
]

function DashboardLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    // <div className="min-h-screen bg-[#f7f2e8] px-4 py-6 sm:px-6">
    //   <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
    <div className="min-h-screen bg-[#f7f2e8]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside className="glass-panel h-fit w-[280px] shrink-0 rounded-[2rem] p-4">

          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Admin Panel</p>
          <h1 className="mt-3 font-display text-4xl text-slate-900">KOD Control Room</h1>
          <div className="mt-6 rounded-[1.5rem] bg-white/70 p-4">
            <p className="text-sm font-semibold text-slate-900">{admin?.name}</p>
            <p className="mt-1 text-sm text-slate-500">{admin?.role}</p>
          </div>

          <nav className="mt-6 grid gap-2">
            {dashboardLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'bg-white/65 text-slate-700 hover:bg-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            Logout
          </button>
        </aside>

        <section className="space-y-6 min-w-0 flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default DashboardLayout
