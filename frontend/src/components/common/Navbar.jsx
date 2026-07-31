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
      <div className="section-shell  pt-2 sm:pt-4">
        <div className="glass-panel rounded-3xl px-2 py-2 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                <img src={Logo} alt="KOD logo" className='h-6 w-8 sm:h-8 sm:w-12' />
              </div>
              <div className="hidden sm:flex">
                <p className="text-xs sm:text-md font-bold text-slate-900">{siteConfig.companyName}</p>
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
                className="rounded-3xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Call Manager
              </a>
              <Link
                to="/packages"
                className="rounded-3xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Explore Tours
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="md:hidden rounded-3xl border border-slate-200 px-2 py-1 cursor-pointer text-lg font-extrabold text-slate-700"
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
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 items-center justify-center text-center">
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
                  </div>
                  <a
                    href={`tel:${siteConfig.managerPhoneRaw}`}
                    className="rounded-3xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
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
