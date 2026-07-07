import { Link } from 'react-router-dom'
import { siteConfig } from '../../content/site.js'

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 pb-8 pt-10">
      <div className="section-shell grid gap-8 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
            {siteConfig.shortName}
          </p>
          <h3 className="mt-3 font-display text-4xl text-slate-900">{siteConfig.companyName}</h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">{siteConfig.tagLine}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Explore
          </h4>
          <div className="flex gap-3 mt-4 text-sm text-slate-700">
            <Link to="/">Home</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Reach Us
          </h4>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <p>{siteConfig.address}</p>
            <a href={`tel:${siteConfig.managerPhoneRaw}`}>{siteConfig.managerPhone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
