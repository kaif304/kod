function PackageItinerary({ itinerary }) {
  return (
    <div className="glass-panel border-rounded p-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Day-wise Itinerary
      </h2>

      <div className="mt-6 space-y-4">
        {itinerary?.map((item) => (
          <div
            key={`${item.dayNumber}-${item.title}`}
            className="border-rounded bg-white/70 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-800/75">
              Day {item.dayNumber}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageItinerary;