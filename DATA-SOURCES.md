# Data Sources

The portal combines sources because no single API covers every LGU dataset.

| Area                    | Source                                                                               | Current use                                                 |
| ----------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| LGU hierarchy and codes | PSA Philippine Standard Geographic Code, accessed through the public PSGC API mirror | Municipality and 29 barangay names, former names, and codes |
| Population              | PSA 2020 Census figures, currently distributed through the cited demographic profile | Municipality and barangay population figures                |
| Municipal boundary      | geoBoundaries 2020 ADM3, sourced from NAMRIA, PSA, and OCHA                          | Leaflet boundary polygon                                    |
| National open data      | data.gov.ph                                                                          | Discovery source; no dataset is imported automatically yet  |
| Local facts             | Province and municipality publications                                               | History, officials, heritage, budgets, and local programs   |

## Refreshing PSGC data

Run this from `front-end/`:

```bash
npm run sync:psgc
```

The command refreshes `src/data/psgcSantaBarbara.json`. The snapshot keeps the
site available even when the external API is unavailable.

## Coverage limits

Hazards, floods, evacuation centers, current officials, budgets, projects, and
ordinances should only be added from identified LGU, MDRRMO, GeoRiskPH, official
report, or FOI sources. The portal does not present these as API-backed facts
unless a specific authoritative dataset has been integrated.
