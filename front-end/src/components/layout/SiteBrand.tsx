import { cn } from '../../lib/utils';

interface SiteBrandProps {
  inverse?: boolean;
  compact?: boolean;
}

export default function SiteBrand({
  inverse = false,
  compact = false,
}: SiteBrandProps) {
  return (
    <div className="flex items-center gap-3" aria-label="Better Santa Barbara">
      {/* Official LGU Seal */}
      <img
        src="/Logo/sta-barbara-seal.png"
        alt="Municipality of Sta. Barbara official seal"
        className={cn(
          'shrink-0 object-contain drop-shadow-sm',
          compact ? 'h-10 w-10' : 'h-12 w-12'
        )}
      />
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
  );
}
