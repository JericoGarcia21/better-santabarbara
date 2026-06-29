import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const logoSymbols = [
  {
    label: 'Digital Circuit',
    description:
      'Technology, digital transformation, and the efficient flow of government information and services.',
  },
  {
    label: 'New Municipal Hall',
    description:
      'The Municipality of Santa Barbara and transparent, efficient, citizen-centered governance.',
  },
  {
    label: 'Philippine Flag',
    description:
      'Patriotism, public service, and commitment to serving the Filipino people.',
  },
  {
    label: 'Rising Sun',
    description:
      'Hope, innovation, progress, and the municipality vision for a brighter future.',
  },
  {
    label: 'Rice Stalks',
    description:
      'Santa Barbara agricultural heritage, prosperity, and the vital role of farmers.',
  },
  {
    label: 'Green Landscape',
    description:
      'Fertile land, sustainable development, and continuous community growth.',
  },
  {
    label: 'Flowing Ribbons',
    description:
      'Continuous progress, digital connectivity, transparency, sustainability, and prosperity.',
  },
];

const logoColors = [
  ['Blue', 'Technology, trust, and transparency.'],
  ['Green', 'Agriculture, sustainability, and growth.'],
  ['Gold', 'Prosperity, excellence, and innovation.'],
  ['White', 'Integrity, honesty, and accountability.'],
];

interface SiteBrandProps {
  inverse?: boolean;
  compact?: boolean;
  enablePreview?: boolean;
}

export default function SiteBrand({
  inverse = false,
  compact = false,
  enablePreview = false,
}: SiteBrandProps) {
  const [showLargeLogo, setShowLargeLogo] = useState(false);
  const logo = (
    <span
      className={cn(
        'block shrink-0',
        compact ? 'h-12 w-[78px]' : 'h-14 w-[96px] sm:h-16 sm:w-[112px]'
      )}
    >
      <img
        src="/Logo/newlogo.png"
        alt="Better Santa Barbara logo"
        className="h-full w-full scale-125 object-contain bg-transparent"
      />
    </span>
  );

  return (
    <>
      <div
        className="group relative flex min-w-0 items-center gap-3"
        aria-label="Better Santa Barbara"
      >
        {enablePreview ? (
          <button
            type="button"
            onClick={() => setShowLargeLogo(true)}
            className="shrink-0 rounded-full p-1 transition hover:bg-white/10"
            aria-label="View logo larger"
          >
            {logo}
          </button>
        ) : (
          <div className="shrink-0 rounded-full p-1">{logo}</div>
        )}
        <div className="min-w-0 leading-none">
          <div
            className={cn(
              'font-bold tracking-tight',
              compact ? 'text-base' : 'text-lg xl:text-xl',
              'text-white'
            )}
          >
            Better <span className="text-[#f2c91d]">Santa Barbara</span>
          </div>
          <div
            className={cn(
              'mt-0.5 text-[10px] font-semibold uppercase tracking-widest',
              inverse ? 'text-white/80' : 'text-white/90'
            )}
          >
            A BetterGov civic portal
          </div>
        </div>

        {enablePreview && (
          <div className="pointer-events-none absolute left-0 top-full z-[80] hidden w-[min(920px,calc(100vw-2rem))] translate-y-3 overflow-hidden rounded-xl border border-primary-200 bg-white text-gray-900 opacity-0 shadow-2xl shadow-primary-950/20 ring-1 ring-black/5 transition duration-150 group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:translate-y-2 group-focus-within:opacity-100 lg:block">
            <div className="bg-primary-900 px-6 py-4 text-white">
              <div className="text-base font-bold">
                BetterGov <span className="text-[#f2c91d]">Santa Barbara</span>
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Logo symbolism
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[300px_1fr]">
              <div className="rounded-xl border border-primary-100 bg-gradient-to-b from-primary-50 to-white p-4 shadow-inner">
                <div className="flex h-56 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-primary-100">
                  <img
                    src="/Logo/newlogo.png"
                    alt="BetterGov Santa Barbara logo full preview"
                    className="h-52 w-full scale-110 object-contain"
                  />
                </div>
                <p className="mt-4 text-center text-sm font-semibold leading-5 text-primary-900">
                  Technology, agriculture, public service, and local progress in
                  one civic mark.
                </p>
              </div>

              <div>
                <div className="grid gap-3 text-sm leading-5 sm:grid-cols-2">
                  {logoSymbols.map(symbol => (
                    <div
                      key={symbol.label}
                      className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      <div className="border-l-3 border-[#f2c91d] pl-3 font-bold text-gray-950">
                        {symbol.label}
                      </div>
                      <div className="mt-1 pl-3 text-gray-600">
                        {symbol.description}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">
                    Colors
                  </div>
                  <div className="mt-3 grid gap-3 text-sm sm:grid-cols-4">
                    {logoColors.map(([color, meaning]) => (
                      <div
                        key={color}
                        className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-2 font-bold text-gray-950">
                          <span
                            className={cn(
                              'h-3 w-3 rounded-full ring-2 ring-white',
                              color === 'Blue' && 'bg-primary-600',
                              color === 'Green' && 'bg-success-600',
                              color === 'Gold' && 'bg-[#f2c91d]',
                              color === 'White' &&
                                'border border-gray-300 bg-white'
                            )}
                          />
                          {color}
                        </div>
                        <div className="mt-1.5 leading-5 text-gray-600">
                          {meaning}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showLargeLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-[min(920px,94vw)] overflow-y-auto rounded-md bg-white p-5 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowLargeLogo(false)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-sm transition hover:bg-white"
              aria-label="Close logo preview"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src="/Logo/newlogo.png"
              alt="Better Santa Barbara logo"
              className="mx-auto h-[280px] w-full max-w-lg object-contain"
            />
            <div className="mt-4 border-t border-gray-100 pt-4">
              <h2 className="text-lg font-bold text-primary-900">
                BetterGov Santa Barbara Logo Symbolism
              </h2>
              <div className="mt-3 grid gap-3 text-sm leading-6 text-gray-700 md:grid-cols-2">
                {logoSymbols.map(symbol => (
                  <p key={symbol.label}>
                    <strong className="text-gray-950">{symbol.label}</strong> -{' '}
                    {symbol.description}
                  </p>
                ))}
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-gray-500">
                Colors
              </h3>
              <div className="mt-2 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                {logoColors.map(([color, meaning]) => (
                  <p key={color}>
                    <strong className="text-gray-950">{color}</strong> -{' '}
                    {meaning}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
