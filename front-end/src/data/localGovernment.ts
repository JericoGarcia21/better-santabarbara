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
  population2024: '92,420',
  population2020: '92,187',
  density2024: '1,502/km2',
  postalCode: '2419',
  islandGroup: 'Luzon',
  psgc: psgcSnapshot.municipality,
  psgcSnapshotDate: psgcSnapshot.source.retrievedAt,
  geography: 'Landlocked municipality in the central plains of Pangasinan',
  coordinates: '15.9999, 120.4051',
  elevationMeters: '9.4',
  distanceFromCapitalKm: 24,
  distanceFromManilaKm: '167.87',
  address: 'Maningding, Santa Barbara, Pangasinan 2419, Philippines',
  telephone: '(075) 649 2523',
  email: 'stabarbarapang@gmail.com',
  website: 'https://stabarbarapangasinan.gov.ph',
  facebook: 'https://www.facebook.com/MunicipalityOfSta.BarbaraOfficial',
  map: 'https://www.bing.com/maps/default.aspx?v=2&where1=Maningding%2C%20Santa%20Barbara%2C%20Philippines%2C%202419',
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
    wikipedia: 'https://en.wikipedia.org/wiki/Santa_Barbara,_Pangasinan',
  },
  historySummary:
    'Long before it became Santa Barbara, the riverine settlement was known as Tolong, after its principal waterway—now called the Sinocalan River. It stood in the fertile Agno Valley within the ancient territory of Luyag na Kabuloan.',
  revolutionSummary:
    'During the Philippine Revolution against Spain, Santa Barbara became the headquarters of Katipunan forces in central Pangasinan under Daniel Maramba, a native of the town.',
  civicSummary:
    "A central-plains municipality in Pangasinan with 29 barangays, Santa Barbara is part of the province's 3rd District and sits about 24 kilometers from Lingayen.",
  about:
    'Officially the Municipality of Santa Barbara, the town is called Baley na Santa Barbara in Pangasinan, Ili ti Santa Barbara in Ilocano, and Bayan ng Santa Barbara in Filipino. It is a first-class municipality whose communities are spread across 29 barangays.',
  geographySummary:
    'Santa Barbara lies on the plains of the Agno Valley near Dagupan, Urdaneta, and San Carlos. Its central location and road connections have helped it develop as both an agricultural community and a growing suburban municipality.',
  economySummary:
    'Agriculture remains central to local life. Rice is the principal crop, while Santa Barbara is also known for mango seedling nurseries. Food processing, pottery and clay tiles, construction materials, and other small industries support the local economy.',
  historyTimeline: [
    {
      date: 'Before Spanish rule',
      title: 'The settlement of Tolong',
      description:
        'Early riverine communities settled along the Tolong and nearby waterways. The settlement took its name from the river now known as the Sinocalan River.',
    },
    {
      date: '1580',
      title: 'Organized as an early pueblo',
      description:
        "Spanish conquistadores organized Tolong as one of Pangasinan's early pueblos to administer the area and collect tribute.",
    },
    {
      date: '1741',
      title: 'Santa Barbara de Tolong',
      description:
        'A church community was established with Saint Barbara as patron. The town became known as Santa Barbara de Tolong and later shortened its name to Santa Barbara.',
    },
    {
      date: 'Philippine Revolution',
      title: 'Katipunan headquarters',
      description:
        'Santa Barbara served as the headquarters of Katipunan forces in central Pangasinan led by local revolutionary commander Daniel Maramba.',
    },
  ],
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
    census2024: localGovernment.population2024,
    increase2015To2020: '10,175',
    growthRate2015To2020: '2.49%',
    increase2020To2024: '233',
    growthRate2020To2024: '0.25%',
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
    value: `${localGovernment.population2024} residents (2024 census)`,
  },
  {
    label: 'Land area',
    value: `${localGovernment.landAreaHectares} hectares`,
  },
];
