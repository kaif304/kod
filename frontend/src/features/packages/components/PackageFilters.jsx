import FormField from '../../../components/common/FormField.jsx'
import { siteConfig } from '../../../content/site.js'

const durationOptions = [3, 4, 5, 6, 7, 10]

function PackageFilters({
  filters,
  updateFilter,
  resetFilters,
}) {
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">

        <FormField
          label="Search"
          placeholder="Search packages"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />

        <FormField
          label="Category"
          as="select"
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="">All categories</option>

          {siteConfig.categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </FormField>

        <FormField
          label="Destination"
          placeholder="Kashmir, Bali..."
          value={filters.destination}
          onChange={(e) => updateFilter('destination', e.target.value)}
        />

        <FormField
          label="Duration"
          as="select"
          value={filters.duration}
          onChange={(e) => updateFilter('duration', e.target.value)}
        >
          <option value="">Any duration</option>

          {durationOptions.map((day) => (
            <option
              key={day}
              value={day}
            >
              {day} Days
            </option>
          ))}
        </FormField>

        <FormField
          type="number"
          label="Min Budget"
          placeholder="20000"
          value={filters.minBudget}
          onChange={(e) => updateFilter('minBudget', e.target.value)}
        />

        <FormField
          type="number"
          label="Max Budget"
          placeholder="60000"
          value={filters.maxBudget}
          onChange={(e) => updateFilter('maxBudget', e.target.value)}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border px-4 py-2 text-sm font-medium"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default PackageFilters