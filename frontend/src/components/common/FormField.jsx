function FormField({
  label,
  error,
  as = 'input',
  className = '',
  ...props
}) {
  const Component = as

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}

      <Component
        className={`w-full rounded-2xl border bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition
          ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
              : 'border-slate-200 focus:border-cyan-700 focus:ring-cyan-700/15'
          }
          ${className}`}
        {...props}
      />

      {error ? (
        <span className="text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  )
}

export default FormField