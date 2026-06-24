import React, { useState } from 'react';
import { ChevronDown, Globe, Menu, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { LANGUAGES } from '../../i18n/languages';
import type { LanguageType } from '../../types/index';
import SiteBrand from './SiteBrand';
import LiveCivicData from './LiveCivicData';

const EMERGENCY_HOTLINES = [
  { label: 'PNP', numbers: ['0998-598-5120', '0929-510-9148'] },
  { label: 'BFP', numbers: ['0917-187-8611', '523-4856'] },
  { label: 'MDRRMO', numbers: ['0930-958-4095'] },
  { label: 'Rural Health Unit', numbers: ['0920-722-7690'] },
  { label: 'DECORP', numbers: ['0917-897-0562', '0925-726-9546'] },
  { label: 'MSWD', numbers: ['633-33-50'] },
];

const navigationTranslationKeys: Record<string, string> = {
  LGU: 'lgu',
  'About the LGU': 'aboutLgu',
  'Local Officials': 'localOfficials',
  Barangays: 'barangays',
  'Map & Demographics': 'mapDemographics',
  Services: 'services',
  Government: 'government',
  Transparency: 'transparency',
  'Weather & Alerts': 'weatherAlerts',
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');

  const translateNavigation = (label: string) => {
    const key = navigationTranslationKeys[label];
    return key ? t(`navigation.${key}`) : label;
  };

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
      <div className="h-11 bg-[#b71c1c] text-white">
        <div className="hotline-scroll container mx-auto flex h-full items-center overflow-x-auto px-4">
          {/* Label */}
          <span className="mr-6 flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wide text-white">
            <Phone className="h-4 w-4 animate-pulse" aria-hidden="true" />
            Emergency Hotlines
          </span>
          {/* Hotline pills */}
          <div className="flex items-center gap-6 whitespace-nowrap">
            {EMERGENCY_HOTLINES.map(h => (
              <div key={h.label} className="flex shrink-0 items-baseline gap-2">
                <span className="text-sm font-bold text-white">{h.label}</span>
                {h.numbers.map((number, index) => (
                  <React.Fragment key={number}>
                    {index > 0 && <span className="text-red-300">•</span>}
                    <a
                      href={`tel:${number.replace(/\D/g, '')}`}
                      className="text-base font-semibold text-red-100 transition-colors hover:text-white"
                      title={`Call ${h.label}`}
                    >
                      {number}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Combined branding + nav bar ── */}
      <div className="border-b-2 border-[#f2c91d] bg-primary-700">
        <div className="flex h-20 w-full items-center justify-between gap-4 px-6">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <SiteBrand />
          </Link>

          {/* Desktop nav — centred */}
          <nav
            className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-5"
            aria-label="Main navigation"
          >
            <Link
              to="/#top"
              className="text-sm font-medium text-white transition-colors hover:text-[#f2c91d]"
            >
              {t('navigation.home')}
            </Link>
            {mainNavigation.map(item => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.href}
                  className="flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-white transition-colors hover:text-[#f2c91d]"
                >
                  {translateNavigation(item.label)}
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
                        {translateNavigation(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: branding links + language */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LiveCivicData />
            <div className="h-8 w-px bg-white/20" />
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
            to="/#top"
            onClick={closeMenu}
            className="block border-b border-gray-100 py-2.5 text-sm font-medium text-gray-800"
          >
            {t('navigation.home')}
          </Link>
          {mainNavigation.map(item => (
            <div key={item.label} className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-800"
                >
                  {translateNavigation(item.label)}
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
                      {translateNavigation(child.label)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
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
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-red-800">
              <Phone className="h-4 w-4 animate-pulse" />
              Emergency Hotlines
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {EMERGENCY_HOTLINES.map(h => (
                <div key={h.label} className="text-sm text-red-800">
                  <span className="font-semibold">{h.label}</span>{' '}
                  {h.numbers.map((number, index) => (
                    <React.Fragment key={number}>
                      {index > 0 && <span> · </span>}
                      <a className="text-red-600" href={`tel:${number}`}>
                        {number}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
