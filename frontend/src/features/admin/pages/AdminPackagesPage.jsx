import { startTransition, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import Loader from '../../../components/common/Loader.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import AdminPackageCard from '../components/AdminPackageCard.jsx'
import PackageGrid from '../components/PackageGrid.jsx'
import AdminContentLayout from '../components/AdminContentLayout.jsx'

import { formatCurrency } from '../../../utils/format.js'
import { fetchAdminPackages, deletePackage, savePackage } from '../services.js'

function AdminPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-packages'],
    queryFn: () => fetchAdminPackages({ limit: 50 }),
  })

  const packages = data?.items ?? [];

  const handleSave = async (payload) => {
    setIsSaving(true)
    setMessage('')

    try {
      await savePackage(payload, selectedPackage?.id)

      await refetch()

      startTransition(() => {
        setSelectedPackage(null)
      })

      setMessage('Package saved successfully.')
    } 
    catch (error) {
      setMessage(error.response?.data?.message || 'Unable to save package.')
    } 
    finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (packageId) => {
    const shouldDelete = window.confirm('Delete this package?')

    if (!shouldDelete) {
      return
    }

    try {
      await deletePackage(packageId)

      await refetch()

      setMessage('Package deleted successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete package.')
    }
  }

  return (
    <AdminContentLayout top = {
      <div className="flex items-center justify-between pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Packages</h1>
        </div>

        <Link
          to={`/admin/packages/new`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900"
        >
          New Package
        </Link>
      </div>
    }>
      <PackageGrid
        packages={packages}
        loading={isLoading}
        error={isError ? error.message : ''}
        onDelete={handleDelete}
      />
    </AdminContentLayout>
  )
}

export default AdminPackagesPage
