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
// import { createLead, createPaymentOrder, verifyPayment } from '../../leads/services.js'
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
//   const [paymentOrder, setPaymentOrder] = useState(null)
//   const [paymentReference, setPaymentReference] = useState('')
//   const [paymentConfirmation, setPaymentConfirmation] = useState('')

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
//     if (!packageItem) {
//       return
//     }

//     setSubmitState(contactMode)
//     setFormMessage('')
//     setPaymentConfirmation('')

//     try {
//       const lead = await createLead({
//         packageId: packageItem.id,
//         customerName: leadForm.customerName,
//         email: leadForm.email,
//         phone: leadForm.phone,
//         travelers: Number(leadForm.travelers),
//         message: leadForm.message,
//         contactMode,
//         source: 'package_page',
//       })

//       if (contactMode === 'book_now') {
//         const order = await createPaymentOrder({
//           leadId: lead.id,
//           amount: packageItem.tokenAmount,
//         })

//         setPaymentOrder(order)
//         setFormMessage('Lead created and token reservation reference generated.')
//       } else {
//         setPaymentOrder(null)
//         setFormMessage('Your inquiry is in. A destination manager will contact you shortly.')
//       }

//       setLeadForm(initialLeadForm)
//     } catch (error) {
//       setFormMessage(error.response?.data?.message || 'Something went wrong. Please try again.')
//     } finally {
//       setSubmitState('')
//     }
//   }

//   const handlePaymentConfirmation = async () => {
//     if (!paymentOrder || !paymentReference) {
//       return
//     }

//     setSubmitState('payment')
//     setPaymentConfirmation('')

//     try {
//       await verifyPayment({
//         paymentId: paymentOrder.id,
//         paymentStatus: 'success',
//         transactionId: paymentReference,
//       })
//       setPaymentConfirmation(
//         'Payment reference submitted successfully. Your manager will validate and confirm manually.',
//       )
//       setPaymentReference('')
//     } catch (error) {
//       setPaymentConfirmation(
//         error.response?.data?.message || 'Unable to update payment right now.',
//       )
//     } finally {
//       setSubmitState('')
//     }
//   }

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

//           {/* <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
//             <div className="flex flex-wrap items-center gap-3">
//               <StatusBadge value={packageItem.status} />
//               <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-900">
//                 {packageItem.category}
//               </span>
//             </div>
//             <h1 className="mt-5 font-display text-5xl leading-none text-slate-900 sm:text-6xl">
//               {packageItem.title}
//             </h1>
//             <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
//               {packageItem.description}
//             </p>

//             <div className="mt-8 grid gap-4 sm:grid-cols-3">
//               <div className="rounded-[1.5rem] bg-white/70 p-4">
//                 <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Duration</p>
//                 <p className="mt-2 text-2xl font-semibold text-slate-900">
//                   {packageItem.duration} Days
//                 </p>
//               </div>
//               <div className="rounded-[1.5rem] bg-white/70 p-4">
//                 <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Destination</p>
//                 <p className="mt-2 text-2xl font-semibold text-slate-900">{packageItem.destination}</p>
//               </div>
//               <div className="rounded-[1.5rem] bg-white/70 p-4">
//                 <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Starting From</p>
//                 <p className="mt-2 text-2xl font-semibold text-cyan-800">
//                   {formatCurrency(packageItem.price)}
//                 </p>
//               </div>
//           </div>
//             </div> */}
//           <PackageHero packageItem={packageItem} />

//           {/* <div className="grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
//             <img
//               src={gallery[0]}
//               alt={packageItem.title}
//               className="h-[400px] w-full rounded-[2rem] object-cover"
//             />
//             <div className="grid gap-4">
//               {gallery.slice(1, 3).map((image) => (
//                 <img
//                   key={image}
//                   src={image}
//                   alt={packageItem.title}
//                   className="h-[192px] w-full rounded-[1.5rem] object-cover"
//                 />
//               ))}
//             </div>
//           </div> */}
//           <PackageGallery gallery={gallery} title={packageItem.title} />

//           {/* <div className="grid gap-6 lg:grid-cols-2">
//             <div className="glass-panel rounded-[2rem] p-6">
//               <h2 className="text-2xl font-semibold text-slate-900">Highlights</h2>
//               <div className="mt-4 flex flex-wrap gap-3">
//                 {packageItem.highlights?.map((item) => (
//                   <span
//                     key={item}
//                     className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
//                   >
//                     {item}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="glass-panel rounded-[2rem] p-6">
//               <h2 className="text-2xl font-semibold text-slate-900">Package Snapshot</h2>
//               <dl className="mt-4 space-y-3 text-sm text-slate-600">
//                 <div className="flex justify-between gap-4">
//                   <dt>Starting location</dt>
//                   <dd className="font-semibold text-slate-900">{packageItem.startingLocation}</dd>
//                 </div>
//                 <div className="flex justify-between gap-4">
//                   <dt>Token amount</dt>
//                   <dd className="font-semibold text-slate-900">
//                     {formatCurrency(packageItem.tokenAmount)}
//                   </dd>
//                 </div>
//                 <div className="flex justify-between gap-4">
//                   <dt>Managed by</dt>
//                   <dd className="font-semibold text-slate-900">KOD destination desk</dd>
//                 </div>
//               </dl>
//             </div>
//           </div> */}
//           <PackageOverview packageItem={packageItem} />

//           {/* <div className="glass-panel rounded-[2rem] p-6">
//             <h2 className="text-2xl font-semibold text-slate-900">Day-wise Itinerary</h2>
//             <div className="mt-6 space-y-4">
//               {packageItem.itinerary?.map((item) => (
//                 <div key={`${item.dayNumber}-${item.title}`} className="rounded-[1.5rem] bg-white/70 p-5">
//                   <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-800/75">
//                     Day {item.dayNumber}
//                   </p>
//                   <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
//                   <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//           <PackageItinerary itinerary={packageItem.itinerary} />

//           {/* <div className="grid gap-6 lg:grid-cols-2">
//             <div className="glass-panel rounded-[2rem] p-6">
//               <h2 className="text-2xl font-semibold text-slate-900">Inclusions</h2>
//               <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
//                 {packageItem.inclusions?.map((item) => (
//                   <li key={item}>• {item}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="glass-panel rounded-[2rem] p-6">
//               <h2 className="text-2xl font-semibold text-slate-900">Exclusions</h2>
//               <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
//                 {packageItem.exclusions?.map((item) => (
//                   <li key={item}>• {item}</li>
//                 ))}
//               </ul>
//             </div>
//           </div> */}
//           <PackageInclusionsExclusions
//             inclusions={packageItem.inclusions}
//             exclusions={packageItem.exclusions}
//           />

//           {/* <div className="glass-panel rounded-[2rem] p-6">
//             <h2 className="text-2xl font-semibold text-slate-900">FAQs</h2>
//             <div className="mt-5 space-y-4">
//               {(packageItem.faqs?.length ? packageItem.faqs : siteConfig.faqs).map((faq) => (
//                 <div key={faq.question} className="rounded-[1.5rem] bg-white/70 p-5">
//                   <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
//                   <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//           <PackageFaqs
//             faqs={
//               packageItem.faqs?.length
//                 ? packageItem.faqs
//                 : siteConfig.faqs
//             }
//           />

//         </div>

//         {/* <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
//           <div className="glass-panel rounded-[2rem] p-6">
//             <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
//               Starting price
//             </p>
//             <p className="mt-4 text-4xl font-bold text-cyan-800">
//               {formatCurrency(packageItem.price)}
//             </p>
//             <p className="mt-3 text-sm leading-7 text-slate-600">
//               Final confirmation, hotel selection, and package customizations are handled manually
//               by the KOD operations team.
//             </p>
//             <div className="mt-6 grid gap-3 sm:grid-cols-2">
//               <a
//                 href={`tel:${siteConfig.managerPhoneRaw}`}
//                 className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white"
//               >
//                 Call Manager
//               </a>
//               <a
//                 href={`https://wa.me/${siteConfig.whatsappRaw}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="rounded-full bg-cyan-800 px-5 py-3 text-center text-sm font-semibold text-white"
//               >
//                 WhatsApp
//               </a>
//             </div>
//           </div>

//           <div className="glass-panel rounded-[2rem] p-6">
//             <h2 className="text-2xl font-semibold text-slate-900">Inquiry & Booking Desk</h2>
//             <p className="mt-3 text-sm leading-7 text-slate-600">
//               Share your details, request a callback, or reserve this package with a token amount.
//             </p>

//             <div className="mt-5 grid gap-4">
//               <FormField
//                 label="Full Name"
//                 placeholder="Your name"
//                 value={leadForm.customerName}
//                 onChange={(event) => handleLeadChange('customerName', event.target.value)}
//               />
//               <FormField
//                 label="Mobile Number"
//                 placeholder="9876543210"
//                 value={leadForm.phone}
//                 onChange={(event) => handleLeadChange('phone', event.target.value)}
//               />
//               <FormField
//                 label="Email"
//                 placeholder="Optional email"
//                 value={leadForm.email}
//                 onChange={(event) => handleLeadChange('email', event.target.value)}
//               />
//               <FormField
//                 label="Travelers"
//                 type="number"
//                 min="1"
//                 value={leadForm.travelers}
//                 onChange={(event) => handleLeadChange('travelers', event.target.value)}
//               />
//               <FormField
//                 label="Message"
//                 as="textarea"
//                 rows="4"
//                 placeholder="Tell us your dates, room preference, or any custom request."
//                 value={leadForm.message}
//                 onChange={(event) => handleLeadChange('message', event.target.value)}
//               />
//             </div>

//             <div className="mt-5 grid gap-3">
//               <button
//                 type="button"
//                 onClick={() => handleInquirySubmit('inquiry')}
//                 disabled={Boolean(submitState)}
//                 className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
//               >
//                 {submitState === 'inquiry' ? 'Sending inquiry...' : 'Send Inquiry'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleInquirySubmit('call_request')}
//                 disabled={Boolean(submitState)}
//                 className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 disabled:opacity-60"
//               >
//                 {submitState === 'call_request' ? 'Requesting callback...' : 'Request Callback'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleInquirySubmit('book_now')}
//                 disabled={Boolean(submitState)}
//                 className="rounded-full bg-cyan-800 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
//               >
//                 {submitState === 'book_now'
//                   ? 'Creating token order...'
//                   : `Reserve with ${formatCurrency(packageItem.tokenAmount)} token`}
//               </button>
//             </div>

//             {formMessage ? <p className="mt-4 text-sm text-cyan-900">{formMessage}</p> : null}

//             {paymentOrder ? (
//               <div className="mt-6 rounded-[1.5rem] bg-white/75 p-5">
//                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
//                   Token payment reference
//                 </p>
//                 <p className="mt-3 text-lg font-bold text-slate-900">{paymentOrder.transactionId}</p>
//                 <p className="mt-3 text-sm leading-7 text-slate-600">
//                   Share this order reference with the customer while collecting the token online.
//                   Once paid, store their bank or UPI transaction reference below.
//                 </p>
//                 <div className="mt-4 grid gap-3">
//                   <FormField
//                     label="Customer transaction reference"
//                     placeholder="UPI / bank reference"
//                     value={paymentReference}
//                     onChange={(event) => setPaymentReference(event.target.value)}
//                   />
//                   <button
//                     type="button"
//                     onClick={handlePaymentConfirmation}
//                     disabled={submitState === 'payment'}
//                     className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
//                   >
//                     {submitState === 'payment' ? 'Confirming...' : 'Confirm Token Submitted'}
//                   </button>
//                 </div>
//                 {paymentConfirmation ? (
//                   <p className="mt-4 text-sm text-cyan-900">{paymentConfirmation}</p>
//                 ) : null}
//               </div>
//             ) : null}
//           </div>
//         </aside> */}
//         <PackageBookingSidebar
//           packageItem={packageItem}
//           siteConfig={siteConfig}
//           leadForm={leadForm}
//           handleLeadChange={handleLeadChange}
//           handleInquirySubmit={handleInquirySubmit}
//           submitState={submitState}
//           formMessage={formMessage}
//           paymentOrder={paymentOrder}
//           paymentReference={paymentReference}
//           setPaymentReference={setPaymentReference}
//           handlePaymentConfirmation={handlePaymentConfirmation}
//           paymentConfirmation={paymentConfirmation}
//         />

//       </div>
//     </section>
//   )
// }

// export default PackageDetailsPage
