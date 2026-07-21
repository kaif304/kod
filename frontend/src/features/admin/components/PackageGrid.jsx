import EmptyState from '../../../components/common/EmptyState.jsx'
import Loader from '../../../components/common/Loader.jsx'
import AdminPackageCard from '../components/AdminPackageCard.jsx'

function PackageGrid({
  packages,
  loading,
  error,
  onDelete
}) {
  if (loading) {
    return (
      <div className="py-20">
        <Loader label="Loading packages..." />
      </div>
    )
  }

  return (
    <>
      {error && (
        <p className="mt-0 text-sm text-amber-700">
          {error}
        </p>
      )}

      <div className="mt-0">
        {packages.length ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {packages.map((item) => (
              <AdminPackageCard
                key={item.slug}
                item={item}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No packages matched these filters"
            description="Try broadening the destination, duration, or budget range."
          />
        )}
      </div>
    </>
  )
}

export default PackageGrid