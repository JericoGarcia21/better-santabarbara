import { useEffect, useState } from 'react';
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  ExternalLink,
  MapPin,
  ShieldAlert,
  Sun,
  TrendingUp,
  Users,
  Wind,
} from 'lucide-react';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  localGovernment,
  localGovernmentProfile,
} from '../../data/localGovernment';
import { santaBarbaraBoundary } from '../../data/santaBarbaraBoundary';
import { santaBarbaraBarangayLocations } from '../../data/santaBarbaraBarangays';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import { Text } from '../ui/Text';

const fullMapUrl =
  'https://www.openstreetmap.org/?mlat=15.9999&mlon=120.4051#map=12/15.9999/120.4051';

const mapCenter: [number, number] = [15.9999, 120.4051];
const santaBarbaraBounds: [[number, number], [number, number]] = [
  [15.9485, 120.3773],
  [16.0291, 120.4924],
];
const santaBarbaraCenter: [number, number] = [
  (santaBarbaraBounds[0][0] + santaBarbaraBounds[1][0]) / 2,
  (santaBarbaraBounds[0][1] + santaBarbaraBounds[1][1]) / 2,
];

const philippinesCenter: [number, number] = [12.5, 122.0];

const weatherOverlayOptions = {
  wind: { label: 'Wind', type: 'openWeather', tile: 'wind_new' },
  temperature: { label: 'Temperature', type: 'openWeather', tile: 'temp_new' },
  precipitation: {
    label: 'Precipitation',
    type: 'openWeather',
    tile: 'precipitation_new',
  },
  clouds: { label: 'Clouds', type: 'openWeather', tile: 'clouds_new' },
  radar: { label: 'Radar', type: 'rainViewer' },
} as const;

type WeatherOverlayType = keyof typeof weatherOverlayOptions;

const buildOverlayUrl = (tile: string) =>
  import.meta.env.VITE_OPENWEATHERMAP_API_KEY
    ? `https://tile.openweathermap.org/map/${tile}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
    : '';

const buildRainViewerUrl = (timestamp: number) =>
  `https://tilecache.rainviewer.com/v2/radar/${timestamp}/{z}/{x}/{y}/2/1_0.png`;

interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    precipitation_sum: number[];
  };
}

const weatherDescription = (code: number) => {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 95) return 'Thunderstorms';
  if (code >= 51) return 'Rain showers';
  return 'Cloudy';
};

const WeatherIcon = ({
  code,
  className,
}: {
  code: number;
  className: string;
}) => {
  if (code === 0) return <Sun className={className} />;
  if (code <= 3) return <CloudSun className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  if (code >= 51) return <CloudRain className={className} />;
  return <Cloud className={className} />;
};

const getHeatRisk = (apparentTemperature: number) => {
  if (apparentTemperature >= 42) {
    return {
      label: 'Danger',
      detail: 'Limit outdoor activity and stay hydrated.',
    };
  }
  if (apparentTemperature >= 33) {
    return {
      label: 'Use caution',
      detail: 'Take breaks and drink water often.',
    };
  }
  return { label: 'Low risk', detail: 'Continue normal heat precautions.' };
};

const getRainRisk = (weather: WeatherData) => {
  const probability = weather.daily.precipitation_probability_max[0];
  const rainfall = weather.daily.precipitation_sum[0];
  if (probability >= 70 || rainfall >= 25) {
    return {
      label: 'Elevated risk',
      detail: `${probability}% chance · ${rainfall.toFixed(1)} mm forecast today`,
    };
  }
  return {
    label: 'No heavy-rain signal',
    detail: `${probability}% chance · ${rainfall.toFixed(1)} mm forecast today`,
  };
};

const demographicStats = [
  {
    label: '2024 population',
    value: localGovernment.population2024,
    note: '2024 Census of Population',
    icon: Users,
  },
  {
    label: 'Population density',
    value: localGovernment.density2024,
    note: `Across ${localGovernment.landAreaSquareKm} km2`,
    icon: MapPin,
  },
  {
    label: 'Barangays',
    value: String(localGovernment.barangays),
    note: 'Municipal communities',
    icon: MapPin,
  },
  {
    label: '2020-2024 change',
    value: localGovernmentProfile.populationGrowth.growthRate2020To2024,
    note: `Increase of ${localGovernmentProfile.populationGrowth.increase2020To2024} residents`,
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
    percent: 99.75,
  },
  {
    year: '2024',
    value: localGovernmentProfile.populationGrowth.census2024,
    percent: 100,
  },
];

export default function LocationDemographicsSection({
  showForecast = true,
  showDemographics = true,
}: {
  showForecast?: boolean;
  showDemographics?: boolean;
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherUnavailable, setWeatherUnavailable] = useState(false);
  const [weatherLastUpdated, setWeatherLastUpdated] = useState<number | null>(
    null
  );
  const [overlayType, setOverlayType] = useState<WeatherOverlayType>('wind');
  const [rainViewerTimestamp, setRainViewerTimestamp] = useState<number | null>(
    null
  );

  const formatWeatherUpdate = (timestamp: number) =>
    new Intl.DateTimeFormat('en-PH', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila',
    }).format(new Date(timestamp));

  const mapCenterToUse = showDemographics
    ? santaBarbaraCenter
    : philippinesCenter;
  const mapBoundsToUse = showDemographics ? santaBarbaraBounds : undefined;
  const mapMinZoom = showDemographics ? 12 : 3;
  const mapMaxZoom = showDemographics ? 18 : 10;
  const mapZoom = showDemographics ? 13 : 5;
  const overlayData = weatherOverlayOptions[overlayType];

  const weatherOverlayUrl =
    overlayData.type === 'openWeather' && overlayData.tile
      ? buildOverlayUrl(overlayData.tile)
      : '';
  const rainViewerUrl =
    overlayData.type === 'rainViewer' && rainViewerTimestamp
      ? buildRainViewerUrl(rainViewerTimestamp)
      : '';

  useEffect(() => {
    const controller = new AbortController();
    const weatherUrl =
      'https://api.open-meteo.com/v1/forecast?latitude=15.9999&longitude=120.4051&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=Asia%2FManila&forecast_days=5';

    const loadWeather = async () => {
      try {
        const [weatherResponse, rainViewerResponse] = await Promise.all([
          fetch(weatherUrl, { signal: controller.signal }),
          fetch('https://api.rainviewer.com/public/maps.json', {
            signal: controller.signal,
          }),
        ]);

        if (!weatherResponse.ok) throw new Error('Weather request failed');
        if (!rainViewerResponse.ok)
          throw new Error('RainViewer metadata request failed');

        const weatherData = (await weatherResponse.json()) as WeatherData;
        const rainViewerData = (await rainViewerResponse.json()) as {
          radar: { nowcast: Array<{ time: number }> };
        };

        setWeather(weatherData);
        setWeatherLastUpdated(Date.now());
        const latestFrame =
          rainViewerData.radar.nowcast?.[
            rainViewerData.radar.nowcast.length - 1
          ];
        if (latestFrame) {
          setRainViewerTimestamp(latestFrame.time);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setWeatherUnavailable(true);
        }
      }
    };

    loadWeather();
    const refreshInterval = window.setInterval(loadWeather, 5 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(refreshInterval);
    };
  }, []);

  return (
    <Section id="location-demographics">
      <div className="mb-8 max-w-3xl">
        <div className="mb-2 text-sm font-semibold uppercase text-primary-500">
          Place and people
        </div>
        <Heading level={2}>
          {showDemographics ? 'Location and demographics' : 'Weather & alerts'}
        </Heading>
        <Text className="text-gray-600">
          {showDemographics
            ? 'Santa Barbara is a landlocked municipality in the central plains of Pangasinan. Explore its location and key population figures below.'
            : 'Live conditions, a five-day outlook, and weather safety guidance for Santa Barbara, Pangasinan.'}
        </Text>
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-5">
        <div
          id="weather-alerts"
          className={`min-w-0 scroll-mt-32 ${
            showDemographics ? 'lg:col-span-3' : 'lg:col-span-5'
          }`}
        >
          <div className="relative isolate h-[560px] min-w-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-sm sm:h-[620px]">
            <MapContainer
              center={mapCenterToUse}
              bounds={mapBoundsToUse}
              boundsOptions={{ padding: [40, 40] }}
              zoom={mapZoom}
              minZoom={mapMinZoom}
              maxZoom={mapMaxZoom}
              scrollWheelZoom={true}
              dragging={true}
              zoomControl={true}
              className="h-full min-w-0 w-full"
              aria-label={
                showDemographics
                  ? 'Interactive map highlighting Santa Barbara, Pangasinan'
                  : 'Philippines weather overlay map with Santa Barbara highlighted'
              }
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {!showDemographics && weatherOverlayUrl && (
                <TileLayer
                  url={weatherOverlayUrl}
                  opacity={0.65}
                  attribution="&copy; OpenWeatherMap"
                />
              )}
              {!showDemographics && !weatherOverlayUrl && rainViewerUrl && (
                <TileLayer
                  url={rainViewerUrl}
                  opacity={0.9}
                  attribution="&copy; RainViewer"
                />
              )}
              {showDemographics &&
                santaBarbaraBarangayLocations.map(barangay => (
                  <CircleMarker
                    key={barangay.name}
                    center={[barangay.position[0], barangay.position[1]]}
                    radius={3}
                    interactive={false}
                    pathOptions={{
                      color: '#ffffff',
                      fillColor: '#0032a0',
                      fillOpacity: 1,
                      weight: 1,
                    }}
                  >
                    <Tooltip
                      permanent
                      direction="top"
                      offset={[0, -3]}
                      className="barangay-map-label"
                    >
                      {barangay.name}
                    </Tooltip>
                  </CircleMarker>
                ))}
              <GeoJSON
                data={santaBarbaraBoundary}
                style={() => ({
                  color: '#0032a0',
                  fillColor: '#0032a0',
                  fillOpacity: showDemographics ? 0.09 : 0.03,
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
              {showDemographics
                ? 'Santa Barbara municipal boundary'
                : 'Philippines weather overlay with Santa Barbara highlighted'}
            </div>
            {!showDemographics && (
              <div className="absolute left-3 bottom-3 z-[500] flex flex-wrap gap-2 rounded-xl bg-white/95 p-2 shadow-sm">
                {Object.entries(weatherOverlayOptions).map(([key, overlay]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setOverlayType(key as WeatherOverlayType)}
                    className={`rounded-full border px-2 py-1 text-xs font-semibold transition ${
                      overlayType === key
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-700'
                    }`}
                  >
                    {overlay.label}
                  </button>
                ))}
              </div>
            )}
            <div className="absolute right-0 top-16 z-[500] w-52 border-l-4 border-[#f2c91d] bg-primary-900/95 p-4 text-white shadow-xl backdrop-blur-sm">
              {weather ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#f2c91d]">
                        Santa Barbara now
                      </div>
                      <div className="mt-1 text-3xl font-bold">
                        {Math.round(weather.current.temperature_2m)}°C
                      </div>
                    </div>
                    <WeatherIcon
                      code={weather.current.weather_code}
                      className="h-9 w-9 text-[#f2c91d]"
                    />
                  </div>
                  <div className="mt-1 text-sm text-white/90">
                    {weatherDescription(weather.current.weather_code)} · Feels
                    like {Math.round(weather.current.apparent_temperature)}°C
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/15 pt-3 text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Droplets className="h-3.5 w-3.5" />
                      {weather.current.relative_humidity_2m}%
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Wind className="h-3.5 w-3.5" />
                      {Math.round(weather.current.wind_speed_10m)} km/h
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-white/80">
                  {weatherUnavailable
                    ? 'Weather temporarily unavailable'
                    : 'Loading local weather…'}
                </div>
              )}
            </div>
          </div>
          {showForecast && weather && (
            <div className="mt-6 border-y border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-4 py-4">
                <div className="font-semibold text-gray-900">
                  Five-day weather outlook
                </div>
                <div className="text-xs text-gray-500">
                  Forecast for Santa Barbara · Updated live by Open-Meteo
                  {weatherLastUpdated
                    ? ` · Updated ${formatWeatherUpdate(weatherLastUpdated)}`
                    : ''}
                </div>
                <div className="mt-1 text-xs font-medium text-primary-700 sm:hidden">
                  Swipe sideways to view all five days
                </div>
              </div>
              <div className="overflow-x-auto" aria-label="Five-day forecast">
                <div className="grid auto-cols-[220px] grid-flow-col gap-3 px-2 py-2 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-5">
                  {weather.daily.time.map((date, index) => (
                    <div
                      key={date}
                      className="min-w-[220px] rounded-3xl border border-gray-200 bg-gray-50 px-4 py-5 text-center shadow-sm sm:min-w-0"
                    >
                      <div className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                        {new Intl.DateTimeFormat('en-PH', {
                          weekday: 'short',
                        }).format(new Date(`${date}T12:00:00`))}
                      </div>
                      <div className="mt-1 text-xs font-medium text-gray-500">
                        {new Intl.DateTimeFormat('en-PH', {
                          month: 'short',
                          day: 'numeric',
                        }).format(new Date(`${date}T12:00:00`))}
                      </div>
                      <WeatherIcon
                        code={weather.daily.weather_code[index]}
                        className="mx-auto my-3 h-9 w-9 text-primary-600"
                      />
                      <div className="text-sm font-semibold text-gray-900">
                        {weatherDescription(weather.daily.weather_code[index])}
                      </div>
                      <div className="mt-3 flex justify-center gap-3 text-sm">
                        <span className="font-bold text-gray-950">
                          H{' '}
                          {Math.round(weather.daily.temperature_2m_max[index])}°
                        </span>
                        <span className="font-semibold text-gray-600">
                          L{' '}
                          {Math.round(weather.daily.temperature_2m_min[index])}°
                        </span>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700">
                        <Droplets className="h-4 w-4" />
                        {weather.daily.precipitation_probability_max[index]}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showForecast && weather && (
            <div className="grid gap-4 border-b border-gray-200 bg-gray-50 px-4 py-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-200 sm:px-0">
              <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                  <CloudRain className="h-5 w-5" />
                  Rainfall watch
                </div>
                <div className="mt-3 text-lg font-semibold text-gray-900">
                  {getRainRisk(weather).label}
                </div>
                <div className="mt-2 text-sm leading-6 text-gray-600">
                  {getRainRisk(weather).detail}
                </div>
              </div>
              <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-orange-900">
                  <Sun className="h-5 w-5" />
                  Heat watch
                </div>
                <div className="mt-3 text-lg font-semibold text-gray-900">
                  {getHeatRisk(weather.current.apparent_temperature).label}
                </div>
                <div className="mt-2 text-sm leading-6 text-gray-600">
                  Feels like {Math.round(weather.current.apparent_temperature)}
                  °C. {getHeatRisk(weather.current.apparent_temperature).detail}
                </div>
              </div>
              <a
                href="https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin"
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm transition hover:border-red-200 hover:bg-red-50"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-red-900">
                  <ShieldAlert className="h-5 w-5" />
                  Typhoon warnings
                </div>
                <div className="mt-3 text-lg font-semibold text-gray-900">
                  Check official bulletins
                </div>
                <div className="mt-2 text-sm leading-6 text-gray-600">
                  Open the latest PAGASA tropical cyclone bulletin. Weather
                  forecasts on this page are not official storm warnings.
                </div>
              </a>
            </div>
          )}
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

        {showDemographics && (
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
        )}
      </div>

      {showDemographics && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">
              2024 census snapshot
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Municipality of Santa Barbara
            </p>
            <div className="mt-5 text-4xl font-bold text-primary-500">
              {localGovernment.population2024}
            </div>
            <div className="mt-2 text-sm text-gray-600">residents</div>
            <div className="mt-6 border-t border-gray-100 pt-5 text-sm leading-6 text-gray-600">
              Population density is {localGovernment.density2024} across{' '}
              {localGovernment.landAreaSquareKm} km2 and{' '}
              {localGovernment.barangays} barangays.
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
      )}

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
