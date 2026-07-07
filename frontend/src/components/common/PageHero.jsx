import { motion } from 'framer-motion'

function PageHero({ eyebrow, title, description }) {
  return (
    <section className="section-shell pt-28 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="glass-panel overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-5xl leading-none text-slate-900 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      </motion.div>
    </section>
  )
}

export default PageHero
