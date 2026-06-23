# BetterGov Santa Barbara

A community-maintained civic information portal for the Municipality of Santa
Barbara, Pangasinan. The site brings local services, government information,
municipal history, barangay references, maps, demographics, and transparency
resources into one accessible website.

> **Independent community project:** This website was created by a private
> citizen of Santa Barbara and is not an official portal of the Municipality of
> Santa Barbara. Information is compiled from public and open-source datasets
> and may not reflect the LGU's latest records. Verify critical information
> directly with the municipal government.

## Features

- Responsive React interface for desktop and mobile devices
- Municipal profile, history, officials, and 29-barangay directory
- Interactive OpenStreetMap map with municipal and barangay references
- Service and government directories backed by YAML and Markdown
- English, Filipino/Tagalog, and Pangasinan interface translations
- Transparency-document section
- Accessible semantic components and keyboard-friendly navigation
- SEO metadata and production-ready Vite build

## Technology

- React 19 and TypeScript
- Vite 7
- Tailwind CSS 4
- React Router
- i18next and react-i18next
- Leaflet and React Leaflet
- React Markdown with GitHub-flavored Markdown
- Lucide icons

## Getting started

### Requirements

- Node.js 20 or newer
- npm
- Git

### Local development

```bash
git clone <repository-url>
cd better-santabarbara/front-end
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

All npm commands must be run from `front-end/`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix supported lint problems |
| `npm run format` | Format the project with Prettier |
| `npm run format:check` | Check formatting without changing files |
| `npm run dev:yaml` | Convert YAML data, then start development |
| `npm run convert-yaml` | Convert YAML content to JSON |
| `npm run sync:psgc` | Refresh PSGC barangay names and codes |
| `npm run setup` | Run the interactive starter configuration |

## Project structure

```text
better-santabarbara/
├── front-end/
│   ├── content/
│   │   ├── government/       Government pages and category indexes
│   │   └── services/         Service pages and category indexes
│   ├── public/
│   │   └── locales/          Runtime translation files
│   ├── scripts/              Setup and data-maintenance scripts
│   └── src/
│       ├── components/       UI, layout, and home-page components
│       ├── data/             Municipal, navigation, YAML, and map data
│       ├── i18n/             Supported-language configuration
│       ├── lib/              Markdown and utility modules
│       ├── pages/            Route-level React pages
│       └── types/            Shared TypeScript types
├── terraform/                Deployment infrastructure
└── vercel.json               Vercel configuration
```

## Content management

Service and government content lives under `front-end/content/`.

Each category contains an `index.yaml` file and one or more Markdown pages:

```text
content/services/<category>/index.yaml
content/services/<category>/<page>.md
```

Top-level categories are defined in:

- `front-end/src/data/services.yaml`
- `front-end/src/data/government.yaml`

New categories also require a static mapping in
`front-end/src/data/yamlLoader.ts`. See [CONTENT-GUIDE.md](CONTENT-GUIDE.md)
and [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) for detailed instructions.

### Markdown variables

A Markdown page may have a companion JSON file with the same filename. Values
in that file replace `{PLACEHOLDER}` tokens at load time. If a value is absent,
the loader checks a matching `VITE_<PLACEHOLDER>` environment variable.

## Languages

The interface supports:

- English (`en`)
- Filipino/Tagalog (`fil`)
- Pangasinan (`pag`)

Translation files are stored in `front-end/public/locales/<language>/common.json`.
The selected language is saved in the browser. Long-form Markdown documents
remain in their authored language until reviewed translations are contributed.

## Data sources

The portal uses public data and community-maintained summaries, including:

- Philippine Statistics Authority census and PSGC references
- PhilAtlas demographic information
- geoBoundaries administrative boundaries
- OpenStreetMap contributors
- Province of Pangasinan and municipal public information

The displayed 2024 municipal population is **92,420**. A verified 2024
barangay-level population breakdown is not currently included; older barangay
population figures are not presented as current data.

See [DATA-SOURCES.md](DATA-SOURCES.md) for source details and limitations.

## Quality checks

Before submitting a change, run:

```bash
cd front-end
npm run lint
npm run build
```

The pre-commit hook runs ESLint and Prettier against staged files.

## Deployment

The repository includes `vercel.json` and Terraform infrastructure. For
deployment options and environment configuration, see
[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md).

## Contributing

Contributions that improve accuracy, accessibility, translations, service
coverage, and local information are welcome.

1. Create a focused branch.
2. Make and verify the change.
3. Cite authoritative sources for factual updates.
4. Run lint and the production build.
5. Open a pull request explaining the change.

Do not present unverified community information as an official LGU record.

## License

This project is released under the [CC0 1.0 Universal](LICENSE) public-domain
dedication.

**Cost to the People of Santa Barbara: ₱0.**
