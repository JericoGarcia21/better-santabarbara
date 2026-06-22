import { writeFile } from 'node:fs/promises';

const municipality = {
  name: 'Santa Barbara',
  code: '015538000',
  psgc10DigitCode: '0105538000',
  provinceCode: '015500000',
  regionCode: '010000000',
  islandGroupCode: 'luzon',
};

const url = `https://psgc.gitlab.io/api/cities-municipalities/${municipality.code}/barangays/`;
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`PSGC request failed with status ${response.status}`);
}

const barangays = await response.json();
const snapshot = {
  source: {
    name: 'PSGC public API mirror',
    url,
    retrievedAt: new Date().toISOString().slice(0, 10),
  },
  municipality,
  barangays: barangays.map(barangay => ({
    name: barangay.name,
    ...(barangay.oldName ? { oldName: barangay.oldName } : {}),
    code: barangay.code,
    psgc10DigitCode: barangay.psgc10DigitCode,
  })),
};

await writeFile(
  new URL('../src/data/psgcSantaBarbara.json', import.meta.url),
  `${JSON.stringify(snapshot, null, 2)}\n`
);

console.log(`Updated ${snapshot.barangays.length} Santa Barbara barangays.`);
