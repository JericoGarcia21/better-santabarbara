import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  localGovernment,
  localGovernmentFacts,
} from '../../data/localGovernment';
import ScrollReveal from '../ui/ScrollReveal';

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="scroll-mt-28 bg-gradient-to-br from-primary-500 to-[#003d82] px-4 py-16 text-center text-white md:py-20"
      >
        <ScrollReveal className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20">
            <MapPin className="h-4 w-4 text-[#f2c91d]" />
            {localGovernment.province}, {localGovernment.region}
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Better Santa Barbara
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            One community portal for municipal services, government information,
            local officials, and facts about Santa Barbara, Pangasinan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-primary-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:text-primary-500"
            >
              Browse services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/government"
              className="inline-flex items-center gap-2 rounded-md border-2 border-white px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Building2 className="h-4 w-4" />
              View government
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section
        className="border-b border-gray-200 bg-gray-50"
        aria-label="Municipal facts"
      >
        <ScrollReveal
          className="container mx-auto grid grid-cols-2 px-4 md:grid-cols-4"
          delay={80}
        >
          {localGovernmentFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={`px-3 py-5 text-center md:py-6 ${
                index > 0 ? 'border-l border-gray-200' : ''
              }`}
            >
              <div className="text-lg font-bold text-primary-500 sm:text-xl">
                {fact.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase text-gray-500">
                {fact.label}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>
    </>
  );
}
