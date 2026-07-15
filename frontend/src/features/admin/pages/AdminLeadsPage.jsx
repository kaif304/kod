import { useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import AdminContentLayout from '../components/AdminContentLayout.jsx'

import { formatDate } from '../../../utils/format.js'
import { fetchLeads, updateLeadStatus } from '../services.js'

const statusOptions = ['new', 'contacted', 'quoted', 'won', 'lost']

function AdminLeadsPage() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  const loadLeads = async () => {
    const result = await fetchLeads({ limit: 50 })
    setLeads(result.items || [])
  }

  useEffect(() => {
    let isMounted = true

    async function hydrate() {
      try {
        const result = await fetchLeads({ limit: 50 })
        if (isMounted) {
          setLeads(result.items || [])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    hydrate()

    return () => {
      isMounted = false
    }
  }, [])

  const handleStatusChange = async (leadId, status) => {
    try {
      await updateLeadStatus(leadId, status)
      await loadLeads()
      setMessage('Lead status updated successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update lead status.')
    }
  }

  return (
      <AdminContentLayout top = {
        <div className='glass-panel rounded-[2rem] p-6 flex justify-between items-center'>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Lead management</p>
          <h2 className="text-3xl font-semibold text-slate-900">Customer inquiries</h2>
          {message ? <p className="mt-4 text-sm text-cyan-900">{message}</p> : null}
        </div>
      }>
        <div className="grid gap-4">
          {isLoading ? (
            <Loader label="Loading leads" />
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="grid gap-4 rounded-[1.5rem] bg-white/75 p-5 lg:grid-cols-[1.1fr_1fr_0.9fr_0.8fr]"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-900">{lead.customerName}</p>
                  <p className="mt-1 text-sm text-slate-500">{lead.packageTitle || 'General inquiry'}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{lead.message || 'No message'}</p>
                </div>
                <div className="text-sm leading-7 text-slate-600">
                  <p>{lead.phone}</p>
                  <p>{lead.email || 'No email provided'}</p>
                  <p className="capitalize">{lead.contactMode?.replace('_', ' ') || '-'}</p>
                  <p>{formatDate(lead.createdAt)}</p>
                </div>
                <div className="space-y-3">
                  <StatusBadge value={lead.status} />
                  <p className="text-sm text-slate-500 capitalize">Source: {lead.source?.replace('_', ' ') || '-'}</p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Update status</span>
                  <select
                    value={lead.status}
                    onChange={(event) => handleStatusChange(lead.id, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))
          )}
          {isLoading ? (
            <Loader label="Loading leads" />
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="grid gap-4 rounded-[1.5rem] bg-white/75 p-5 lg:grid-cols-[1.1fr_1fr_0.9fr_0.8fr]"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-900">{lead.customerName}</p>
                  <p className="mt-1 text-sm text-slate-500">{lead.packageTitle || 'General inquiry'}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{lead.message || 'No message'}</p>
                </div>
                <div className="text-sm leading-7 text-slate-600">
                  <p>{lead.phone}</p>
                  <p>{lead.email || 'No email provided'}</p>
                  <p className="capitalize">{lead.contactMode?.replace('_', ' ') || '-'}</p>
                  <p>{formatDate(lead.createdAt)}</p>
                </div>
                <div className="space-y-3">
                  <StatusBadge value={lead.status} />
                  <p className="text-sm text-slate-500 capitalize">Source: {lead.source?.replace('_', ' ') || '-'}</p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Update status</span>
                  <select
                    value={lead.status}
                    onChange={(event) => handleStatusChange(lead.id, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))
          )}
          {isLoading ? (
            <Loader label="Loading leads" />
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="grid gap-4 rounded-[1.5rem] bg-white/75 p-5 lg:grid-cols-[1.1fr_1fr_0.9fr_0.8fr]"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-900">{lead.customerName}</p>
                  <p className="mt-1 text-sm text-slate-500">{lead.packageTitle || 'General inquiry'}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{lead.message || 'No message'}</p>
                </div>
                <div className="text-sm leading-7 text-slate-600">
                  <p>{lead.phone}</p>
                  <p>{lead.email || 'No email provided'}</p>
                  <p className="capitalize">{lead.contactMode?.replace('_', ' ') || '-'}</p>
                  <p>{formatDate(lead.createdAt)}</p>
                </div>
                <div className="space-y-3">
                  <StatusBadge value={lead.status} />
                  <p className="text-sm text-slate-500 capitalize">Source: {lead.source?.replace('_', ' ') || '-'}</p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Update status</span>
                  <select
                    value={lead.status}
                    onChange={(event) => handleStatusChange(lead.id, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))
          )}
          {isLoading ? (
            <Loader label="Loading leads" />
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="grid gap-4 rounded-[1.5rem] bg-white/75 p-5 lg:grid-cols-[1.1fr_1fr_0.9fr_0.8fr]"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-900">{lead.customerName}</p>
                  <p className="mt-1 text-sm text-slate-500">{lead.packageTitle || 'General inquiry'}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{lead.message || 'No message'}</p>
                </div>
                <div className="text-sm leading-7 text-slate-600">
                  <p>{lead.phone}</p>
                  <p>{lead.email || 'No email provided'}</p>
                  <p className="capitalize">{lead.contactMode?.replace('_', ' ') || '-'}</p>
                  <p>{formatDate(lead.createdAt)}</p>
                </div>
                <div className="space-y-3">
                  <StatusBadge value={lead.status} />
                  <p className="text-sm text-slate-500 capitalize">Source: {lead.source?.replace('_', ' ') || '-'}</p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Update status</span>
                  <select
                    value={lead.status}
                    onChange={(event) => handleStatusChange(lead.id, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))
          )}
        </div>
      </AdminContentLayout>
  )
}

export default AdminLeadsPage
