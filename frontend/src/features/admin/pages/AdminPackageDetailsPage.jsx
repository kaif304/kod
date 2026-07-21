import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import Loader from '../../../components/common/Loader.jsx'
import EmptyState from '../../../components/common/EmptyState.jsx'
import PackageDetails from '../../../components/package-details/PackageDetails.jsx'
import AdminContentLayout from '../components/AdminContentLayout.jsx'

import { fetchAdminPackage } from '../services.js'
import { siteConfig } from '../../../content/site.js'

function AdminPackageDetailsPage() {
    const { id } = useParams()

    const { 
      data: packageItem, 
      isLoading, 
      error 
    } = useQuery({
        queryKey: ['admin-package', id],
        queryFn: () => fetchAdminPackage(id),
    })

    const faqs =
        packageItem?.faqs?.length
        ? packageItem.faqs
        : siteConfig.faqs

    if (isLoading) {
        return (
        <div className="section-shell flex min-h-[70vh] items-center justify-center pt-32">
            <Loader label="Loading package details" />
        </div>
        )
    }

  if (!packageItem) {
    return (
      <div className="section-shell pt-32">
        <EmptyState
          title="Package not found"
          description="The package you requested may have been removed or is not available yet."
        />
      </div>
    )
  }


  return (
    <AdminContentLayout top={
      <div className='glass-panel rounded-[2rem] p-6 flex justify-between items-center'>
        <p className="text-lg uppercase tracking-[0.35em] text-slate-500">Package Management</p>
      </div>
    }>
      <PackageDetails 
        packageItem={packageItem}
        faqs={faqs}
      />
    </AdminContentLayout>
  )
}

export default AdminPackageDetailsPage