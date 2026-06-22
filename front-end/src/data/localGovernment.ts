import psgcSnapshot from './psgcSantaBarbara.json';

export const localGovernment = {
  name: 'Municipality of Santa Barbara',
  shortName: 'Santa Barbara',
  province: 'Pangasinan',
  region: 'Ilocos Region',
  district: '3rd District',
  classification: '1st Class Municipality',
  barangays: 29,
  landAreaHectares: '6,548',
  landAreaSquareKm: '61.37',
  population2020: '92,187',
  density2020: '1,502/km2',
  postalCode: '2419',
  islandGroup: 'Luzon',
  psgc: psgcSnapshot.municipality,
  psgcSnapshotDate: psgcSnapshot.source.retrievedAt,
  geography: 'Landlocked municipality in the central plains of Pangasinan',
  coordinates: '15.9999, 120.4051',
  elevationMeters: '9.4',
  distanceFromCapitalKm: 24,
  distanceFromManilaKm: '167.87',
  website: 'https://stabarbarapangasinan.gov.ph',
  facebook: 'https://www.facebook.com/santabarbarapangasinan',
  sources: {
    psgcOfficial: 'https://psa.gov.ph/classification/psgc',
    psgcApi: psgcSnapshot.source.url,
    psaOpenStat: 'https://openstat.psa.gov.ph/',
    dataGovPh: 'https://data.gov.ph/',
    boundaryData: 'https://www.geoboundaries.org/countryDownloads.html',
    province:
      'https://www.pangasinan.gov.ph/city-municipalities/santa-barbara/',
    demographics:
      'https://www.philatlas.com/luzon/r01/pangasinan/santa-barbara.html',
  },
  historySummary:
    'Santa Barbara was once called Tolong, named after the river now known as the Sinocalan River. The municipality is recognized as one of the early pueblos established by Spanish conquistadores in Pangasinan.',
  revolutionSummary:
    'During the Filipino Revolution, Santa Barbara served as the headquarters of Katipunan forces in Pangasinan led by Daniel Maramba, a Santa Barbara native.',
  civicSummary:
    "A central-plains municipality in Pangasinan with 29 barangays, Santa Barbara is part of the province's 3rd District and sits about 24 kilometers from Lingayen.",
  heritageSites: [
    'Santa Barbara Parish of the Holy Family Church',
    'Daniel Maramba Historical Marker',
  ],
  officials: {
    mayor: 'Carlito Zaplan Sr.',
    viceMayor: 'Bobby Barbiran',
    councilors: [
      'Norman Q. Dalope',
      'Fatima D. Ico',
      'Marking G. Cruz',
      'Juan Emmanuel T. Cabangon',
      'Bernardine A. Barbiran',
      'Ramil R. Delos Santos',
      'Carlito Noy D. Zaplan Jr.',
      'Phyll Anthony V. Zaplan',
      'Lloyd Jethro C. Zaplan',
      'Vj G. Bauzon',
    ],
  },
};

const barangayDemographics: Record<
  string,
  { population2020: string; share2020: string }
> = {
  Alibago: { population2020: '1,564', share2020: '1.70%' },
  Balingueo: { population2020: '3,911', share2020: '4.24%' },
  Banaoang: { population2020: '4,477', share2020: '4.86%' },
  Banzal: { population2020: '1,571', share2020: '1.70%' },
  Botao: { population2020: '3,401', share2020: '3.69%' },
  Cablong: { population2020: '3,058', share2020: '3.32%' },
  Carusocan: { population2020: '1,876', share2020: '2.03%' },
  Dalongue: { population2020: '2,030', share2020: '2.20%' },
  Erfe: { population2020: '652', share2020: '0.71%' },
  Gueguesangen: { population2020: '1,831', share2020: '1.99%' },
  Leet: { population2020: '7,275', share2020: '7.89%' },
  Malanay: { population2020: '2,764', share2020: '3.00%' },
  Maningding: { population2020: '4,890', share2020: '5.30%' },
  Maronong: { population2020: '3,304', share2020: '3.58%' },
  Maticmatic: { population2020: '5,116', share2020: '5.55%' },
  'Minien East': { population2020: '3,260', share2020: '3.54%' },
  'Minien West': { population2020: '5,230', share2020: '5.67%' },
  Nilombot: { population2020: '2,434', share2020: '2.64%' },
  Patayac: { population2020: '2,880', share2020: '3.12%' },
  Payas: { population2020: '3,928', share2020: '4.26%' },
  'Poblacion Norte': { population2020: '4,677', share2020: '5.07%' },
  'Poblacion Sur': { population2020: '1,766', share2020: '1.92%' },
  Primicias: { population2020: '1,819', share2020: '1.97%' },
  Sapang: { population2020: '2,315', share2020: '2.51%' },
  Sonquil: { population2020: '3,272', share2020: '3.55%' },
  'Tebag East': { population2020: '439', share2020: '0.48%' },
  'Tebag West': { population2020: '2,538', share2020: '2.75%' },
  Tuliao: { population2020: '6,424', share2020: '6.97%' },
  Ventinilla: { population2020: '3,485', share2020: '3.78%' },
};

export const localGovernmentBarangays = psgcSnapshot.barangays.map(
  barangay => ({
    ...barangay,
    ...barangayDemographics[barangay.name],
  })
);

export const localGovernmentProfile = {
  populationGrowth: {
    census2015: '82,012',
    census2020: localGovernment.population2020,
    increase2015To2020: '10,175',
    growthRate2015To2020: '2.49%',
  },
  households2015: {
    householdPopulation: '81,928',
    households: '18,636',
    averageHouseholdSize: '4.40',
  },
  electorate2019: {
    total: '51,863',
    male: '25,664',
    female: '26,199',
  },
  economy: {
    annualRegularRevenue2016: 'PHP 182,873,222.95',
  },
  nearestTowns: [
    'Calasiao',
    'Mapandan',
    'Mangaldan',
    'San Jacinto',
    'Malasiqui',
    'Manaoag',
  ],
  nearestCities: [
    'Dagupan',
    'San Carlos',
    'Urdaneta',
    'Alaminos',
    'Baguio',
    'Tarlac City',
  ],
};

export const localGovernmentFacts = [
  {
    label: 'Municipal class',
    value: localGovernment.classification,
  },
  {
    label: 'Barangays',
    value: String(localGovernment.barangays),
  },
  {
    label: 'Population',
    value: `${localGovernment.population2020} residents`,
  },
  {
    label: 'Land area',
    value: `${localGovernment.landAreaHectares} hectares`,
  },
];
