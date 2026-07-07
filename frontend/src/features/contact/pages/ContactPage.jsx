import { useState } from 'react'
import FormField from '../../../components/common/FormField.jsx'
import PageHero from '../../../components/common/PageHero.jsx'
import { siteConfig } from '../../../content/site.js'
import { createLead } from '../../leads/services.js'

const initialForm = {
  customerName: '',
  phone: '',
  email: '',
  travelers: 1,
  message: '',
}

function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [submitLabel, setSubmitLabel] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (contactMode) => {
    setSubmitLabel('Submitting...')

    try {
      await createLead({
        ...form,
        contactMode,
        source: 'contact_page',
      })
      setForm(initialForm)
      setSubmitLabel('Thanks. Our team will contact you shortly.')
    } catch (error) {
      setSubmitLabel(error.response?.data?.message || 'Unable to submit right now.')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let your team stay reachable through whichever channel converts best."
        description="Use this page for direct inquiries, callback requests, maps, and premium trust-building contact details."
      />

      <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold text-slate-900">Company details</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>{siteConfig.address}</p>
              <a href={`tel:${siteConfig.managerPhoneRaw}`}>{siteConfig.managerPhone}</a>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <div className="flex gap-3 pt-2">
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-cyan-800 px-5 py-3 text-sm font-semibold text-white"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.managerPhoneRaw}`}
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200">
            <iframe
              title="KOD office map"
              src="https://www.google.com/maps?q=Andheri%20East%20Mumbai&z=13&output=embed"
              className="h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-3xl font-semibold text-slate-900">Send an inquiry</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Capture general inquiries here and let the admin team review them inside the dashboard.
          </p>
          <div className="mt-6 grid gap-4">
            <FormField
              label="Full Name"
              value={form.customerName}
              onChange={(event) => updateField('customerName', event.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Phone"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
              />
              <FormField
                label="Email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </div>
            <FormField
              label="Travelers"
              type="number"
              min="1"
              value={form.travelers}
              onChange={(event) => updateField('travelers', event.target.value)}
            />
            <FormField
              label="Message"
              as="textarea"
              rows="5"
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleSubmit('inquiry')}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
            >
              Send Inquiry
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('call_request')}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
            >
              Request Callback
            </button>
          </div>

          {submitLabel ? <p className="mt-4 text-sm text-cyan-900">{submitLabel}</p> : null}
        </div>
      </section>
    </>
  )
}

export default ContactPage
