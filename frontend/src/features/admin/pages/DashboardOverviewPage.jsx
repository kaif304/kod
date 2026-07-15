import { useQuery } from '@tanstack/react-query'

import Loader from '../../../components/common/Loader.jsx'
import StatCard from '../../../components/common/StatCard.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import AdminContentLayout from '../components/AdminContentLayout.jsx'

import { fetchDashboardOverview } from '../services.js'
import { formatCurrency, formatDate } from '../../../utils/format.js'

function DashboardOverviewPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: fetchDashboardOverview,
  })

  console.log(data);
  const packagesStats = data?.stats?.packages ?? {}
  const leadsStats = data?.stats?.leads ?? {}

  if (isLoading) {
    return (
      <div className="glass-panel rounded-[2rem] p-10">
        <Loader label="Loading dashboard overview" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="glass-panel rounded-[2rem] p-10">
        <p className="text-red-600">
          {error.message || 'Unable to load dashboard overview.'}
        </p>
      </div>
    )
  }

  return (
    <AdminContentLayout top = {
      <div>
        <div className="glass-panel flex justify-between items-center  rounded-[2rem] p-6">
          <p className="text-lg uppercase tracking-[0.35em] text-slate-500">Overview</p>
          <h2 className="font-display text-5xl text-slate-900">Operations snapshot</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Total Packages" value={packagesStats.total || 0} />
          <StatCard label="Published Packages" value={packagesStats.published || 0} />
          <StatCard label="Total Leads" value={leadsStats.total || 0} />
          <StatCard label="Fresh Leads" value={leadsStats.new || 0} />
          {/* <StatCard label="Payments Logged" value={stats.totalPayments || 0} /> */}
          {/* <StatCard label="Revenue Collected" value={formatCurrency(data?.stats.revenueCollected || 0)}/> */}
        </div>
      </div>
    }>
      <div className="glass-panel rounded-[2rem]">
        <h3 className="text-2xl px-6 py-4 font-semibold text-slate-900">Recent leads</h3>
        <div className="">
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
    </AdminContentLayout>
  )
}

export default DashboardOverviewPage
