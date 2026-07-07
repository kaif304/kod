function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-sm text-slate-500">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
      <span>{label}</span>
    </div>
  )
}

export default Loader
