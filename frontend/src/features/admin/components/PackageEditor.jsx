import { useState } from 'react'
import FormField from '../../../components/common/FormField.jsx'

const createBlankPackage = () => ({
  title: '',
  slug: '',
  description: '',
  price: 0,
  duration: 4,
  startingLocation: '',
  destination: '',
  coverImage: '',
  status: 'draft',

  itinerary: [
    {
      dayNumber: 1,
      title: '',
      description: '',
    },
  ],
})

function toEditorState(packageItem) {
  if (!packageItem) {
    return createBlankPackage()
  }

  return {
    title: packageItem.title || '',
    slug: packageItem.slug || '',
    description: packageItem.description || '',
    price: packageItem.price || 0,
    duration: packageItem.duration || 4,
    startingLocation: packageItem.startingLocation || '',
    destination: packageItem.destination || '',
    coverImage: packageItem.coverImage || '',
    status: packageItem.status || 'draft',

    itinerary: packageItem.itinerary?.length
      ? packageItem.itinerary
      : [{ dayNumber: 1, title: '', description: '' }],
  }
}

function PackageEditor({ selectedPackage, onSubmit, onCancel, isSaving }) {
  const [form, setForm] = useState(() => toEditorState(selectedPackage))

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateItinerary = (index, field, value) => {
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      duration: Number(form.duration),
      startingLocation: form.startingLocation.trim(),
      destination: form.destination.trim(),
      coverImage: form.coverImage.trim(),
      status: form.status.trim(),

      itinerary: form.itinerary.filter(
        (item) => item.dayNumber && item.title.trim() && item.description.trim(),
      ),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Package editor</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            {selectedPackage ? 'Edit package' : 'Create package'}
          </h2>
        </div>
        {selectedPackage ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            New package
          </button> 
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormField
          label="Title"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
        />

        <FormField
          label="Slug"
          value={form.slug}
          onChange={(event) => updateField('slug', event.target.value)}
        />

        <div className="md:col-span-2">
          <FormField
            label="Description"
            as="textarea"
            rows="4"
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
        </div>

        <FormField
          label="Price"
          value={form.price}
          onChange={(event) => updateField('price', event.target.value)}
        />
        
        <FormField
          label="Duration"
          type="number"
          value={form.duration}
          onChange={(event) => updateField('duration', event.target.value)}
        />

        <FormField
          label="Starting Location"
          value={form.startingLocation}
          onChange={(event) => updateField('startingLocation', event.target.value)}
        />

        <FormField
          label="Destination"
          value={form.destination}
          onChange={(event) => updateField('destination', event.target.value)}
        />

        <div className="md:col-span-2">
          <FormField
            label="Cover Image URL"
            value={form.coverImage}
            onChange={(event) => updateField('coverImage', event.target.value)}
          />
        </div>

        <FormField
          label="Status"
          as="select"
          value={form.status}
          onChange={(event) => updateField('status', event.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </FormField>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-white/65 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900">Itinerary</h3>
          <button
            type="button"
            onClick={() =>
              setForm((current) => ({
                ...current,
                itinerary: [
                  ...current.itinerary,
                  {
                    dayNumber: current.itinerary.length + 1,
                    title: '',
                    description: '',
                  },
                ],
              }))
            }
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Add day
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          {form.itinerary.map((item, index) => (
            <div key={`${item.dayNumber}-${index}`} className="grid gap-3 md:grid-cols-[120px_1fr_1fr]">
              <FormField
                label="Day"
                type="number"
                value={item.dayNumber}
                onChange={(event) => updateItinerary(index, 'dayNumber', event.target.value)}
              />
              <FormField
                label="Title"
                value={item.title}
                onChange={(event) => updateItinerary(index, 'title', event.target.value)}
              />
              <FormField
                label="Description"
                value={item.description}
                onChange={(event) => updateItinerary(index, 'description', event.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isSaving ? 'Saving package...' : selectedPackage ? 'Update package' : 'Create package'}
      </button>
    </form>
  )
}

export default PackageEditor
