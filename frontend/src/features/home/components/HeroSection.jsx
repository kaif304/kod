import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './css/HeroSection.css'

function HeroSection() {
  const buttonStyle = "rounded-xl px-2 sm:px-4  py-2 sm:py-3 text-xs sm:text-sm flex items-center"

  return (
    <section className="section-shell pt-20 sm:pt-32">
      <div className="hero-shell relative overflow-hidden border-rounded px-4 py-4 sm:px-6 sm:py-6 lg:px-14 lg:py-14">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        <div className="hero-panorama" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-[0.5rem] sm:text-xs font-semibold uppercase tracking-[0.4em] text-cyan-100/80">
              Premium Travel Lead Platform
            </p>
            <h1 className="mt-3 font-display text-2xl sm:text-5xl md:text-6xl lg:text-7xl leading-none text-white">
              Crafted journeys for travelers who prefer a human touch.
            </h1>
            <p className="mt-3 text-xs sm:text-lg max-w-2xl leading-tight sm:leading-7 text-white/80">
              Kings of Destination helps travel brands showcase packages beautifully, collect
              serious inquiries, and convert them through real managers instead of fragile
              automation.
            </p>
            <div className="mt-6 sm:mt-8 flex sm:flex-wrap gap-3">
              <Link
                to="/packages"
                className={`${buttonStyle} bg-white font-bold text-slate-950 transition hover:bg-cyan-50`}
              >
                Explore Packages
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className={`${buttonStyle} border border-white/25 bg-white/10 font-semibold text-white backdrop-blur`}
              >
                Chat With Us
              </a>
            </div>
          </motion.div>

          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
