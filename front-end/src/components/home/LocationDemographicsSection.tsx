import { ExternalLink, Home, MapPin, TrendingUp, Users } from 'lucide-react';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  localGovernment,
  localGovernmentBarangays,
  localGovernmentProfile,
} from '../../data/localGovernment';
import { santaBarbaraBoundary } from '../../data/santaBarbaraBoundary';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import { Text } from '../ui/Text';

const fullMapUrl =
  'https://www.openstreetmap.org/?mlat=15.9999&mlon=120.4051#map=12/15.9999/120.4051';

const mapCenter: [number, number] = [15.9999, 120.4051];

const demographicStats = [
  {
    label: '2020 population',
    value: localGovernment.population2020,
    note: 'Philippine census count',
    icon: Users,
  },
  {
    label: 'Population density',
    value: localGovernment.density2020,
    note: `Across ${localGovernment.landAreaSquareKm} km2`,
    icon: MapPin,
  },
  {
    label: '2015 households',
    value: localGovernmentProfile.households2015.households,
    note: `${localGovernmentProfile.households2015.averageHouseholdSize} people on average`,
    icon: Home,
  },
  {
    label: '2015-2020 growth',
    value: localGovernmentProfile.populationGrowth.growthRate2015To2020,
    note: `Increase of ${localGovernmentProfile.populationGrowth.increase2015To2020}`,
    icon: TrendingUp,
  },
];

const populationSeries = [
  {
    year: '2015',
    value: localGovernmentProfile.populationGrowth.census2015,
    percent: 89,
  },
  {
    year: '2020',
    value: localGovernmentProfile.populationGrowth.census2020,
    percent: 100,
  },
];

const largestBarangays = [...localGovernmentBarangays]
  .sort(
    (a, b) =>
      Number(b.population2020.replace(',', '')) -
      Number(a.population2020.replace(',', ''))
  )
  .slice(0, 5);

const largestBarangayPopulation = Number(
  largestBarangays[0].population2020.replace(',', '')
);

export default function LocationDemographicsSection() {
  return (
    <Section id="location-demographics">
      <div className="mb-8 max-w-3xl">
        <div className="mb-2 text-sm font-semibold uppercase text-primary-500">
          Place and people
        </div>
        <Heading level={2}>Location and demographics</Heading>
        <Text className="text-gray-600">
          Santa Barbara is a landlocked municipality in the central plains of
          Pangasinan. Explore its location and key population figures below.
        </Text>
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <div className="relative isolate aspect-[4/3] min-w-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-sm sm:aspect-[16/10]">
            <MapContainer
              center={mapCenter}
              bounds={[
                [15.942, 120.37],
                [16.036, 120.5],
              ]}
              boundsOptions={{ padding: [20, 20] }}
              minZoom={9}
              maxZoom={18}
              scrollWheelZoom={false}
              zoomControl={false}
              className="h-full min-w-0 w-full"
              aria-label="Interactive map highlighting Santa Barbara, Pangasinan"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <GeoJSON
                data={santaBarbaraBoundary}
                style={() => ({
                  color: '#0032a0',
                  fillColor: '#0032a0',
                  fillOpacity: 0.09,
                  opacity: 0.95,
                  weight: 2.5,
                })}
              />
              <CircleMarker
                center={mapCenter}
                radius={6}
                pathOptions={{
                  color: '#0032a0',
                  fillColor: '#f2c91d',
                  fillOpacity: 1,
                  weight: 2,
                }}
              >
                <Popup>
                  <strong>Santa Barbara, Pangasinan</strong>
                  <br />
                  {localGovernment.coordinates}
                </Popup>
              </CircleMarker>
              <ZoomControl position="bottomright" />
            </MapContainer>
            <div className="pointer-events-none absolute left-3 top-3 z-[500] flex items-center gap-2 rounded bg-white/95 px-3 py-2 text-xs font-semibold text-gray-800 shadow-sm">
              <span className="h-3 w-3 border-2 border-primary-500 bg-primary-100" />
              Santa Barbara municipal boundary
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <div>
                <div className="font-semibold text-gray-900">
                  Santa Barbara, Pangasinan
                </div>
                <div className="text-sm text-gray-600">
                  {localGovernment.coordinates} ·{' '}
                  {localGovernment.elevationMeters} m elevation ·{' '}
                  {localGovernment.distanceFromCapitalKm} km from Lingayen
                </div>
              </div>
            </div>
            <a
              href={fullMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-700"
            >
              Open full map
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-2">
          <div className="grid grid-cols-2 gap-3">
            {demographicStats.map(stat => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-md border border-gray-200 border-t-4 border-t-[#f2c91d] bg-white p-4"
                >
                  <Icon className="h-5 w-5 text-primary-500" />
                  <div className="mt-3 text-xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-700">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">
                    {stat.note}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-md border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">
              Population change
            </h3>
            <div className="mt-4 space-y-4">
              {populationSeries.map(item => (
                <div key={item.year}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium text-gray-600">
                      {item.year}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-primary-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-gray-200 bg-white p-5">
          <h3 className="text-base font-semibold text-gray-900">
            Largest barangays by population
          </h3>
          <p className="mt-1 text-sm text-gray-500">2020 Census</p>
          <div className="mt-5 space-y-4">
            {largestBarangays.map(barangay => {
              const population = Number(
                barangay.population2020.replace(',', '')
              );
              return (
                <div key={barangay.name}>
                  <div className="mb-1.5 flex justify-between gap-4 text-sm">
                    <span className="font-medium text-gray-700">
                      {barangay.name}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {barangay.population2020}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#f2c91d]"
                      style={{
                        width: `${(population / largestBarangayPopulation) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-md border border-gray-200 bg-white p-5">
          <h3 className="text-base font-semibold text-gray-900">
            Registered electorate
          </h3>
          <p className="mt-1 text-sm text-gray-500">2019 voter records</p>
          <div className="mt-5 text-3xl font-bold text-primary-500">
            {localGovernmentProfile.electorate2019.total}
          </div>
          <div className="mt-1 text-sm text-gray-600">registered voters</div>
          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-primary-500"
              style={{ width: '49.49%' }}
              title="Male voters: 49.49%"
            />
            <div
              className="h-full bg-[#f2c91d]"
              style={{ width: '50.51%' }}
              title="Female voters: 50.51%"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary-500" />
              <span className="text-gray-600">Male</span>
              <div className="mt-1 font-semibold text-gray-900">
                {localGovernmentProfile.electorate2019.male}
              </div>
            </div>
            <div>
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#f2c91d]" />
              <span className="text-gray-600">Female</span>
              <div className="mt-1 font-semibold text-gray-900">
                {localGovernmentProfile.electorate2019.female}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Sources:{' '}
        <a
          href={localGovernment.sources.demographics}
          target="_blank"
          rel="noreferrer"
          className="text-primary-700 underline"
        >
          PhilAtlas demographic profile
        </a>{' '}
        ,{' '}
        <a
          href="https://www.geoboundaries.org/countryDownloads.html"
          target="_blank"
          rel="noreferrer"
          className="text-primary-700 underline"
        >
          geoBoundaries 2020 ADM3
        </a>
        , and OpenStreetMap contributors.
      </p>
    </Section>
  );
}
