import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { localGovernment } from '../data/localGovernment';
import LocalGovernmentProfile from '../components/home/LocalGovernmentProfile';
import LocationDemographicsSection from '../components/home/LocationDemographicsSection';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description={`BetterGov portal for ${localGovernment.name}, ${localGovernment.province}. Access local services, officials, and public information.`}
        keywords={`Santa Barbara Pangasinan, ${localGovernment.name}, local government, services, public services, civic services`}
      />
      <>
        <Hero />
        <LocationDemographicsSection showForecast={false} />
        <LocalGovernmentProfile />
        <ServicesSection />
        <GovernmentActivitySection />
      </>
    </>
  );
};

export default Home;
