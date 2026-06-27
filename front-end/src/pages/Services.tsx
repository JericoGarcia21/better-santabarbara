import Section from '../components/ui/Section';
import { useParams } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  serviceCategories,
  loadCategoryData,
  type Subcategory,
  type CategoryIndex,
  type CategoryData,
} from '../data/yamlLoader';
import { getIconComponent } from '../lib/iconRegistry';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import VerificationNotice from '../components/VerificationNotice';

const Services: React.FC = () => {
  const { category } = useParams();
  const { i18n } = useTranslation('common');
  const [categoriesData, setCategoriesData] =
    useState<CategoryData>(serviceCategories);
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return categoriesData.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = getIconComponent(categoryData?.icon);

  useEffect(() => {
    loadCategoryData('services', i18n.language).then(setCategoriesData);
  }, [i18n.language]);

  useEffect(() => {
    setCategoryIndex({
      layout: 'list',
      pages: categoryData
        ? [
            {
              name: categoryData.category,
              slug: categoryData.slug,
              description:
                'Detailed service information will be added after LGU review.',
            },
          ]
        : [],
    });
  }, [categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />
        <ServicesSection
          title="Local government services"
          description="Service information is temporarily limited while BetterGov awaits LGU verification."
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <VerificationNotice context="services" />
        <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
        <Heading>{categoryData.category || category}</Heading>
        <Text className="text-gray-600 mb-6">
          Detailed information for this service category is hidden until it can
          be reviewed or confirmed with the Santa Barbara LGU.
        </Text>

        <>
          {categoryIndex.layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map(subcategory => (
                <div key={subcategory.slug}>
                  <Card className="h-full border-t-4 border-primary-500">
                    <CardContent>
                      <h4 className="text-lg font-medium text-gray-900">
                        {subcategory.name}
                      </h4>
                      {subcategory.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {subcategory.description}
                        </p>
                      )}
                      <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                        {categoryData.category || category}
                      </span>
                      <span className="ml-2 inline-block rounded-sm bg-yellow-50 px-2 py-1 text-xs font-bold uppercase tracking-wide text-yellow-800">
                        Pending LGU verification
                      </span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {subcategories.map(subcategory => (
                <div key={subcategory.slug}>
                  <Card className="mb-4">
                    <CardContent>
                      <h4 className="text-lg font-medium text-gray-900">
                        {subcategory.name}
                      </h4>
                      {subcategory.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {subcategory.description}
                        </p>
                      )}
                      <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                        {categoryData.category || category}
                      </span>
                      <span className="ml-2 inline-block rounded-sm bg-yellow-50 px-2 py-1 text-xs font-bold uppercase tracking-wide text-yellow-800">
                        Pending LGU verification
                      </span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </>
      </Section>
    </>
  );
};

export default Services;
