import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Database,
  Landmark,
  MapPin,
  Quote,
  Users,
} from 'lucide-react';
import {
  localGovernment,
  localGovernmentBarangays,
} from '../../data/localGovernment';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import { Text } from '../ui/Text';
import ScrollReveal from '../ui/ScrollReveal';

const formatPopulation = (val?: string) => {
  if (!val) return '—';
  const n = Number(String(val).replace(/,/g, ''));
  if (Number.isNaN(n)) return val;
  return n.toLocaleString();
};

const profileStats = [
  {
    label: 'Founded',
    value: 'October 30, 1741',
    icon: CalendarDays,
  },
  {
    label: 'Postal code',
    value: localGovernment.postalCode,
    icon: MapPin,
  },
  {
    label: '2024 census population',
    value: localGovernment.population2024,
    icon: Users,
  },
  {
    label: 'Population density',
    value: localGovernment.density2024,
    icon: Users,
  },
  {
    label: 'Elevation',
    value: `${localGovernment.elevationMeters} m`,
    icon: MapPin,
  },
];

const dataSources = [
  {
    source: 'PSA Philippine Standard Geographic Code',
    coverage: 'Official LGU hierarchy and code standard',
    status: 'Integrated through a PSGC API snapshot',
    href: localGovernment.sources.psgcOfficial,
  },
  {
    source: 'PSA 2024 Census of Population',
    coverage: 'Population and demographic statistics',
    status: '2024 municipal census total integrated',
    href: localGovernment.sources.psaOpenStat,
  },
  {
    source: 'Santa Barbara, Pangasinan overview',
    coverage: 'Municipal history, geography, and economy',
    status: 'Wikipedia overview consulted and summarized',
    href: localGovernment.sources.wikipedia,
  },
  {
    source: 'geoBoundaries 2020 ADM3',
    coverage: 'Santa Barbara municipal boundary',
    status: 'Integrated in the Leaflet map',
    href: localGovernment.sources.boundaryData,
  },
  {
    source: 'data.gov.ph',
    coverage: 'National open-data catalog',
    status: 'Discovery source for future datasets',
    href: localGovernment.sources.dataGovPh,
  },
];

export default function LocalGovernmentProfile() {
  const BARANGAYS_PER_PAGE = 10;
  const [barangayPage, setBarangayPage] = useState(1);
  const totalBarangayPages = useMemo(
    () => Math.ceil(localGovernmentBarangays.length / BARANGAYS_PER_PAGE),
    [localGovernmentBarangays.length]
  );
  const currentBarangays = useMemo(
    () =>
      localGovernmentBarangays.slice(
        (barangayPage - 1) * BARANGAYS_PER_PAGE,
        barangayPage * BARANGAYS_PER_PAGE
      ),
    [barangayPage, localGovernmentBarangays]
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalBarangayPages) return;
    setBarangayPage(page);
  };

  return (
    <Section id="municipal-profile" className="overflow-hidden bg-white">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary-900 text-white shadow-xl shadow-primary-950/10">
          <div className="absolute -right-8 -top-16 select-none font-serif text-[12rem] font-black leading-none text-white/[0.04] sm:text-[18rem]">
            1741
          </div>
          <div className="relative grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="mb-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-[#f2c91d]">
                <span className="h-px w-10 bg-[#f2c91d]" />
                Municipal portrait
              </div>
              <Heading level={2} className="max-w-xl text-white">
                About Santa Barbara
              </Heading>
              <p className="max-w-2xl text-xl leading-8 text-primary-50 sm:text-2xl sm:leading-9">
                {localGovernment.about}
              </p>
              <div className="mt-10 border-l-2 border-[#f2c91d] pl-5">
                <Quote className="mb-3 h-5 w-5 text-[#f2c91d]" />
                <p className="max-w-xl leading-7 text-primary-100">
                  {localGovernment.historySummary}
                </p>
                <p className="mt-4 max-w-xl leading-7 text-primary-100">
                  {localGovernment.revolutionSummary}
                </p>
              </div>
            </div>

            <aside className="border-t border-white/10 bg-black/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="flex items-center gap-3 text-base font-bold uppercase tracking-[0.18em] text-[#f2c91d]">
                <Landmark className="h-5 w-5" />
                Living heritage
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {localGovernment.heritageSites.map((site, index) => (
                  <li key={site} className="flex gap-4 py-5 first:pt-0">
                    <span className="font-serif text-3xl text-white/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-1 font-medium leading-6 text-white">
                      {site}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <div className="relative z-10 mx-4 -mt-4 grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:mx-8 sm:grid-cols-2 lg:mx-12 lg:grid-cols-5">
          {profileStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`p-5 sm:p-6 ${
                  index > 0 ? 'border-t border-gray-100 sm:border-t-0' : ''
                } ${index % 2 ? 'sm:border-l' : ''} lg:border-l lg:first:border-l-0`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  <Icon className="h-4 w-4 text-primary-600" />
                  {stat.label}
                </div>
                <div className="mt-3 text-xl font-bold text-gray-950">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-8 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <div className="sticky top-32">
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">
              Tolong to Santa Barbara
            </div>
            <Heading level={3} className="mt-3 text-4xl">
              A brief history
            </Heading>
            <Text className="max-w-sm text-gray-700">
              A river settlement, an early pueblo, and a center of
              resistance—four moments that shaped the municipality known today.
            </Text>
          </div>
        </div>

        <div className="relative ml-3 border-l border-primary-300 pb-2 sm:ml-5">
          {localGovernment.historyTimeline.map((event, index) => (
            <article
              key={`${event.date}-${event.title}`}
              className="relative pb-12 pl-8 last:pb-0 sm:pl-12"
            >
              <span className="absolute -left-[9px] top-1 h-[17px] w-[17px] rounded-full border-4 border-white bg-primary-700 ring-1 ring-primary-300" />
              <div className="mt-4">
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-serif text-2xl font-bold text-primary-800">
                    {event.date}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-950 sm:text-2xl">
                  {event.title}
                </h4>
                <p className="mt-3 max-w-2xl leading-7 text-gray-700">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>

      {(() => {
        const topBarangays = [...localGovernmentBarangays]
          .filter(b => b.population2020)
          .sort(
            (a, b) =>
              Number(b.population2020.replace(/,/g, '')) -
              Number(a.population2020.replace(/,/g, ''))
          )
          .slice(0, 3);

        return (
          <ScrollReveal className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-8">
            <div>
              <div className="space-y-4">
                <div className="space-y-3 sm:hidden">
                  {currentBarangays.map(barangay => (
                    <div
                      key={barangay.name}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {barangay.name}
                          </div>
                          {'oldName' in barangay && barangay.oldName && (
                            <div className="mt-1 text-xs text-gray-500">
                              Formerly {barangay.oldName}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-sm font-semibold text-gray-900">
                          {formatPopulation(
                            'population2020' in barangay &&
                              barangay.population2020
                              ? barangay.population2020
                              : undefined
                          )}
                        </div>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            PSGC code
                          </div>
                          <div className="mt-1 font-mono text-sm text-gray-700">
                            {barangay.psgc10DigitCode}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {barangay.code}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            Share (2020)
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            {'share2020' in barangay && barangay.share2020
                              ? barangay.share2020
                              : '—'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:block overflow-x-auto rounded border border-gray-200 bg-white">
                  <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                      <tr className="sticky top-0 z-10">
                        <th className="px-4 py-3 font-semibold text-left">
                          Barangay
                        </th>
                        <th className="px-4 py-3 font-semibold text-left">
                          PSGC code
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Population (2020)
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Share (2020)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentBarangays.map(barangay => (
                        <tr key={barangay.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 align-top">
                            <div className="font-medium text-gray-900">
                              {barangay.name}
                            </div>
                            {'oldName' in barangay && barangay.oldName && (
                              <div className="mt-0.5 text-xs font-normal text-gray-500">
                                Formerly {barangay.oldName}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="font-mono text-xs text-gray-700">
                              {barangay.psgc10DigitCode}
                            </div>
                            <div className="mt-0.5 text-xs text-gray-500">
                              {barangay.code}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900 align-top">
                            {formatPopulation(
                              'population2020' in barangay &&
                                barangay.population2020
                                ? barangay.population2020
                                : undefined
                            )}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-gray-600 align-top">
                            {'share2020' in barangay && barangay.share2020
                              ? barangay.share2020
                              : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <div className="text-sm text-gray-600 hidden sm:block">
                  Showing page {barangayPage} of {totalBarangayPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(barangayPage - 1)}
                    disabled={barangayPage === 1}
                    className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-primary-500 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: totalBarangayPages },
                    (_, i) => i + 1
                  ).map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goToPage(n)}
                      className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${n === barangayPage ? 'border-primary-500 bg-primary-500 text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-700'}`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => goToPage(barangayPage + 1)}
                    disabled={barangayPage === totalBarangayPages}
                    className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-primary-500 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div
                role="note"
                className="mt-4 rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4 text-base text-gray-800 leading-relaxed"
              >
                <div className="font-semibold">Note:</div>
                <div className="mt-1">
                  Barangay population figures shown are from the{' '}
                  <strong>2020 census</strong>. The municipal total shown above
                  is the <strong>2024 census</strong> municipality total.
                  Barangay-level 2024 counts are not currently available in this
                  dataset.
                </div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-3">
                <div className="text-sm font-semibold text-gray-700">
                  Top 3 most populated barangays
                </div>
                <div className="text-xs text-gray-500">
                  Santa Barbara (2020)
                </div>

                <div className="mt-3 space-y-3">
                  {topBarangays.map((b, idx) => (
                    <div
                      key={b.name}
                      className="flex items-center justify-between rounded border border-gray-100 bg-white p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary-50 px-2 py-1 text-sm font-bold text-primary-700">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">
                            {b.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatPopulation(b.population2020)}
                          </div>
                        </div>
                      </div>
                      {'share2020' in b && b.share2020 && (
                        <div className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-800">
                          {b.share2020}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </ScrollReveal>
        );
      })()}

      <ScrollReveal className="mt-10 border-t border-gray-200 pt-8">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-primary-500" />
          <Heading level={3} className="mb-0">
            Data sources and coverage
          </Heading>
        </div>
        <div className="mt-5 overflow-hidden rounded-md border border-gray-200 bg-white">
          {dataSources.map((source, index) => (
            <a
              key={source.source}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className={`grid gap-1 px-5 py-4 transition-colors hover:bg-gray-50 sm:grid-cols-3 sm:gap-5 ${
                index > 0 ? 'border-t border-gray-200' : ''
              }`}
            >
              <span className="font-semibold text-primary-700">
                {source.source}
              </span>
              <span className="text-sm text-gray-700">{source.coverage}</span>
              <span className="text-sm text-gray-500">{source.status}</span>
            </a>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Additional local sources:{' '}
          <a
            className="text-primary-700 underline"
            href={localGovernment.sources.province}
            rel="noreferrer"
            target="_blank"
          >
            Province of Pangasinan
          </a>
          {' and '}
          <a
            className="text-primary-700 underline"
            href={localGovernment.sources.demographics}
            rel="noreferrer"
            target="_blank"
          >
            PhilAtlas demographic profile
          </a>
          . Officials, budgets, projects, ordinances, hazards, and evacuation
          details require LGU publications, MDRRMO or GeoRiskPH records, or FOI
          responses and are not represented as API-backed data here.
        </div>
      </ScrollReveal>
    </Section>
  );
}
