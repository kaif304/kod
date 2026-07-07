import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-800/70">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-none text-slate-900 sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  )
}

export default SectionHeading
