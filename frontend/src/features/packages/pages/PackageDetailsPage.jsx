import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import Loader from '../../../components/common/Loader.jsx'
import EmptyState from '../../../components/common/EmptyState.jsx'
import PackageBookingSidebar from "../components/PackageBookingSidebar.jsx";
import PackageDetails from '../../../components/package-details/PackageDetails.jsx'

import { fallbackPackages, siteConfig } from '../../../content/site.js'
import { createLead } from '../../leads/services.js'
import { fetchPackageBySlug } from '../services.js'

const initialLeadForm = {
  customerName: '',
  email: '',
  phone: '',
  travelers: 2,
  message: '',
}

function PackageDetailsPage() {
  const { slug } = useParams()
  const [leadForm, setLeadForm] = useState(initialLeadForm)
  const [formMessage, setFormMessage] = useState('')
  const [submitState, setSubmitState] = useState('')
  
  const {
    data: packageItem,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['package', slug],
    queryFn: () => fetchPackageBySlug(slug),
  })
  
  const fallbackPackage = fallbackPackages.find((item) => item.slug === slug) ?? null
  
  const displayedPackage = packageItem ?? fallbackPackage

  const faqs = displayedPackage?.faqs?.length
    ? displayedPackage.faqs
    : siteConfig.faqs

  const errorMessage = error && fallbackPackage
      ? 'Live package data is unavailable right now. Displaying a fallback preview.'
      : ''

  const handleLeadChange = (field, value) => {
    setLeadForm((current) => ({ ...current, [field]: value }))
  }

  const handleInquirySubmit = async (contactMode) => {
    if (!displayedPackage) return;

    setSubmitState(contactMode);
    setFormMessage("");

    try {
      await createLead({
        packageId: displayedPackage.id,
        customerName: leadForm.customerName.trim(),
        email: leadForm.email.trim(),
        phone: leadForm.phone.trim(),
        travelers: Number(leadForm.travelers),
        message: leadForm.message.trim(),
        contactMode,
        source: "package_page",
      });
      
      setFormMessage(
        contactMode === "call_request"
          ? "Your callback request has been received. Our destination manager will call you shortly."
          : "Your inquiry has been submitted successfully. Our destination manager will contact you shortly."
      );

      setLeadForm(initialLeadForm);
    } catch (error) {
      setFormMessage(
        error.response?.data?.message ||
          "Unable to submit your request. Please try again."
      );
    } finally {
      setSubmitState("");
    }
  };

  if (isLoading) {
    return (
      <div className="section-shell flex min-h-[70vh] items-center justify-center pt-32">
        <Loader label="Loading package details" />
      </div>
    )
  }

  if (!displayedPackage) {
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
    <section className="section-shell pt-28 sm:pt-32">
      {errorMessage ? <p className="mb-4 text-sm text-amber-700">{errorMessage}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        <PackageDetails 
          packageItem={displayedPackage}
          faqs={faqs}
        />
        
        <PackageBookingSidebar
          packageItem={packageItem}
          siteConfig={siteConfig}
          leadForm={leadForm}
          handleLeadChange={handleLeadChange}
          handleInquirySubmit={handleInquirySubmit}
          submitState={submitState}
          formMessage={formMessage}
        />

      </div>
    </section>
  )
}

export default PackageDetailsPage
