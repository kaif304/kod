function PackageInclusionsExclusions({
  inclusions,
  exclusions,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-panel border-rounded p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Inclusions
        </h2>

        <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
          {inclusions?.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="glass-panel border-rounded p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Exclusions
        </h2>

        <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
          {exclusions?.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PackageInclusionsExclusions;