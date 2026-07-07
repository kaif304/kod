// import { useDeferredValue, useEffect, useState } from 'react'
// import EmptyState from '../../../components/common/EmptyState.jsx'
// import Loader from '../../../components/common/Loader.jsx'
// import PackageCard from '../../../components/common/PackageCard.jsx'
// import PageHero from '../../../components/common/PageHero.jsx'
// import FormField from '../../../components/common/FormField.jsx'
// import { fallbackPackages, siteConfig } from '../../../content/site.js'
// import { fetchPackages } from '../services.js'

// const initialFilters = {
//   search: '',
//   category: '',
//   destination: '',
//   duration: '',
//   minBudget: '',
//   maxBudget: '',
// }

// function PackagesPage() {
//   const [filters, setFilters] = useState(initialFilters)
//   const [packages, setPackages] = useState(fallbackPackages)
//   const [isLoading, setIsLoading] = useState(true)
//   const [errorMessage, setErrorMessage] = useState('')
//   const deferredSearch = useDeferredValue(filters.search)

//   useEffect(() => {
//     let isMounted = true

//     async function loadPackages() {
//       setIsLoading(true)
//       setErrorMessage('')

//       try {
//         const params = {
//           search: deferredSearch,
//           category: filters.category,
//           destination: filters.destination,
//           duration: filters.duration,
//           minBudget: filters.minBudget,
//           maxBudget: filters.maxBudget,
//           limit: 12,
//         }

//         const result = await fetchPackages({
//           ...params,
//         })

//         if (isMounted) {
//           setPackages(result.items || [])
//         }
//       } catch {
//         if (isMounted) {
//           setErrorMessage('Unable to load packages right now. Showing curated examples instead.')
//           setPackages(fallbackPackages)
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false)
//         }
//       }
//     }

//     loadPackages()

//     return () => {
//       isMounted = false
//     }
//   }, [
//     deferredSearch,
//     filters.category,
//     filters.destination,
//     filters.duration,
//     filters.maxBudget,
//     filters.minBudget,
//   ])

//   return (
//     <>
//       <PageHero
//         eyebrow="Packages"
//         title="Explore travel packages designed to start real conversations."
//         description="Search by destination, budget, category, or duration, then move leads into inquiry, callback, or token-reservation flows."
//       />

//       <section className="section-shell mt-10 pb-4">
//         <div className="glass-panel rounded-[2rem] p-6">
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">

//             <FormField
//               label="Search"
//               placeholder="Search packages"
//               value={filters.search}
//               onChange={(event) =>
//                 setFilters((current) => ({ ...current, search: event.target.value }))
//               }
//             />

//             <FormField
//               label="Category"
//               as="select"
//               value={filters.category}
//               onChange={(event) =>
//                 setFilters((current) => ({ ...current, category: event.target.value }))
//               }
//             >
//               <option value="">All categories</option>
//               {siteConfig.categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </FormField>

//             <FormField
//               label="Destination"
//               placeholder="Kashmir, Bali..."
//               value={filters.destination}
//               onChange={(event) =>
//                 setFilters((current) => ({ ...current, destination: event.target.value }))
//               }
//             />

//             <FormField
//               label="Duration"
//               as="select"
//               value={filters.duration}
//               onChange={(event) =>
//                 setFilters((current) => ({ ...current, duration: event.target.value }))
//               }
//             >
//               <option value="">Any duration</option>
//               {[4, 5, 6, 7].map((day) => (
//                 <option key={day} value={day}>
//                   {day} days
//                 </option>
//               ))}
//             </FormField>

//             <FormField
//               label="Min Budget"
//               placeholder="20000"
//               value={filters.minBudget}
//               onChange={(event) =>
//                 setFilters((current) => ({ ...current, minBudget: event.target.value }))
//               }
//             />
            
//             <FormField
//               label="Max Budget"
//               placeholder="60000"
//               value={filters.maxBudget}
//               onChange={(event) =>
//                 setFilters((current) => ({ ...current, maxBudget: event.target.value }))
//               }
//             />
//           </div>
//         </div>

//         {errorMessage ? <p className="mt-4 text-sm text-amber-700">{errorMessage}</p> : null}

//         <div className="mt-8">
//           {isLoading ? (
//             <div className="py-20">
//               <Loader label="Loading packages" />
//             </div>
//           ) : packages.length ? (
//             <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
//               {packages.map((item) => (
//                 <PackageCard key={item.slug} item={item} />
//               ))}
//             </div>
//           ) : (
//             <EmptyState
//               title="No packages matched these filters"
//               description="Try broadening the destination, duration, or budget range to see more curated travel options."
//             />
//           )}
//         </div>
//       </section>
//     </>
//   )
// }

// export default PackagesPage




import { useDeferredValue, useEffect, useState } from 'react'

import PageHero from '../../../components/common/PageHero.jsx'
import { fallbackPackages } from '../../../content/site.js'
import PackageFilters from '../components/PackageFilters.jsx'
import PackageGrid from '../components/PackageGrid.jsx'
import { fetchPackages } from '../services.js'

const initialFilters = {
  search: '',
  category: '',
  destination: '',
  duration: '',
  minBudget: '',
  maxBudget: '',
}

function PackagesPage() {
  const [filters, setFilters] = useState(initialFilters)
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const deferredSearch = useDeferredValue(filters.search)

  const updateFilter = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  useEffect(() => {
    async function loadPackages() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const result = await getPackages({
          ...filters,
          search: deferredSearch,
          limit: 12,
        })

        setPackages(result.items || [])
      } catch {
        setPackages(fallbackPackages)
        setErrorMessage(
          'Unable to load packages right now. Showing curated examples instead.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPackages()
  }, [
    deferredSearch,
    filters.category,
    filters.destination,
    filters.duration,
    filters.minBudget,
    filters.maxBudget,
  ])

  return (
    <>
      <PageHero
        eyebrow="Travel Packages"
        title="Find your next destination."
        description="Browse our curated travel experiences."
      />

      <section className="section-shell mt-10 pb-4">
        <PackageFilters
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />

        <PackageGrid
          packages={packages}
          loading={isLoading}
          error={errorMessage}
        />
      </section>
    </>
  )
}

export default PackagesPage