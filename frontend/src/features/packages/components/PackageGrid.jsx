import EmptyState from '../../../components/common/EmptyState.jsx'
import Loader from '../../../components/common/Loader.jsx'
import PackageCard from '../../../components/common/PackageCard.jsx'

function PackageGrid({
  packages,
  loading,
  error,
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
        <p className="mt-4 text-sm text-amber-700">
          {error}
        </p>
      )}

      <div className="mt-8">
        {packages.length ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {packages.map((item) => (
              <PackageCard
                key={item.slug}
                item={item}
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