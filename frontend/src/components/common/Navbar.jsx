import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { siteConfig } from '../../content/site.js'
import Logo from "../../assets/Logo.png";

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-4">
        <div className="glass-panel rounded-full px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                <img src={Logo} alt="KOD logo" className='h-8 w-12' />
              </div>
              <div>
                {/* <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Travel Service</p> */}
                <p className="text-md font-bold text-slate-900">{siteConfig.companyName}</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition ${isActive ? 'text-cyan-900' : 'text-slate-600 hover:text-slate-950'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href={`tel:${siteConfig.managerPhoneRaw}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Call Manager
              </a>
              <Link
                to="/packages"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Explore Tours
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 md:hidden"
            >
              Menu
            </button>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-slate-700"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <a
                    href={`tel:${siteConfig.managerPhoneRaw}`}
                    className="rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    Call Manager
                  </a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Navbar
