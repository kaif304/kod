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

function PackageCreatePage() {
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleSave = async (payload) => {
        setIsSaving(true)
        setMessage('')

        try {
            await savePackage(payload)

            await queryClient.invalidateQueries({
                queryKey: ['admin-packages'],
            })

            navigate('/admin/packages')
            // navigate('/admin/packages', {
            //     state: {
            //         message: 'Package created successfully.',
            //     },
            //     replace: true,
            // })

            setMessage('Package created successfully.')
        } catch (error) {
            console.log(error.response?.data);
            setMessage(error.response?.data?.message || 'Unable to save package.')
        } finally {
            setIsSaving(false)
        }
    }

  return (
    <AdminContentLayout top = {
        <div className="flex items-center justify-between pb-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">New Package</h1>
            </div>
        </div>
        }>

        <PackageEditor 
            onSubmit={handleSave} 
            isSaving={isSaving}
        />
    </AdminContentLayout>
  )
}

export default PackageCreatePage
