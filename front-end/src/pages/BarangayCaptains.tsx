import {
  AlertCircle,
  BadgeCheck,
  ClipboardList,
  MapPin,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import Section from '../components/ui/Section';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';
import { barangayCaptains } from '../data/barangayCaptains';
import { localGovernment } from '../data/localGovernment';

const BarangayCaptains = () => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'verified' | 'pending'
  >('all');

  const verifiedCount = useMemo(
    () => barangayCaptains.filter(barangay => barangay.captain).length,
    []
  );
  const pendingCount = barangayCaptains.length - verifiedCount;
  const verificationPercent = Math.round(
    (verifiedCount / barangayCaptains.length) * 100
  );

  const filteredBarangays = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const statusFiltered = barangayCaptains.filter(barangay => {
      if (statusFilter === 'verified') return Boolean(barangay.captain);
      if (statusFilter === 'pending') return !barangay.captain;
      return true;
    });

    if (!normalizedQuery) return statusFiltered;

    return statusFiltered.filter(barangay =>
      `${barangay.name} ${barangay.captain ?? ''} ${barangay.code}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query, statusFilter]);

  return (
    <>
      <SEO
        title="Barangay Captains"
        description={`Directory page for barangay captains of ${localGovernment.shortName}, ${localGovernment.province}.`}
        keywords="Santa Barbara Pangasinan barangay captains, punong barangay, barangay officials"
      />
      <Section className="bg-gray-50">
        <Breadcrumbs className="mb-8" />

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-950/5">
          <div className="grid gap-8 border-b border-gray-200 bg-primary-900 p-6 text-white lg:grid-cols-[1fr_420px] lg:p-8">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.22em] text-[#f2c91d]">
                Barangay Captains
              </div>
              <Heading level={1} className="mt-3 max-w-3xl text-white">
                Punong Barangay directory
              </Heading>
              <Text className="max-w-2xl text-primary-50">
                Browse all {localGovernment.barangays} barangays of Santa
                Barbara with PSGC identifiers and a captain field prepared for
                LGU-verified names.
              </Text>
              <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
                <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10">
                  {localGovernment.shortName}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10">
                  {localGovernment.province}
                </span>
                <span className="rounded-full bg-[#f2c91d] px-3 py-1.5 text-primary-950">
                  PSGC-linked directory
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-5">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                  <ShieldCheck className="h-5 w-5 text-[#f2c91d]" />
                  <div>
                    <div className="text-2xl font-bold">
                      {localGovernment.barangays}
                    </div>
                    <div className="text-sm text-primary-100">
                      Barangays listed
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                  <BadgeCheck className="h-5 w-5 text-[#f2c91d]" />
                  <div>
                    <div className="text-2xl font-bold">{verifiedCount}</div>
                    <div className="text-sm text-primary-100">
                      Names verified
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                  <AlertCircle className="h-5 w-5 text-[#f2c91d]" />
                  <div>
                    <div className="text-2xl font-bold">{pendingCount}</div>
                    <div className="text-sm text-primary-100">
                      Pending review
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-primary-100">
                  <span>Verification progress</span>
                  <span>{verificationPercent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/20">
                  <div
                    className="h-full rounded-full bg-[#f2c91d]"
                    style={{ width: `${verificationPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 bg-gray-50 p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full max-w-xl">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Search barangay, captain, or PSGC code"
                  className="w-full rounded-md border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  aria-label="Search barangay captains"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'All', value: 'all' },
                  { label: 'Verified', value: 'verified' },
                  { label: 'Pending', value: 'pending' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        option.value as 'all' | 'verified' | 'pending'
                      )
                    }
                    className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                      statusFilter === option.value
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm leading-6 text-gray-800 sm:flex-row sm:items-start">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700" />
              <div>
                Captain names should be confirmed against an official LGU or
                election records source before publication. Unverified entries
                are intentionally shown as pending instead of using guessed
                names.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-950">
                  Barangay captain records
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredBarangays.length} of{' '}
                  {barangayCaptains.length}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <MapPin className="h-4 w-4 text-primary-600" />
              Santa Barbara, Pangasinan
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2 xl:p-8">
            {filteredBarangays.map(barangay => (
              <article
                key={barangay.name}
                className="group grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-primary-200 hover:shadow-md md:grid-cols-[1fr_1.2fr]"
              >
                <div className="flex flex-col justify-between border-b border-gray-100 bg-gray-50 p-5 md:border-b-0 md:border-r">
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                        barangay.captain
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-800'
                      }`}
                    >
                      {barangay.captain ? 'Verified' : 'Pending'}
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-gray-950">
                      {barangay.name}
                    </h2>
                    {'oldName' in barangay && barangay.oldName && (
                      <div className="mt-1 text-xs text-gray-500">
                        Formerly {barangay.oldName}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Barangay record
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
                        Barangay Captain
                      </div>
                      <div className="mt-1 font-semibold text-gray-950">
                        {barangay.captain ?? 'For LGU verification'}
                      </div>
                    </div>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
                      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                        PSGC
                      </dt>
                      <dd className="mt-1 break-all font-mono text-[11px] text-gray-700">
                        {barangay.psgc10DigitCode}
                      </dd>
                    </div>
                    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
                      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                        Pop.
                      </dt>
                      <dd className="mt-1 font-semibold text-gray-900">
                        {barangay.population2020 ?? '—'}
                      </dd>
                    </div>
                    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
                      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                        Share
                      </dt>
                      <dd className="mt-1 font-semibold text-gray-900">
                        {barangay.share2020 ?? '—'}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Users className="h-4 w-4 text-primary-600" />
                    2020 census barangay-level population data
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredBarangays.length === 0 && (
            <div className="border-t border-gray-200 px-5 py-12 text-center">
              <div className="font-semibold text-gray-950">
                No barangays found
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Try another barangay name, captain name, or PSGC code.
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default BarangayCaptains;
