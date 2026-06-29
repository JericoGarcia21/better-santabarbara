import { useEffect, useState } from 'react';
import { Clock3, RefreshCw } from 'lucide-react';

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'SGD', 'HKD', 'AUD', 'CAD'];

interface TimeSync {
  epochMs: number;
  syncedAt: number;
}

interface ExchangeResponse {
  date: string;
  rates: Record<string, number>;
}

export default function LiveCivicData() {
  const [timeSync, setTimeSync] = useState<TimeSync | null>(null);
  const [tick, setTick] = useState(0);
  const [exchange, setExchange] = useState<ExchangeResponse | null>(null);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const controller = new AbortController();

    const syncTime = async () => {
      const providers = [
        'https://worldtimeapi.org/api/timezone/Asia/Manila',
        'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FManila',
        'https://api.open-meteo.com/v1/forecast?latitude=15.9999&longitude=120.4051&current=temperature_2m&timezone=Asia%2FManila',
      ];

      for (const url of providers) {
        try {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) continue;
          const data = (await response.json()) as {
            unixtime?: number;
            unixTimeSeconds?: number;
            dateTime?: string;
            current?: { time?: string };
          };
          const timeApiTime = data.dateTime
            ? Date.parse(`${data.dateTime}+08:00`) / 1000
            : undefined;
          const openMeteoTime = data.current?.time
            ? Date.parse(`${data.current.time}+08:00`) / 1000
            : undefined;
          const epochSeconds =
            data.unixtime ??
            data.unixTimeSeconds ??
            timeApiTime ??
            openMeteoTime;
          if (!epochSeconds) continue;
          setTimeSync({
            epochMs: epochSeconds * 1000,
            syncedAt: performance.now(),
          });
          return;
        } catch {
          if (controller.signal.aborted) return;
        }
      }

      setTimeSync(null);
    };

    syncTime();
    const resync = window.setInterval(syncTime, 60 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(resync);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTick(value => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const symbols = currencies.join(',');

    const loadExchangeRates = async () => {
      const providers = [
        `https://api.frankfurter.app/latest?base=PHP&symbols=${symbols}`,
        'https://open.er-api.com/v6/latest/PHP',
      ];

      for (const url of providers) {
        try {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) continue;
          const data = (await response.json()) as ExchangeResponse & {
            time_last_update_utc?: string;
          };
          if (!data.rates?.USD) continue;
          setExchange({
            rates: data.rates,
            date: data.date ?? data.time_last_update_utc ?? '',
          });
          return;
        } catch {
          if (controller.signal.aborted) return;
        }
      }

      setExchange(null);
    };

    loadExchangeRates();

    return () => controller.abort();
  }, []);

  const elapsed = timeSync ? performance.now() - timeSync.syncedAt : 0;
  const currentPhilippineDate = timeSync
    ? new Date(timeSync.epochMs + elapsed)
    : null;
  const philippineTime = currentPhilippineDate
    ? new Intl.DateTimeFormat('en-PH', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Manila',
      }).format(currentPhilippineDate)
    : null;
  const philippineDate = currentPhilippineDate
    ? new Intl.DateTimeFormat('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Asia/Manila',
      }).format(currentPhilippineDate)
    : null;

  // Keep the component subscribed to the one-second render tick.
  void tick;

  const pesoEquivalent = exchange?.rates[currency]
    ? 1 / exchange.rates[currency]
    : null;

  return (
    <div
      className="hidden shrink-0 lg:flex lg:items-center lg:gap-4"
      title="Philippine time from WorldTimeAPI. Indicative exchange rates from Frankfurter using European Central Bank data."
    >
      <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white xl:text-base">
        <Clock3 className="h-4 w-4 shrink-0 text-[#f2c91d]" />
        <span className="block min-w-0 truncate tabular-nums">
          {philippineDate && philippineTime
            ? `${philippineDate} · ${philippineTime}`
            : 'Time unavailable'}
        </span>
        {!philippineTime && <RefreshCw className="h-3.5 w-3.5 opacity-60" />}
      </div>
      <div className="h-8 w-px shrink-0 bg-white/20" />
      <div className="min-w-0">
        <div className="flex items-center gap-1 whitespace-nowrap text-sm text-white/80 xl:text-base">
          <span>1</span>
          <select
            value={currency}
            onChange={event => setCurrency(event.target.value)}
            aria-label="Foreign currency"
            className="border-0 bg-transparent p-0 text-right font-bold text-[#f2c91d] focus:outline-none"
          >
            {currencies.map(code => (
              <option key={code} value={code} className="text-gray-900">
                {code}
              </option>
            ))}
          </select>
          <span>=</span>
          <span className="block min-w-[4rem] text-left font-semibold tabular-nums text-white">
            {pesoEquivalent ? `₱${pesoEquivalent.toFixed(2)}` : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
