import LocationDemographicsSection from '../components/home/LocationDemographicsSection';
import SEO from '../components/SEO';

export default function LocationWeather() {
  return (
    <main className="flex-grow">
      <SEO
        title="Location, Demographics, Weather & Alerts"
        description="Explore Santa Barbara's municipal map, 2024 population information, live weather forecast, rainfall and heat watches, and official typhoon bulletin links."
        keywords="Santa Barbara Pangasinan map, weather, rainfall, heat index, typhoon warnings, population, demographics"
      />
      <LocationDemographicsSection showDemographics={false} />
    </main>
  );
}
