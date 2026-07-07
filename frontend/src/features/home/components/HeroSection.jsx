import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './css/HeroSection.css'

function HeroSection() {
  return (
    <section className="section-shell pt-28 sm:pt-32">
      <div className="hero-shell relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-18">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        <div className="hero-panorama" />

        <div className="relative z-10 grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-100/80">
              Premium Travel Lead Platform
            </p>
            <h1 className="font-display text-6xl leading-none text-white sm:text-7xl">
              Crafted journeys for travelers who prefer a human touch.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Kings of Destination helps travel brands showcase packages beautifully, collect
              serious inquiries, and convert them through real managers instead of fragile
              automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/packages"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-50"
              >
                Explore Packages
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur"
              >
                Chat With Manager
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-panel relative rounded-[2rem] border-white/10 bg-white/12 p-5 text-white"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/65">Packages</p>
                <p className="mt-3 text-4xl font-bold">120+</p>
                <p className="mt-2 text-sm text-white/70">Customizable travel journeys</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/65">Lead Flow</p>
                <p className="mt-3 text-4xl font-bold">Manual</p>
                <p className="mt-2 text-sm text-white/70">Designed for higher-conversion follow-up</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] bg-slate-950/35 p-5">
              <p className="text-sm font-semibold text-white">What makes this different</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/75">
                <li>Showcase destination packages with premium visuals</li>
                <li>Capture inquiry, callback, and WhatsApp intent cleanly</li>
                <li>Optionally record token payments without full OTA complexity</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
