import yaml from 'js-yaml';

// Type definitions for the services data
export interface Subcategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
  subcategories?: Subcategory[]; // Keep for backward compatibility
}

export interface CategoryData {
  categories: Category[];
  description: string;
}

export interface CategoryIndexData {
  title?: string;
  description?: string;
  layout?: 'grid' | 'list';
  pages: Subcategory[];
}

// Import the YAML file as raw text
import servicesYamlContent from './services.yaml?raw';
import governmentActivitiesYamlContent from './government.yaml?raw';

const localizedYamlModules = import.meta.glob('../../content/**/*.yaml', {
  query: '?raw',
  import: 'default',
});

// Import all category index files statically
import healthServicesIndex from '../../content/services/health-services/index.yaml?raw';
import educationIndex from '../../content/services/education/index.yaml?raw';
import businessIndex from '../../content/services/business/index.yaml?raw';
import jobsOpportunitiesIndex from '../../content/services/jobs-opportunities/index.yaml?raw';
import socialWelfareIndex from '../../content/services/social-welfare/index.yaml?raw';
import agricultureFisheriesIndex from '../../content/services/agriculture-fisheries/index.yaml?raw';
import infrastructurePublicWorksIndex from '../../content/services/infrastructure-public-works/index.yaml?raw';
import garbageWasteDisposalIndex from '../../content/services/garbage-waste-disposal/index.yaml?raw';
import environmentIndex from '../../content/services/environment/index.yaml?raw';
import disasterPreparednessIndex from '../../content/services/disaster-preparedness/index.yaml?raw';
import housingLandUseIndex from '../../content/services/housing-land-use/index.yaml?raw';
import governmentDepartmentsIndex from '../../content/government/departments/index.yaml?raw';
import governmentDepartmentsLegislativeIndex from '../../content/government/departments/legislative/index.yaml?raw';

// Create a mapping of category slugs to their YAML content
const categoryIndexMap: { [key: string]: string } = {
  'health-services': healthServicesIndex,
  education: educationIndex,
  business: businessIndex,
  'jobs-opportunities': jobsOpportunitiesIndex,
  'social-welfare': socialWelfareIndex,
  'agriculture-fisheries': agricultureFisheriesIndex,
  'infrastructure-public-works': infrastructurePublicWorksIndex,
  'garbage-waste-disposal': garbageWasteDisposalIndex,
  environment: environmentIndex,
  'disaster-preparedness': disasterPreparednessIndex,
  'housing-land-use': housingLandUseIndex,
  departments: governmentDepartmentsIndex,
  legislative: governmentDepartmentsLegislativeIndex,
};

// Parse the YAML content
export const serviceCategories: CategoryData = yaml.load(
  servicesYamlContent
) as CategoryData;

export const governmentCategories: CategoryData = yaml.load(
  governmentActivitiesYamlContent
) as CategoryData;

export interface CategoryIndex {
  title?: string;
  description?: string;
  layout: 'grid' | 'list';
  pages: Subcategory[];
}

async function loadRawYaml(paths: string[]): Promise<string | null> {
  for (const path of paths) {
    const loader = localizedYamlModules[path];
    if (!loader) continue;

    return (await loader()) as string;
  }

  return null;
}

export async function loadCategoryData(
  type: 'services' | 'government',
  language = 'en'
): Promise<CategoryData> {
  const fallback =
    type === 'government' ? governmentCategories : serviceCategories;
  const localizedPath = `../../content/${language}/${type}.yaml`;
  const rawYaml = await loadRawYaml([localizedPath]);

  if (!rawYaml) return fallback;

  try {
    return yaml.load(rawYaml) as CategoryData;
  } catch (parseError) {
    console.warn(
      `Failed to parse localized ${type} YAML for ${language}:`,
      parseError
    );
    return fallback;
  }
}

// Function to load category index data
export async function loadCategoryIndex(
  categorySlug: string,
  language = 'en'
): Promise<CategoryIndex> {
  const localizedPath = Object.keys(localizedYamlModules).find(
    path =>
      path.startsWith(`../../content/${language}/`) &&
      path.endsWith(`/${categorySlug}/index.yaml`)
  );
  const localizedContent = localizedPath
    ? await loadRawYaml([localizedPath])
    : null;
  const yamlContent = localizedContent ?? categoryIndexMap[categorySlug];
  if (!yamlContent) {
    return { layout: 'list', pages: [] };
  }
  try {
    const indexData: CategoryIndexData = yaml.load(
      yamlContent
    ) as CategoryIndexData;
    return {
      title: indexData.title,
      description: indexData.description,
      layout: indexData.layout ?? 'list',
      pages: indexData.pages || [],
    };
  } catch (parseError) {
    console.warn(
      `Failed to parse YAML content for category ${categorySlug}:`,
      parseError
    );
    return { layout: 'list', pages: [] };
  }
}

// Function to get subcategories for a category (with caching)
const categoryCache = new Map<string, CategoryIndex>();

export async function getCategorySubcategories(
  categorySlug: string,
  language = 'en'
): Promise<CategoryIndex> {
  const cacheKey = `${language}:${categorySlug}`;
  if (categoryCache.has(cacheKey)) {
    return categoryCache.get(cacheKey)!;
  }

  const result = await loadCategoryIndex(categorySlug, language);
  categoryCache.set(cacheKey, result);
  return result;
}

/** Returns true if a slug has a registered index in categoryIndexMap */
export function isNestedCategory(slug: string): boolean {
  return slug in categoryIndexMap;
}
