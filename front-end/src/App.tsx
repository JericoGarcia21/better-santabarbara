import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Section from './components/ui/Section';
import { Text } from './components/ui/Text';
import PwaInstallPrompt from './components/PwaInstallPrompt';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Document = lazy(() => import('./pages/Document'));
const Government = lazy(() => import('./pages/Government'));
const LocationWeather = lazy(() => import('./pages/LocationWeather'));

function PageFallback() {
  return (
    <Section className="p-3 mb-12">
      <div className="flex min-h-[40vh] items-center justify-center">
        <Text>Loading...</Text>
      </div>
    </Section>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <ScrollToTop />
            <main className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:category" element={<Services />} />
                  <Route path="/services" element={<Services />} />
                  <Route
                    path="/services/:category/:documentSlug"
                    element={<Document categoryType="service" />}
                  />
                  <Route
                    path="/government/:category"
                    element={<Government />}
                  />
                  <Route path="/government" element={<Government />} />
                  <Route
                    path="/location-weather"
                    element={<LocationWeather />}
                  />
                  <Route
                    path="/government/:category/:documentSlug"
                    element={<Document categoryType="government" />}
                  />
                  <Route path="/:lang/:documentSlug" element={<Document />} />
                  <Route path="/:documentSlug" element={<Document />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <PwaInstallPrompt />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
