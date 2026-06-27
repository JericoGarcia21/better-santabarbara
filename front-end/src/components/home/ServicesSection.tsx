import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { getIconComponent, iconRegistry } from '../../lib/iconRegistry';

import { serviceCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

export default function ServicesSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();

  const displayedCategories = serviceCategories.categories as Category[];
  const InfoIcon = iconRegistry.Info;

  return (
    <Section id="services">
      <Heading level={2}>{title || t('services.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description ||
          'Service listings are temporarily limited while BetterGov awaits LGU verification.'}
      </Text>
      <div
        role="note"
        className="mb-8 flex items-start gap-3 rounded-lg border border-[#f2c91d]/60 bg-[#f2c91d]/10 px-4 py-3 text-sm leading-6 text-gray-700"
      >
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
        <p>{t('services.availabilityNote')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = getIconComponent(category.icon);

  return (
    <Card hoverable className="border-t-4 border-primary-500">
      <Link
        to={`/services/${category.slug}`}
        className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
      >
        <CardContent className="flex flex-col h-full p-6">
          <div className="flex gap-2">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
              <Icon className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
              {category.category}
            </h3>
          </div>
          <span className="mb-3 inline-flex w-fit rounded-sm bg-yellow-50 px-2 py-1 text-xs font-bold uppercase tracking-wide text-yellow-800">
            Pending LGU verification
          </span>
          <Text className="text-gray-800">
            Detailed service information will be added after LGU review.
          </Text>
        </CardContent>
      </Link>
    </Card>
  );
}
