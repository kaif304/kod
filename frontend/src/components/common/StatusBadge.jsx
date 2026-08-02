const toneMap = {
  published: 'bg-emerald-100 text-emerald-800',
  draft: 'bg-amber-100 text-amber-800',
  archived: 'bg-slate-200 text-slate-700',
  new: 'bg-sky-100 text-sky-800',
  contacted: 'bg-violet-100 text-violet-800',
  quoted: 'bg-amber-100 text-amber-800',
  won: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-rose-100 text-rose-800',
  pending: 'bg-amber-100 text-amber-800',
  success: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-rose-100 text-rose-800',
  refunded: 'bg-slate-200 text-slate-700',
}

function StatusBadge({ value }) {
  const normalizedValue = String(value || '').toLowerCase()
  const tone = toneMap[normalizedValue] || 'bg-slate-100 text-slate-700'

  return (
    <span className={`inline-flex border-rounded px-3 py-1 text-xs font-semibold capitalize ${tone}`}>
      {normalizedValue || 'unknown'}
    </span>
  )
}

export default StatusBadge
