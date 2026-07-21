import { startTransition, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'

import Loader from '../../../components/common/Loader.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import PackageEditor from '../components/PackageEditor.jsx'
import AdminPackageCard from '../components/AdminPackageCard.jsx'
import PackageGrid from '../components/PackageGrid.jsx'
import AdminContentLayout from '../components/AdminContentLayout.jsx'

import { formatCurrency } from '../../../utils/format.js'
import { fetchAdminPackage, fetchAdminPackages, deletePackage, savePackage } from '../services.js'

function PackageEditPage() {
    const { id } = useParams()

    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        data: packageItem, 
        isLoading, 
        error,
        refetch,
        } = useQuery({
            queryKey: ['admin-package', id],
            queryFn: () => fetchAdminPackage(id),
        })

    const handleSave = async (payload) => {
        setIsSaving(true)
        setMessage('')

        try {
            await savePackage(payload, id)

            await queryClient.invalidateQueries({
                queryKey: ['admin-packages'],
            })

            navigate('/admin/packages')

            setMessage('Package updated successfully.')
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
            await deletePackage(packageId)
            await refetch()
            setMessage('Package deleted successfully.')
        } 
        catch (error) {
            setMessage(error.response?.data?.message || 'Unable to delete package.')
        }
    }

  return (
    <AdminContentLayout top = {
        <div className="flex items-center justify-between pb-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Edit Package</h1>
            </div>
        </div>
        }>

        <PackageEditor 
            selectedPackage={packageItem} 
            onSubmit={handleSave} 
            isSaving={isSaving}
            onDelete={handleDelete} 
        />
    </AdminContentLayout>
  )
}

export default PackageEditPage
