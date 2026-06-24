import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SiteBrandProps {
  inverse?: boolean;
  compact?: boolean;
}

export default function SiteBrand({
  inverse = false,
  compact = false,
}: SiteBrandProps) {
  const [showLargeLogo, setShowLargeLogo] = useState(false);

  return (
    <>
      <div
        className="flex items-center gap-3"
        aria-label="Better Santa Barbara"
      >
        {/* Official LGU Seal */}
        <button
          type="button"
          onClick={() => setShowLargeLogo(true)}
          className="shrink-0 rounded-full p-1 transition hover:bg-white/10"
          aria-label="View logo larger"
        >
          <img
            src="/Logo/newlogo.png"
            alt="Better Santa Barbara logo"
            className={cn(
              'object-contain bg-transparent',
              compact ? 'h-[130px] w-[130px]' : 'h-[130px] w-[130px]'
            )}
          />
        </button>
        <div className="min-w-0 leading-none">
          <div
            className={cn(
              'font-bold tracking-tight',
              compact ? 'text-base' : 'text-lg sm:text-xl',
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
      </div>

      {showLargeLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-w-[90vw] rounded-3xl bg-white p-4 shadow-2xl">
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
              className="h-[320px] w-[320px] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
