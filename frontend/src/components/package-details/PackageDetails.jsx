import PackageHero from './PackageHero.jsx'
import PackageGallery from './PackageGallery.jsx'
import PackageOverview from './PackageOverview.jsx'
import PackageItinerary from './PackageItinerary.jsx'
import PackageInclusionsExclusions from './PackageInclusionsExclusions.jsx'
import PackageFaqs from './PackageFaqs.jsx'

function PackageDetails({ packageItem, faqs }) {
  const gallery = packageItem.gallery?.length
    ? packageItem.gallery
    : packageItem.coverImage
      ? [packageItem.coverImage]
      : []

  return (
    <div className="space-y-6">
      <PackageHero packageItem={packageItem} />

      <PackageGallery
        gallery={gallery}
        title={packageItem.title}
      />

      <PackageOverview packageItem={packageItem} />

      <PackageItinerary itinerary={packageItem.itinerary} />

      <PackageInclusionsExclusions
        inclusions={packageItem.inclusions}
        exclusions={packageItem.exclusions}
      />

      <PackageFaqs faqs={faqs} />
    </div>
  )
}

export default PackageDetails