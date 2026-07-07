function FormField({
  label,
  as = 'input',
  className = '',
  ...props
}) {
  const Component = as

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <Component
        className={`w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15 ${className}`}
        {...props}
      />
    </label>
  )
}

export default FormField
