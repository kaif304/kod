import { formatCurrency } from "../../utils/format.js";

function PackageOverview({ packageItem }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Highlights
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {packageItem.highlights?.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Package Snapshot
        </h2>

        <dl className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between gap-4">
            <dt>Starting location</dt>
            <dd className="font-semibold text-slate-900">
              {packageItem.startingLocation}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt>Token amount</dt>
            <dd className="font-semibold text-slate-900">
              {formatCurrency(packageItem.tokenAmount)}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt>Managed by</dt>
            <dd className="font-semibold text-slate-900">
              KOD destination desk
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default PackageOverview;