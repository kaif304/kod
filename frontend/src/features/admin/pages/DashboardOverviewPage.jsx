import { useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader.jsx'
import StatCard from '../../../components/common/StatCard.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import { fetchDashboardOverview } from '../services.js'
import { formatCurrency, formatDate } from '../../../utils/format.js'

function DashboardOverviewPage() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      try {
        const result = await fetchDashboardOverview()
        if (isMounted) {
          setData(result)
        }
      } catch {
        if (isMounted) {
          setData(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="glass-panel rounded-[2rem] p-10">
        <Loader label="Loading dashboard overview" />
      </div>
    )
  }

  return (
    <>
      <div className="glass-panel rounded-[2rem] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Overview</p>
        <h2 className="mt-3 font-display text-5xl text-slate-900">Operations snapshot</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Packages" value={data?.stats.totalPackages || 0} />
        <StatCard label="Published Packages" value={data?.stats.publishedPackages || 0} />
        <StatCard label="Total Leads" value={data?.stats.totalLeads || 0} />
        <StatCard label="Fresh Leads" value={data?.stats.freshLeads || 0} />
        <StatCard label="Payments Logged" value={data?.stats.totalPayments || 0} />
        <StatCard
          label="Revenue Collected"
          value={formatCurrency(data?.stats.revenueCollected || 0)}
        />
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <h3 className="text-2xl font-semibold text-slate-900">Recent leads</h3>
        <div className="mt-5 grid gap-4">
          {data?.recentLeads?.map((lead) => (
            <div
              key={lead.id}
              className="grid gap-3 rounded-[1.5rem] bg-white/70 p-4 md:grid-cols-[1.2fr_1fr_auto_auto]"
            >
              <div>
                <p className="font-semibold text-slate-900">{lead.customerName}</p>
                <p className="mt-1 text-sm text-slate-500">{lead.packageTitle || 'General inquiry'}</p>
              </div>
              <div className="text-sm text-slate-600">
                <p>{lead.phone}</p>
                <p className="capitalize">{lead.contactMode.replace('_', ' ')}</p>
              </div>
              <StatusBadge value={lead.status} />
              <p className="text-sm text-slate-500">{formatDate(lead.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DashboardOverviewPage
