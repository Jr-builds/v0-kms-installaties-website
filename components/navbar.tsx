'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SiteLogo from '@/components/site-logo'

const dienstenItems = [
  { label: 'Elektra', href: '/elektra' },
  { label: 'Airconditioning', href: '/airconditioning' },
  { label: 'Ventilatie', href: '/ventilatie' },
  { label: 'Technisch Vastgoedbeheer', href: '/technisch-vastgoedbeheer' },
  { label: "Camera's & Systemen", href: '/cameras-systemen' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Diensten', href: '#', dropdown: true },
  { label: 'Projecten', href: '/projecten' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dienstenOpen, setDienstenOpen] = useState(false)

  const isDiensten =
    ['/elektra', '/airconditioning', '/ventilatie', '/technisch-vastgoedbeheer', '/cameras-systemen'].includes(pathname)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <SiteLogo size={48} priority />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-kms-navy">
                KMS Installaties
              </span>
              <span className="text-xs font-semibold tracking-widest text-kms-yellow">
                ELEKTRA &amp; AIRCONDITIONING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDienstenOpen(true)}
                  onMouseLeave={() => setDienstenOpen(false)}
                >
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                      isDiensten
                        ? 'text-kms-navy font-semibold'
                        : 'text-gray-700 hover:text-kms-navy'
                    }`}
                  >
                    Diensten
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dienstenOpen && (
                    <div className="absolute top-full left-0 w-60 bg-white shadow-lg rounded-lg border border-gray-100 py-2 z-50">
                      {dienstenItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2.5 text-sm transition-colors hover:bg-kms-light ${
                            pathname === item.href
                              ? 'text-kms-navy font-semibold bg-blue-50'
                              : 'text-gray-700 hover:text-kms-navy'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.href
                      ? 'text-kms-navy font-semibold'
                      : 'text-gray-700 hover:text-kms-navy'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/offerte"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-kms-yellow transition-opacity hover:opacity-90"
            >
              Offerte aanvragen
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu openen"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-kms-navy flex items-center justify-between"
                    onClick={() => setDienstenOpen(!dienstenOpen)}
                  >
                    Diensten
                    <svg className={`w-4 h-4 transition-transform ${dienstenOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dienstenOpen && (
                    <div className="pl-4">
                      {dienstenItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-kms-navy"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === link.href
                      ? 'text-kms-navy font-semibold bg-blue-50'
                      : 'text-gray-700 hover:text-kms-navy'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/offerte"
              className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white text-center bg-kms-yellow"
              onClick={() => setMobileOpen(false)}
            >
              Offerte aanvragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
