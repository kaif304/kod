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











// import { useEffect, useMemo, useState } from 'react'
// import { useParams } from 'react-router-dom'

// import Loader from '../../../components/common/Loader.jsx'
// import StatusBadge from '../../../components/common/StatusBadge.jsx'
// import FormField from '../../../components/common/FormField.jsx'
// import EmptyState from '../../../components/common/EmptyState.jsx'

// import PackageHero from "../components/PackageHero.jsx";
// import PackageGallery from "../components/PackageGallery.jsx";
// import PackageOverview from "../components/PackageOverview.jsx";
// import PackageItinerary from "../components/PackageItinerary.jsx";
// import PackageInclusionsExclusions from "../components/PackageInclusionsExclusions.jsx";
// import PackageFaqs from "../components/PackageFaqs.jsx";
// import PackageBookingSidebar from "../components/PackageBookingSidebar.jsx";

// import { fallbackPackages, siteConfig } from '../../../content/site.js'
// import { formatCurrency } from '../../../utils/format.js'
// import { createLead } from '../../leads/services.js'
// import { fetchPackageBySlug } from '../services.js'

// const initialLeadForm = {
//   customerName: '',
//   email: '',
//   phone: '',
//   travelers: 2,
//   message: '',
// }

// function PackageDetailsPage() {
//   const { slug } = useParams()
//   const [packageItem, setPackageItem] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [errorMessage, setErrorMessage] = useState('')
//   const [leadForm, setLeadForm] = useState(initialLeadForm)
//   const [formMessage, setFormMessage] = useState('')
//   const [submitState, setSubmitState] = useState('')
  
//   useEffect(() => {
//     let isMounted = true

//     async function loadPackage() {
//       setIsLoading(true)
//       setErrorMessage('')

//       try {
//         const result = await fetchPackageBySlug(slug)
//         if (isMounted) {
//           setPackageItem(result)
//         }
//       } catch {
//         const fallback = fallbackPackages.find((item) => item.slug === slug)
//         if (isMounted) {
//           if (fallback) {
//             setPackageItem(fallback)
//             setErrorMessage(
//               'Live package data is unavailable right now. Displaying a fallback preview.',
//             )
//           } else {
//             setPackageItem(null)
//           }
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false)
//         }
//       }
//     }

//     loadPackage()

//     return () => {
//       isMounted = false
//     }
//   }, [slug])

//   const gallery = useMemo(() => {
//     if (!packageItem) {
//       return []
//     }

//     return packageItem.galleryImages?.length
//       ? packageItem.galleryImages
//       : [packageItem.coverImage]
//   }, [packageItem])

//   const handleLeadChange = (field, value) => {
//     setLeadForm((current) => ({ ...current, [field]: value }))
//   }

//   const handleInquirySubmit = async (contactMode) => {
//     if (!packageItem) return;

//     setSubmitState(contactMode);
//     setFormMessage("");

//     try {
//       await createLead({
//         packageId: packageItem.id,
//         customerName: leadForm.customerName.trim(),
//         email: leadForm.email.trim(),
//         phone: leadForm.phone.trim(),
//         travelers: Number(leadForm.travelers),
//         message: leadForm.message.trim(),
//         contactMode,
//         source: "package_page",
//       });

//       setFormMessage(
//         contactMode === "call_request"
//           ? "Your callback request has been received. Our destination manager will call you shortly."
//           : "Your inquiry has been submitted successfully. Our destination manager will contact you shortly."
//       );

//       setLeadForm(initialLeadForm);
//     } catch (error) {
//       setFormMessage(
//         error.response?.data?.message ||
//           "Unable to submit your request. Please try again."
//       );
//     } finally {
//       setSubmitState("");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="section-shell flex min-h-[70vh] items-center justify-center pt-32">
//         <Loader label="Loading package details" />
//       </div>
//     )
//   }

//   if (!packageItem) {
//     return (
//       <div className="section-shell pt-32">
//         <EmptyState
//           title="Package not found"
//           description="The package you requested may have been removed or is not available yet."
//         />
//       </div>
//     )
//   }

//   return (
//     <section className="section-shell pt-28 sm:pt-32">
//       {errorMessage ? <p className="mb-4 text-sm text-amber-700">{errorMessage}</p> : null}

//       <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//         <div className="space-y-6">

//           <PackageHero packageItem={packageItem} />

//           <PackageGallery gallery={gallery} title={packageItem.title} />

//           <PackageOverview packageItem={packageItem} />

//           <PackageItinerary itinerary={packageItem.itinerary} />

//           <PackageInclusionsExclusions
//             inclusions={packageItem.inclusions}
//             exclusions={packageItem.exclusions}
//           /> 

//           <PackageFaqs
//             faqs={
//               packageItem.faqs?.length
//                 ? packageItem.faqs
//                 : siteConfig.faqs
//             }
//           />

//         </div>
        
//         <PackageBookingSidebar
//           packageItem={packageItem}
//           siteConfig={siteConfig}
//           leadForm={leadForm}
//           handleLeadChange={handleLeadChange}
//           handleInquirySubmit={handleInquirySubmit}
//           submitState={submitState}
//           formMessage={formMessage}
//         />

//       </div>
//     </section>
//   )
// }

// export default PackageDetailsPage
