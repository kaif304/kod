import { useDeferredValue, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

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

  const queryParams = {
    ...filters,
    search: deferredSearch,
  }

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['packages', queryParams],
    queryFn: () => fetchPackages(queryParams),
  })

  return (
    <>
      <section className="section-shell mt-10 pb-4">
        <PackageFilters
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />

        <PackageGrid
          packages={data?.items ?? []}
          loading={isLoading}
          error={isError ? error.message : ''}
        />
      </section>
    </>
  )
}

export default PackagesPage





// import { useDeferredValue, useState } from 'react'
// import { useQuery } from '@tanstack/react-query'

// import PageHero from '../../../components/common/PageHero.jsx'
// import PackageFilters from '../components/PackageFilters.jsx'
// import PackageGrid from '../components/PackageGrid.jsx'
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
//   const deferredSearch = useDeferredValue(filters.search)

//   const updateFilter = (name, value) => {
//     setFilters((current) => ({
//       ...current,
//       [name]: value,
//     }))
//   }

//   const resetFilters = () => {
//     setFilters(initialFilters)
//   }

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: [
//       'packages',
//       {
//         search: deferredSearch,
//         category: filters.category,
//         destination: filters.destination,
//         duration: filters.duration,
//         minBudget: filters.minBudget,
//         maxBudget: filters.maxBudget,
//       },
//     ],
//     queryFn: () =>
//       fetchPackages({
//         ...filters,
//         search: deferredSearch,
//       }),
//   })

//   return (
//     <>
//       <PageHero
//         eyebrow="Travel Packages"
//         title="Find your next destination."
//         description="Browse our curated travel experiences."
//       />

//       <section className="section-shell mt-10 pb-4">
//         <PackageFilters
//           filters={filters}
//           updateFilter={updateFilter}
//           resetFilters={resetFilters}
//         />

//         <PackageGrid
//           packages={packages}
//           loading={isLoading}
//           error={errorMessage}
//         />
//       </section>
//     </>
//   )
// }

// export default PackagesPage