import React, { useState } from 'react';
import { ChevronDown, Globe, Menu, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { LANGUAGES } from '../../i18n/languages';
import type { LanguageType } from '../../types/index';
import SiteBrand from './SiteBrand';

const EMERGENCY_HOTLINES = [
  { label: 'Emergency', number: '911' },
  { label: 'NDRRMC', number: '(02) 8911-5061' },
  { label: 'PNP', number: '117' },
  { label: 'BFP', number: '(02) 8426-0219' },
  { label: 'Red Cross', number: '143' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { i18n } = useTranslation('common');

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ── 1. Ultra-thin emergency strip ── */}
      <div className="bg-[#b71c1c] text-white">
        <div className="container mx-auto flex items-center gap-0 overflow-x-auto px-4 py-0.5 text-[10px] scrollbar-none">
          {/* Label */}
          <span className="mr-3 flex shrink-0 items-center gap-1 font-bold uppercase tracking-widest text-red-200">
            <Phone className="h-2.5 w-2.5 animate-pulse" aria-hidden="true" />
            Hotlines
          </span>
          {/* Hotline pills */}
          <div className="flex items-center divide-x divide-red-600">
            {EMERGENCY_HOTLINES.map(h => (
              <a
                key={h.label}
                href={`tel:${h.number.replace(/\D/g, '')}`}
                className="px-2.5 py-0.5 text-[10px] text-white/80 transition-colors hover:text-white"
                title={`Call ${h.label}`}
              >
                <span className="font-semibold text-white">{h.label}</span>
                <span className="ml-1 text-red-200">{h.number}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Combined branding + nav bar ── */}
      <div className="border-b-2 border-[#f2c91d] bg-primary-700">
        <div className="container mx-auto flex min-h-20 items-center justify-between gap-4 px-4 py-3">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <SiteBrand />
          </Link>

          {/* Desktop nav — centred */}
          <nav
            className="hidden flex-1 items-center justify-center gap-6 lg:flex"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="text-sm font-medium text-white transition-colors hover:text-[#f2c91d]"
            >
              Home
            </Link>
            {mainNavigation.map(item => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.href}
                  className="flex items-center gap-0.5 text-sm font-medium text-white transition-colors hover:text-[#f2c91d]"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-lg border border-gray-100 bg-white py-1.5 opacity-0 shadow-xl ring-1 ring-black/5 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#location-demographics"
              className="text-sm font-medium text-white transition-colors hover:text-[#f2c91d]"
            >
              Map &amp; Demographics
            </a>
          </nav>

          {/* Right side: branding links + language */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {/* Divider */}
            <div className="h-4 w-px bg-white/20" />
            <a
              href="https://bettergov.ph/join-us"
              className="rounded-full bg-[#f2c91d] px-3 py-1 text-xs font-bold text-primary-900 transition-opacity hover:opacity-90"
              rel="noreferrer"
              target="_blank"
            >
              Join BetterGov
            </a>
            <a
              href="https://www.gov.ph"
              className="text-xs font-medium text-white/80 transition-colors hover:text-white"
              rel="noreferrer"
              target="_blank"
            >
              GOV.PH
            </a>
            {/* Divider */}
            <div className="h-4 w-px bg-white/20" />
            {/* Language */}
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-white/80" aria-hidden="true" />
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="border-0 bg-transparent text-xs text-white focus:outline-none focus:ring-0"
                aria-label="Language"
              >
                {Object.entries(LANGUAGES).map(([code, language]) => (
                  <option key={code} value={code} className="text-gray-800">
                    {language.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(open => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── 3. Mobile slide-down menu ── */}
      {isOpen && (
        <nav
          className="border-b border-gray-200 bg-white px-4 pb-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            to="/"
            onClick={closeMenu}
            className="block border-b border-gray-100 py-2.5 text-sm font-medium text-gray-800"
          >
            Home
          </Link>
          {mainNavigation.map(item => (
            <div key={item.label} className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-800"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === item.label ? null : item.label
                      )
                    }
                    className="inline-flex h-9 w-9 items-center justify-center text-gray-500"
                    aria-label={`Toggle ${item.label} links`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>
              {item.children && activeMenu === item.label && (
                <div className="mb-2 border-l-2 border-[#f2c91d] bg-gray-50 py-1">
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      to={child.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm text-gray-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="#location-demographics"
            onClick={closeMenu}
            className="block border-b border-gray-100 py-2.5 text-sm font-medium text-gray-800"
          >
            Map &amp; Demographics
          </a>

          {/* Mobile: branding links + language */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://bettergov.ph/join-us"
              rel="noreferrer"
              target="_blank"
              className="rounded-full bg-[#f2c91d] px-3 py-1 text-xs font-bold text-primary-900"
            >
              Join BetterGov
            </a>
            <a
              href="https://www.gov.ph"
              rel="noreferrer"
              target="_blank"
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              GOV.PH
            </a>
            <div className="ml-auto flex items-center gap-1.5 text-gray-500">
              <Globe className="h-3.5 w-3.5" />
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="rounded border border-gray-200 bg-white px-2 py-1 text-xs"
                aria-label="Language"
              >
                {Object.entries(LANGUAGES).map(([code, language]) => (
                  <option key={code} value={code}>
                    {language.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile: hotlines compact */}
          <div className="mt-3 rounded-md bg-red-50 px-3 py-2">
            <p className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-700">
              <Phone className="h-2.5 w-2.5" />
              Emergency Hotlines
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {EMERGENCY_HOTLINES.map(h => (
                <a
                  key={h.label}
                  href={`tel:${h.number.replace(/\D/g, '')}`}
                  className="text-[11px] text-red-700"
                >
                  <span className="font-semibold">{h.label}</span>{' '}
                  <span className="text-red-500">{h.number}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
