import { useEffect, useState } from 'react';
import { ArrowRight, Building2, Info, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  localGovernment,
  localGovernmentFacts,
} from '../../data/localGovernment';
import ScrollReveal from '../ui/ScrollReveal';

export default function Hero() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowDisclaimer(false), 15000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <section
        id="top"
        className="relative isolate min-h-[520px] overflow-hidden scroll-mt-28 bg-primary-900 px-4 pb-40 pt-16 text-center text-white sm:pb-32 md:min-h-[500px] md:pt-20"
      >
        <img
          src="/Logo/sb_municipal_hall.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-950/95 via-primary-800/85 to-primary-600/75" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(242,201,29,0.22),transparent_34rem)]" />

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
        <div
          role="note"
          aria-label="Data disclaimer"
          className={`absolute inset-x-4 bottom-5 z-10 mx-auto flex max-w-4xl items-start gap-3 rounded-lg border border-[#f2c91d] bg-white px-4 py-4 text-left shadow-xl transition-all duration-700 sm:items-center sm:px-5 ${
            showDisclaimer
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 sm:mt-0" />
          <p className="whitespace-pre-line text-sm leading-6 text-gray-800 sm:text-base sm:leading-7">
            <strong className="text-gray-950">Disclaimer:</strong> Independent
            portal disclaimer: Information on this portal is compiled from
            publicly available open-source data and may not reflect the latest
            records of the Municipality of Santa Barbara. This independent
            community portal was created by a private citizen of Santa Barbara
            and is not an official LGU data portal. Please verify critical
            information with the municipal government. Once contact is
            established with the Santa Barbara LGU, its offices will be invited
            to review the portal and help verify, correct, and update public
            information. Until then, this portal does not claim LGU approval,
            endorsement, or partnership.
          </p>
        </div>
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
