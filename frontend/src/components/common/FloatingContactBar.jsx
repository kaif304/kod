import { siteConfig } from '../../content/site.js'

function FloatingContactBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <div className="glass-panel flex items-center justify-between border-rounded px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Talk to KOD</p>
          <p className="text-sm font-semibold text-slate-900">Manager available</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${siteConfig.managerPhoneRaw}`}
            className="border-rounded bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Call
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noreferrer"
            className="border-rounded bg-cyan-800 px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default FloatingContactBar
