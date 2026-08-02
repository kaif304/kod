import { motion } from 'framer-motion'

function PageHero({ eyebrow, title, description }) {
  return (
    <section className="section-shell pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="glass-panel overflow-hidden border-rounded px-6 md:px-10 py-6 sm:py-8 md:py-14"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl md:text-5xl font-display font-bold leading-none text-slate-900">
          {title}
        </h1>
        <p className="mt-2 sm:mt-5 max-w-xl text-xs sm:text-lg leading-5 sm:leading-7 text-slate-600">
          {description}
        </p>
      </motion.div>
    </section>
  )
}

export default PageHero
