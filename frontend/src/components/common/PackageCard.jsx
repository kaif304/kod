import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatCurrency } from '../../utils/format.js'

function PackageCard({ item }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden border-rounded border border-white/60 bg-white/75 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur"
    >

      <div className="relative h-64 overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="border-rounded bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
            {item.category}
          </span>
          <span className="border-rounded bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white">
            {item.duration} Days
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 p-4">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.destination}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Starting</p>
            <p className="text-lg font-bold text-cyan-800">{formatCurrency(item.price)}</p>
          </div>
        </div>

        <p className="flex-1 line-clamp-3 text-sm leading-5 text-slate-600">{item.description}</p>

        {/* <div className="flex flex-wrap gap-2">
          {item.highlights?.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded-3xl bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-900"
            >
              {highlight}
            </span>
          ))}
        </div> */}
        
        <Link
          to={`/packages/${item.slug}`}
          className="mt-2 border-rounded px-4 sm:px-5 py-3 text-xs sm:text-sm text-center bg-slate-950 font-semibold text-white transition hover:bg-cyan-900"
        >
          Explore Package
        </Link>
      </div>
    </motion.article>
  )
}

export default PackageCard
