import { startTransition, useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import { formatCurrency } from '../../../utils/format.js'
import PackageEditor from '../components/PackageEditor.jsx'
import { fetchAdminPackages, removePackage, savePackage } from '../services.js'

function AdminPackagesPage() {
  const [packages, setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const loadPackages = async () => {
    const result = await fetchAdminPackages({ limit: 50 })
    setPackages(result.items || [])
  }

  useEffect(() => {
    let isMounted = true

    async function hydrate() {
      try {
        const result = await fetchAdminPackages({ limit: 50 })
        if (isMounted) {
          setPackages(result.items || [])
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

  const handleSave = async (payload) => {
    setIsSaving(true)
    setMessage('')

    try {
      await savePackage(payload, selectedPackage?.id)
      await loadPackages()
      startTransition(() => {
        setSelectedPackage(null)
      })
      setMessage('Package saved successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to save package.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (packageId) => {
    const shouldDelete = window.confirm('Delete this package?')

    if (!shouldDelete) {
      return
    }

    try {
      await removePackage(packageId)
      await loadPackages()
      setMessage('Package deleted successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete package.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Packages</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage all published and draft travel packages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => startTransition(() => setSelectedPackage(null))}
          className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          New Package
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Loader label="Loading admin packages" />
        ) : (
          packages.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <StatusBadge value={item.status} />
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {item.destination}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => startTransition(() => setSelectedPackage(item))}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    // <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
    //   <div className="glass-panel rounded-[2rem] p-6">
    //     <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Package management</p>
    //     <h2 className="mt-3 text-3xl font-semibold text-slate-900">Live inventory showcase</h2>
    //     {message ? <p className="mt-4 text-sm text-cyan-900">{message}</p> : null}

    //     <div className="mt-6 grid gap-4">
    //       {isLoading ? (
    //         <Loader label="Loading admin packages" />
    //       ) : (
    //         packages.map((item) => (
    //           <div key={item.id} className="rounded-[1.5rem] bg-white/70 p-4">
    //             <div className="flex flex-wrap items-start justify-between gap-4">
    //               <div>
    //                 <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
    //                 <p className="mt-2 text-sm text-slate-500">
    //                   {item.destination} • {formatCurrency(item.price)}
    //                 </p>
    //               </div>
    //               <StatusBadge value={item.status} />
    //             </div>
    //             <div className="mt-4 flex flex-wrap gap-3">
    //               <button
    //                 type="button"
    //                 onClick={() => startTransition(() => setSelectedPackage(item))}
    //                 className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
    //               >
    //                 Edit
    //               </button>
    //               <button
    //                 type="button"
    //                 onClick={() => handleDelete(item.id)}
    //                 className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
    //               >
    //                 Delete
    //               </button>
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>

    //   {/* <PackageEditor
    //     key={selectedPackage?.id || 'new'}
    //     selectedPackage={selectedPackage}
    //     onSubmit={handleSave}
    //     onCancel={() => setSelectedPackage(null)}
    //     isSaving={isSaving}
    //   /> */}
    // </div>
  )
}

export default AdminPackagesPage
