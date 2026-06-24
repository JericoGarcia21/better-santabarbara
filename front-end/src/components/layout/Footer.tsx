import React from 'react';
import { Facebook, Info, Instagram, Twitter, Youtube } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteBrand from './SiteBrand';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  const getSocialIcon = (label: string) => {
    switch (label) {
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      case 'YouTube':
        return <Youtube className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="border-t-4 border-[#f2c91d] bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="mb-10 flex items-start gap-3 rounded-md border border-gray-700 bg-gray-800/70 p-4 sm:p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#f2c91d]" />
          <div className="max-w-5xl text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
            <p>
              <strong className="text-white">
                Independent portal disclaimer:
              </strong>{' '}
              Information on this portal is compiled from publicly available
              open-source data and may not reflect the latest records of the
              Municipality of Santa Barbara. This independent community portal
              was created by a private citizen of Santa Barbara and is not an
              official LGU data portal. Please verify critical information with
              the municipal government.
            </p>
            <p className="mt-2 text-gray-300">
              correct, and update public information. Until then, this portal
              does not claim LGU approval, endorsement, or partnership.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <SiteBrand inverse />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A community portal for residents, businesses, and visitors of
              Santa Barbara, Pangasinan.
            </p>
            <p className="mb-5 inline-flex rounded-full border border-[#f2c91d]/40 bg-[#f2c91d]/10 px-3 py-1.5 text-sm font-semibold text-[#f2c91d]">
              Cost to the People of Santa Barbara: ₱0.
            </p>
            <div className="flex space-x-4">
              {footerNavigation.socialLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.label)}
                </Link>
              ))}
            </div>
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 text-center text-sm text-gray-400 md:mb-0 md:text-left">
              <p>{t('footer.copyright')}</p>
              <p className="mt-1">
                Developed and maintained by{' '}
                <span className="font-medium text-gray-200">
                  Jerico B. Garcia
                </span>
              </p>
            </div>
            <div className="flex space-x-6">
              {/* <a
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Use
              </a> */}
              <Link
                to="https://github.com/bettergovph/bettergov"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contribute at GitHub
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
              <a
                href="/accessibility"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
