import React, { useCallback, useMemo, useState } from 'react';
import { ChevronDown, Globe, Menu, Phone, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { governmentCategories, serviceCategories } from '../../data/yamlLoader';
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
  'Health Services': 'healthServices',
  Education: 'education',
  'Business and Livelihood': 'businessLivelihood',
  'Jobs & Opportunities': 'jobsOpportunities',
  'Social Welfare': 'socialWelfare',
  'Agriculture & Fisheries': 'agricultureFisheries',
  'Infrastructure & Public Works': 'infrastructurePublicWorks',
  'Garbage and Waste Disposal': 'garbageWasteDisposal',
  Environment: 'environment',
  'Disaster Preparedness': 'disasterPreparedness',
  'Housing & Land Use': 'housingLandUse',
};

interface SearchItem {
  title: string;
  description: string;
  href: string;
  section: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, i18n } = useTranslation('common');

  const translateNavigation = useCallback(
    (label: string) => {
      const key = navigationTranslationKeys[label];
      return key ? t(`navigation.${key}`) : label;
    },
    [t]
  );

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const scrollToPageTop = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  const searchItems = useMemo<SearchItem[]>(() => {
    const navigationItems = mainNavigation.flatMap(item => [
      {
        title: translateNavigation(item.label),
        description: 'Open this civic portal section.',
        href: item.href,
        section: 'Navigation',
      },
      ...(item.children ?? []).map(child => ({
        title: translateNavigation(child.label),
        description: `Go to ${translateNavigation(item.label)} information.`,
        href: child.href,
        section: translateNavigation(item.label),
      })),
    ]);

    const serviceItems = serviceCategories.categories.map(category => ({
      title: category.category,
      description: category.description,
      href: `/services/${category.slug}`,
      section: 'Services',
    }));

    const governmentItems = governmentCategories.categories.map(category => ({
      title: category.category,
      description: category.description,
      href: `/government/${category.slug}`,
      section: 'Government',
    }));

    return [
      {
        title: 'Home',
        description: 'Return to the Better Santa Barbara homepage.',
        href: '/',
        section: 'Navigation',
      },
      {
        title: 'Weather & Alerts',
        description:
          'Five-day forecast, rainfall watch, heat watch, and typhoon bulletins.',
        href: '/location-weather',
        section: 'Weather',
      },
      ...navigationItems,
      ...serviceItems,
      ...governmentItems,
    ];
  }, [translateNavigation]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      const featuredSections = ['Weather', 'Services', 'Government'];
      const featuredItems = searchItems.filter(item =>
        featuredSections.includes(item.section)
      );
      const navigationItems = searchItems.filter(
        item => !featuredSections.includes(item.section)
      );

      return [...featuredItems, ...navigationItems].slice(0, 12);
    }

    return searchItems
      .filter(item =>
        `${item.title} ${item.description} ${item.section}`
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 10);
  }, [searchItems, searchQuery]);

  return (
    <header className="sticky top-0 z-50 bg-primary-700 shadow-lg shadow-primary-950/10">
      <div className="hidden border-b border-white/10 bg-primary-800 lg:block">
        <div className="mx-auto flex h-10 max-w-screen-2xl items-center justify-between gap-6 px-6">
          <div className="hotline-scroll flex min-w-0 items-center gap-4 overflow-x-auto text-xs text-white/85">
            <span className="flex shrink-0 items-center gap-2 font-bold uppercase tracking-wide text-[#f2c91d]">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Emergency
            </span>
            {EMERGENCY_HOTLINES.slice(0, 4).map(h => (
              <div key={h.label} className="flex shrink-0 items-center gap-1">
                <span className="font-semibold text-white">{h.label}</span>
                <a
                  href={`tel:${h.numbers[0].replace(/\D/g, '')}`}
                  className="font-medium text-white/80 hover:text-white"
                  title={`Call ${h.label}`}
                >
                  {h.numbers[0]}
                </a>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <LiveCivicData />
            <a
              href="https://bettergov.ph/join-us"
              className="rounded-full bg-[#f2c91d] px-3 py-1.5 text-xs font-bold text-primary-900 transition hover:bg-white"
              rel="noreferrer"
              target="_blank"
            >
              Join BetterGov
            </a>
            <a
              href="https://www.gov.ph"
              className="text-xs font-semibold text-white/75 transition-colors hover:text-white"
              rel="noreferrer"
              target="_blank"
            >
              GOV.PH
            </a>
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-white/70" aria-hidden="true" />
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="border-0 bg-transparent p-0 text-xs font-semibold text-white focus:outline-none focus:ring-0"
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
        </div>
      </div>

      <div className="border-b-2 border-[#f2c91d]">
        <div className="mx-auto flex h-[72px] max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
          <Link
            to="/"
            onClick={closeMenu}
            className="min-w-0 shrink-0 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <SiteBrand />
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              onClick={scrollToPageTop}
              className="rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#f2c91d]"
            >
              {t('navigation.home')}
            </Link>
            {mainNavigation.map(item => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#f2c91d]"
                >
                  {translateNavigation(item.label)}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 mt-3 w-64 translate-y-1 rounded-md border border-gray-100 bg-white py-2 opacity-0 shadow-xl ring-1 ring-black/5 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                      >
                        {translateNavigation(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-white/30 lg:inline-flex"
              aria-label="Open site search"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 lg:hidden"
              aria-label="Open site search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(open => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 lg:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <nav
          className="border-b border-gray-200 bg-white px-4 pb-4 shadow-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              scrollToPageTop();
            }}
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
                      {index > 0 && <span> - </span>}
                      <a
                        className="text-red-600"
                        href={`tel:${number.replace(/\D/g, '')}`}
                      >
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

      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-primary-950/70 p-4 backdrop-blur-sm">
          <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-md bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-primary-600" />
              <input
                autoFocus
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search services, offices, weather, and LGU info"
                className="min-w-0 flex-1 border-0 text-base font-medium text-gray-900 outline-none placeholder:text-gray-400"
                aria-label="Search civic portal"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchResults.length > 0 ? (
                searchResults.map(item => (
                  <Link
                    key={`${item.section}-${item.href}-${item.title}`}
                    to={item.href}
                    onClick={() => {
                      closeSearch();
                      closeMenu();
                    }}
                    className="block rounded-md px-4 py-3 transition hover:bg-primary-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-gray-950">
                        {item.title}
                      </div>
                      <span className="shrink-0 rounded bg-[#f2c91d]/20 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-800">
                        {item.section}
                      </span>
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-10 text-center">
                  <div className="font-semibold text-gray-900">
                    No results found
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Try searching for services, weather, permits, departments,
                    or barangays.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
