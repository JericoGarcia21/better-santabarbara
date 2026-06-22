import { Building2, Database, Landmark, MapPin, Users } from 'lucide-react';
import {
  localGovernment,
  localGovernmentBarangays,
  localGovernmentProfile,
} from '../../data/localGovernment';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import { Text } from '../ui/Text';
import ScrollReveal from '../ui/ScrollReveal';
import OfficialsDirectory from './OfficialsDirectory';

const profileStats = [
  {
    label: 'Postal code',
    value: localGovernment.postalCode,
    icon: MapPin,
  },
  {
    label: 'Population density',
    value: localGovernment.density2020,
    icon: Users,
  },
  {
    label: 'Elevation',
    value: `${localGovernment.elevationMeters} m`,
    icon: MapPin,
  },
  {
    label: '2016 revenue',
    value: localGovernmentProfile.economy.annualRegularRevenue2016,
    icon: Building2,
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
    source: 'PSA OpenSTAT and 2020 Census',
    coverage: 'Population and demographic statistics',
    status: '2020 census figures integrated',
    href: localGovernment.sources.psaOpenStat,
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
  return (
    <Section id="municipal-profile" className="bg-gray-50">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Heading level={2}>About Santa Barbara</Heading>
          <Text className="text-gray-700">
            {localGovernment.historySummary}
          </Text>
          <Text className="text-gray-700">
            {localGovernment.revolutionSummary}
          </Text>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {profileStats.map(stat => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-md border border-gray-200 border-t-4 border-t-[#f2c91d] bg-white p-4"
                >
                  <Icon className="mb-3 h-5 w-5 text-primary-600" />
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="mt-1 font-semibold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <Heading level={3}>Heritage</Heading>
          <div className="rounded border border-gray-200 bg-white p-5">
            <Landmark className="mb-3 h-5 w-5 text-primary-600" />
            <ul className="grid gap-2 text-sm text-gray-800">
              {localGovernment.heritageSites.map(site => (
                <li key={site}>{site}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <OfficialsDirectory />

      <ScrollReveal className="mt-10">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <Heading level={3} className="mb-0">
            Barangays
          </Heading>
          <div className="text-sm text-gray-600">
            Municipality PSGC:{' '}
            <strong>{localGovernment.psgc.psgc10DigitCode}</strong>
          </div>
        </div>
        <Text className="text-gray-600">
          The municipality has {localGovernment.barangays} barangays. Population
          figures below are from the 2020 Census; hierarchy and codes are from
          the PSGC snapshot dated {localGovernment.psgcSnapshotDate}.
        </Text>
        <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Barangay</th>
                <th className="px-4 py-3 font-semibold">PSGC code</th>
                <th className="px-4 py-3 font-semibold">Population</th>
                <th className="px-4 py-3 font-semibold">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {localGovernmentBarangays.map(barangay => (
                <tr key={barangay.name}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {barangay.name}
                    {'oldName' in barangay && barangay.oldName && (
                      <div className="mt-0.5 text-xs font-normal text-gray-500">
                        Formerly {barangay.oldName}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    <div>{barangay.psgc10DigitCode}</div>
                    <div className="mt-0.5 text-gray-500">{barangay.code}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {barangay.population2020}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {barangay.share2020}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

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
