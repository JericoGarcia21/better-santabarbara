import { UserRound } from 'lucide-react';
import { localGovernment } from '../../data/localGovernment';
import { Heading } from '../ui/Heading';
import ScrollReveal from '../ui/ScrollReveal';

interface OfficialPortraitProps {
  name: string;
  imageUrl?: string;
  compact?: boolean;
}

function getInitials(name: string) {
  return name
    .replace(/\b(Sr|Jr)\.?\b/gi, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

function OfficialPortrait({
  name,
  imageUrl,
  compact = false,
}: OfficialPortraitProps) {
  const classes = compact
    ? 'aspect-[4/3] w-full'
    : 'h-32 w-28 shrink-0 sm:h-36 sm:w-32';

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${name}, municipal official`}
        className={`${classes} object-cover`}
      />
    );
  }

  return (
    <div
      className={`${classes} relative flex items-center justify-center overflow-hidden bg-primary-50 text-primary-500`}
      aria-label={`Portrait placeholder for ${name}`}
    >
      <UserRound
        className={compact ? 'h-12 w-12 opacity-30' : 'h-16 w-16 opacity-30'}
        strokeWidth={1.5}
      />
      <span className="absolute bottom-2 right-2 text-xs font-bold text-primary-700/70">
        {getInitials(name)}
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1 bg-[#f2c91d]" />
    </div>
  );
}

const executiveOfficials = [
  {
    role: 'Municipal Mayor',
    office: 'Office of the Municipal Mayor',
    name: localGovernment.officials.mayor,
  },
  {
    role: 'Municipal Vice Mayor',
    office: 'Office of the Municipal Vice Mayor',
    name: localGovernment.officials.viceMayor,
  },
];

export default function OfficialsDirectory() {
  return (
    <section className="mt-10 border-t border-gray-200 pt-8" id="officials">
      <ScrollReveal>
        <div className="max-w-3xl">
          <div className="mb-2 text-sm font-semibold uppercase text-primary-500">
            Municipal government
          </div>
          <Heading level={2}>Local officials</Heading>
          <p className="text-gray-600">
            Elected officials serving the Municipality of Santa Barbara.
            Verified official portraits can be added to these prepared image
            spaces.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {executiveOfficials.map(official => (
            <article
              key={official.role}
              className="flex min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <OfficialPortrait name={official.name} />
              <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                <div className="text-xs font-bold uppercase text-primary-500">
                  {official.role}
                </div>
                <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                  {official.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{official.office}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Municipal councilors
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Sangguniang Bayan members
            </p>
          </div>
          <div className="text-sm font-semibold text-primary-500">
            {localGovernment.officials.councilors.length} members
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {localGovernment.officials.councilors.map(councilor => (
            <article
              key={councilor}
              className="min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white transition-colors hover:border-primary-200"
            >
              <OfficialPortrait name={councilor} compact />
              <div className="p-4">
                <div className="text-[11px] font-bold uppercase text-primary-500">
                  Municipal Councilor
                </div>
                <h4 className="mt-1.5 text-sm font-bold leading-5 text-gray-900">
                  {councilor}
                </h4>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
