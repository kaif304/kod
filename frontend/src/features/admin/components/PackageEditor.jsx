import { useState } from 'react'
import FormField from '../../../components/common/FormField.jsx'

const createBlankPackage = () => ({
  title: '',
  description: '',
  price: 0,
  duration: 4,
  startingLocation: '',
  destination: '',
  coverImage: '',
  category: 'Luxury',
  status: 'draft',
  tokenAmount: 5000,
  isFeatured: false,
  galleryImagesText: '',
  highlightsText: '',
  inclusionsText: '',
  exclusionsText: '',
  faqs: [{ question: '', answer: '' }],
  itinerary: [{ dayNumber: 1, title: '', description: '' }],
})

function toEditorState(packageItem) {
  if (!packageItem) {
    return createBlankPackage()
  }

  return {
    title: packageItem.title || '',
    description: packageItem.description || '',
    price: packageItem.price || 0,
    duration: packageItem.duration || 4,
    startingLocation: packageItem.startingLocation || '',
    destination: packageItem.destination || '',
    coverImage: packageItem.coverImage || '',
    category: packageItem.category || 'Luxury',
    status: packageItem.status || 'draft',
    tokenAmount: packageItem.tokenAmount || 5000,
    isFeatured: Boolean(packageItem.isFeatured),
    galleryImagesText: (packageItem.galleryImages || []).join('\n'),
    highlightsText: (packageItem.highlights || []).join('\n'),
    inclusionsText: (packageItem.inclusions || []).join('\n'),
    exclusionsText: (packageItem.exclusions || []).join('\n'),
    faqs: packageItem.faqs?.length ? packageItem.faqs : [{ question: '', answer: '' }],
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

  const updateFaq = (index, field, value) => {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const updateItinerary = (index, field, value) => {
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const serializeLines = (value) =>
    value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      duration: Number(form.duration),
      startingLocation: form.startingLocation,
      destination: form.destination,
      coverImage: form.coverImage,
      category: form.category,
      status: form.status,
      tokenAmount: Number(form.tokenAmount),
      isFeatured: Boolean(form.isFeatured),
      galleryImages: serializeLines(form.galleryImagesText),
      highlights: serializeLines(form.highlightsText),
      inclusions: serializeLines(form.inclusionsText),
      exclusions: serializeLines(form.exclusionsText),
      faqs: form.faqs.filter((item) => item.question && item.answer),
      itinerary: form.itinerary.filter(
        (item) => item.dayNumber && item.title && item.description,
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
          label="Category"
          value={form.category}
          onChange={(event) => updateField('category', event.target.value)}
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
          type="number"
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
        <FormField
          label="Token Amount"
          type="number"
          value={form.tokenAmount}
          onChange={(event) => updateField('tokenAmount', event.target.value)}
        />
      </div>

      <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(event) => updateField('isFeatured', event.target.checked)}
        />
        Mark as featured
      </label>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormField
          label="Gallery Image URLs"
          as="textarea"
          rows="5"
          value={form.galleryImagesText}
          onChange={(event) => updateField('galleryImagesText', event.target.value)}
          placeholder="One image URL per line"
        />
        <FormField
          label="Highlights"
          as="textarea"
          rows="5"
          value={form.highlightsText}
          onChange={(event) => updateField('highlightsText', event.target.value)}
          placeholder="One highlight per line"
        />
        <FormField
          label="Inclusions"
          as="textarea"
          rows="5"
          value={form.inclusionsText}
          onChange={(event) => updateField('inclusionsText', event.target.value)}
          placeholder="One inclusion per line"
        />
        <FormField
          label="Exclusions"
          as="textarea"
          rows="5"
          value={form.exclusionsText}
          onChange={(event) => updateField('exclusionsText', event.target.value)}
          placeholder="One exclusion per line"
        />
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-white/65 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900">FAQs</h3>
          <button
            type="button"
            onClick={() =>
              setForm((current) => ({
                ...current,
                faqs: [...current.faqs, { question: '', answer: '' }],
              }))
            }
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Add FAQ
          </button>
        </div>
        <div className="mt-4 grid gap-4">
          {form.faqs.map((faq, index) => (
            <div key={`${faq.question}-${index}`} className="grid gap-3 md:grid-cols-2">
              <FormField
                label={`Question ${index + 1}`}
                value={faq.question}
                onChange={(event) => updateFaq(index, 'question', event.target.value)}
              />
              <FormField
                label={`Answer ${index + 1}`}
                value={faq.answer}
                onChange={(event) => updateFaq(index, 'answer', event.target.value)}
              />
            </div>
          ))}
        </div>
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
