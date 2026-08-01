import { Link } from 'react-router-dom'
import { siteConfig } from '../../content/site.js'

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/70 py-10 sm:mt-16">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-6 sm:gap-10 text-center sm:text-left sm:grid-cols-[2fr_1fr_1fr]">
          {/* Company */}
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
              {siteConfig.shortName}
            </p>

            <h3 className="mt-2 sm:mt-4 font-display text-2xl text-slate-900 md:text-4xl">
              {siteConfig.companyName}
            </h3>

            <p className="mt-1 sm:mt-4 max-w-md text-xs leading-7 text-slate-600 sm:max-w-lg">
              {siteConfig.tagLine}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Explore
            </h4>

            <nav className="mt-3 sm:mt-4 flex flex-col gap-2 text-xs sm:text-sm text-slate-700">
              <Link
                className="transition-colors hover:text-cyan-600"
                to="/"
                >
                Home
              </Link>

              <Link
                className="transition-colors hover:text-cyan-600"
                to="/packages"
                >
                Packages
              </Link>

              <Link
                className="transition-colors hover:text-cyan-600"
                to="/about"
                >
                About
              </Link>

              <Link
                className="transition-colors hover:text-cyan-600"
                to="/contact"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Reach Us
            </h4>

            <div className="mt-3 sm:mt-4 flex flex-col text-xs sm:text-sm leading-7 text-slate-700">
              <p>{siteConfig.address}</p>

              <a
                href={`tel:${siteConfig.managerPhoneRaw}`}
                className="transition-colors hover:text-cyan-600"
                >
                {siteConfig.managerPhone}
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-cyan-600"
                >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 border-t border-slate-200 pt-6 text-center text-xs sm:text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.companyName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

// <footer className="mt-10 sm:mt-16 border-t border-slate-200/70 pb-8 pt-8">
//   <div className="section-shell flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-6">
//     <div>
//       <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
//         {siteConfig.shortName}
//       </p>
//       <h3 className="mt-3 font-display sm:text-xl md:text-4xl text-slate-900">{siteConfig.companyName}</h3>
//       <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">{siteConfig.tagLine}</p>
//     </div>
//     <div>
//       <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
//         Explore
//       </h4>
//       <div className="flex gap-3 mt-4 text-sm text-slate-700">
//         <Link to="/">Home</Link>
//         <Link to="/packages">Packages</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//       </div>
//     </div>
//     <div>
//       <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
//         Reach Us
//       </h4>
//       <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
//         <p>{siteConfig.address}</p>
//         <a href={`tel:${siteConfig.managerPhoneRaw}`}>{siteConfig.managerPhone}</a>
//         <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
//       </div>
//     </div>
//   </div>
//   {/* <div className="section-shell grid gap-6 sm:grid-cols-[0.9fr_0.9fr_0.9fr] ">
//     <div>
//       <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
//         {siteConfig.shortName}
//       </p>
//       <h3 className="mt-3 font-display sm:text-2xl md:text-4xl text-slate-900">{siteConfig.companyName}</h3>
//       <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">{siteConfig.tagLine}</p>
//     </div>
//     <div>
//       <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
//         Explore
//       </h4>
//       <div className="flex gap-3 mt-4 text-sm text-slate-700">
//         <Link to="/">Home</Link>
//         <Link to="/packages">Packages</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//       </div>
//     </div>
//     <div>
//       <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
//         Reach Us
//       </h4>
//       <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
//         <p>{siteConfig.address}</p>
//         <a href={`tel:${siteConfig.managerPhoneRaw}`}>{siteConfig.managerPhone}</a>
//         <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
//       </div>
//     </div>
//   </div> */}
// </footer>