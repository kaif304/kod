import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { fallbackPackages, siteConfig } from '../../../content/site.js'
import { fetchPackages } from '../../packages/services.js'

import Loader from '../../../components/common/Loader.jsx'
import PackageCard from '../../../components/common/PackageCard.jsx'
import SectionHeading from '../../../components/common/SectionHeading.jsx'
import HeroSection from '../components/HeroSection.jsx'

function HomePage() {
  const [featuredPackages, setFeaturedPackages] = useState(fallbackPackages.slice(0, 3))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadFeaturedPackages() {
      try {
        const result = await fetchPackages({ featured: true, limit: 3 })
        if (isMounted && result.items?.length) {
          setFeaturedPackages(result.items)
        }
      } catch {
        // Keep the fallback cards for first-run and offline states.
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadFeaturedPackages()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <HeroSection />

      {/* <section className="section-shell mt-10 md:mt-20">
        <div className="grid gap-3 md:gap-6 md:grid-cols-3">
          {[
            ['Lead-first travel brand', 'Built for inquiry, callback, and manual conversion'],
            ['Admin visibility', 'Packages, leads, token payments, and analytics in one place'],
            ['Premium front-end tone', 'Quiet luxury visuals with responsive, smooth interactions'],
          ].map(([title, text]) => (
            <div key={title} className="glass-panel flex flex-col gap-1 rounded-3xl p-4 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
                Why it works
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{title}</h3>
              <p className="text-xs sm:text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section> */}

      <section className="section-shell mt-10 sm:mt-16">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Packages"
            // title="Travel packages that invite conversation, not confusion."
            // description="Each package page is built to showcase itinerary depth, destination appeal, and strong lead capture options."
          />
          <Link
            to="/packages"
            className="hidden md:inline-flex border-rounded border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            View all packages
          </Link>
        </div>

        <div className="mt-6 sm:mt-10">
          {isLoading ? (
            <div className="py-16">
              <Loader label="Loading featured packages" />
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPackages.map((item) => (
                <PackageCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-shell mt-10 sm:mt-16">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Made for calm, premium destination discovery."
          // description="The homepage introduces strong travel intent with large-format visuals, subtle motion, and clear contact calls to action."
          align="center"
        />
        <div className="mt-10 grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative overflow-hidden border-rounded"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">Destination</p>
                <h3 className="mt-3 text-3xl font-semibold">{destination.name}</h3>
                <p className="mt-2 text-sm text-white/75">{destination.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* <section className="section-shell mt-24 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Human-led conversions with a polished digital front door."
          description="This platform intentionally supports manual travel operations while still feeling premium, scalable, and conversion-focused."
        />
        <div className="grid gap-4">
          {siteConfig.whyChooseUs.map((item) => (
            <div key={item.title} className="glass-panel rounded-3xl p-4 md:p-6">
              <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* <section className="section-shell mt-24">
        <SectionHeading
          eyebrow="Testimonials"
          title="Travelers remember responsiveness as much as destination quality."
          description="These sections help communicate confidence to leads before your managers even start the first conversation."
          align="center"
        />
        <div className="mt-10 grid gap-3 sm:gap-6 lg:grid-cols-3">
          {siteConfig.testimonials.map((testimonial) => (
            <div key={testimonial.name} className="glass-panel rounded-3xl p-4 md:p-6">
              <p className="text-sm leading-8 text-slate-600">“{testimonial.quote}”</p>
              <p className="mt-6 text-sm font-semibold text-slate-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section> */}

      <section className="section-shell mt-20">
        <div className="overflow-hidden border-rounded px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 bg-slate-950 text-white">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[0.5rem] sm:text-xs uppercase tracking-[0.35em] text-white/60">Ready to convert</p>
              <h2 className="mt-4 font-display text-2xl md:text-5xl leading-none">
                Launch a travel storefront that feels premium and sells with a human touch.
              </h2>
              <p className="mt-4 text-xs sm:text-sm max-w-2xl leading-4 text-white/70">
                Browse packages, request callbacks, or reserve with a token amount. The handoff to
                your operations team stays fully manual, deliberate, and controlled.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <Link
                to="/packages"
                className="border-rounded bg-white px-6 py-3 text-sm font-bold text-slate-950"
              >
                Browse Packages
              </Link>
              <Link
                to="/contact"
                className="border-rounded border border-white/20 px-6 py-3 text-sm font-semibold text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
