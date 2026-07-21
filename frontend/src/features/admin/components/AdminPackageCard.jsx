import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatCurrency } from '../../../utils/format.js'
import { useEffect, useState } from 'react';

function AdminPackageCard({ item }) {

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/75 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur"
    >

      <div className="relative h-72 overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
            {item.category}
          </span>
          <span className="rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white">
            {item.duration} Days
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.destination}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Starting</p>
            <p className="mt-1 text-xl font-bold text-cyan-800">{formatCurrency(item.price)}</p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-slate-600">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.highlights?.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-900"
            >
              {highlight}
            </span>
          ))}
        </div>
        
        <Link
          to={`/admin/packages/${item.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900"
        >
          View
        </Link>
        <Link
          to={`/packages/${item.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900"
        >
          Edit
        </Link>
        <Link
          to={`/packages/${item.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900"
        >
          Delete
        </Link>
      </div>
    </motion.article>
  )
}

export default AdminPackageCard
