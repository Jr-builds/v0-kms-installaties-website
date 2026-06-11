'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SiteLogo from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import AvailabilityPill from '@/components/availability-pill'
import { phoneDisplay, phoneTelHref } from '@/lib/business'

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

const servicePaths = dienstenItems.map((item) => item.href)

export default function Navbar() {
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopDienstenOpen, setDesktopDienstenOpen] = useState(false)
  const [mobileDienstenOpen, setMobileDienstenOpen] = useState(false)

  const isDiensten = servicePaths.includes(pathname)

  useEffect(() => {
    setMobileOpen(false)
    setDesktopDienstenOpen(false)
    setMobileDienstenOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return

    const menu = mobileMenuRef.current
    if (!menu) return

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <SiteLogo size={56} priority />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-kms-navy">KMS Installaties</span>
              <span className="text-xs font-semibold tracking-widest text-kms-yellow-dark">
                ELEKTRA &amp; AIRCONDITIONING
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Hoofdnavigatie">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDienstenOpen(true)}
                  onMouseLeave={() => setDesktopDienstenOpen(false)}
                >
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                      isDiensten
                        ? 'text-kms-navy font-semibold'
                        : 'text-gray-700 hover:text-kms-navy'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={desktopDienstenOpen}
                    aria-controls="desktop-diensten-menu"
                    onClick={() => setDesktopDienstenOpen((open) => !open)}
                  >
                    Diensten
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {desktopDienstenOpen && (
                    <div className="absolute top-full left-0 z-50 w-60 pt-2">
                      <div
                        id="desktop-diensten-menu"
                        role="menu"
                        className="rounded-lg border border-gray-100 bg-white py-2 shadow-lg"
                      >
                        {dienstenItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-sm transition-colors hover:bg-kms-light ${
                              pathname === item.href
                                ? 'bg-blue-50 font-semibold text-kms-navy'
                                : 'text-gray-700 hover:text-kms-navy'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.href
                      ? 'font-semibold text-kms-navy'
                      : 'text-gray-700 hover:text-kms-navy'
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <AvailabilityPill size="sm" />
            <Button render={<Link href="/offerte" />} nativeButton={false} variant="primary" size="sm">
              Offerte aanvragen
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-gray-700"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileMenuRef}
          className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4"
        >
          <a
            href={phoneTelHref}
            className="mt-3 flex items-center gap-3 rounded-xl bg-kms-green px-4 py-3.5 text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold leading-tight">{phoneDisplay}</div>
              <div className="text-xs text-white/90">Bel direct, ook voor spoed</div>
            </div>
          </a>

          <AvailabilityPill size="sm" className="mt-3" />

          <nav className="mt-3 flex flex-col gap-1" aria-label="Mobiele navigatie">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:text-kms-navy"
                    onClick={() => setMobileDienstenOpen((open) => !open)}
                    aria-haspopup="true"
                    aria-expanded={mobileDienstenOpen}
                    aria-controls="mobile-diensten-menu"
                  >
                    Diensten
                    <svg
                      className={`h-4 w-4 motion-safe:transition-transform${mobileDienstenOpen ? ' rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileDienstenOpen && (
                    <div id="mobile-diensten-menu" className="pl-4">
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
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-blue-50 font-semibold text-kms-navy'
                      : 'text-gray-700 hover:text-kms-navy'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Button
              render={<Link href="/offerte" onClick={() => setMobileOpen(false)} />}
              nativeButton={false}
              variant="primary"
              size="sm"
              className="mt-2 w-full"
            >
              Offerte aanvragen
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
