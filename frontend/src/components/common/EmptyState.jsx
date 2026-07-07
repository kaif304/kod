function EmptyState({ title, description }) {
  return (
    <div className="glass-panel rounded-[1.75rem] px-6 py-12 text-center">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
    </div>
  )
}

export default EmptyState
