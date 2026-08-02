import StatusBadge from "../common/StatusBadge.jsx";
import { formatCurrency } from "../../utils/format.js";

function PackageHero({ packageItem }) {
  return (
    <div className="glass-panel border-rounded p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge value={packageItem.status} />

        <span className="border-rounded bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-900">
          {packageItem.category}
        </span>
      </div>

      <h1 className="mt-5 font-display text-5xl leading-none text-slate-900 sm:text-6xl">
        {packageItem.title}
      </h1>

      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
        {packageItem.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border-rounded bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Duration
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {packageItem.duration} Days
          </p>
        </div>

        <div className="border-rounded bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Destination
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {packageItem.destination}
          </p>
        </div>

        <div className="border-rounded bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Starting From
          </p>

          <p className="mt-2 text-2xl font-semibold text-cyan-800">
            {formatCurrency(packageItem.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PackageHero;