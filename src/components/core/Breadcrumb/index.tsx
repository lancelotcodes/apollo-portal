import { FCC } from '@/helpers/FCC';
import { routes } from '@/infrastructure/appRoute/routes';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import React from 'react';

interface Props {
  currentPage?: string;
  excludePaths?: string[];
  mappedValue?: Record<string, string | undefined>;
}

const Breadcrumb: FCC<Props> = ({ currentPage, excludePaths, mappedValue }) => {
  const breadcrumbs = useReactRouterBreadcrumbs(routes, {
    excludePaths: excludePaths ? [...excludePaths, '/'] : ['/'],
  });

  return (
    <nav className="flex py-1 px-4 overflow-auto" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 sm:gap-2 md:gap-3">
        {breadcrumbs.map(({ breadcrumb, key }, idx) => {
          return (
            <li key={key} className="whitespace-nowrap">
              {idx === 0 && breadcrumbs.length > 1 ? (
                <div>
                  <Link to={key} className="text-gray-blue-5 typography-button hover:text-black uppercase">
                    {mappedValue?.[key] || breadcrumb}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  {breadcrumbs.length > 1 && (
                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="typography-button text-black uppercase">
                      {currentPage || mappedValue?.[key] || breadcrumb}
                    </span>
                  ) : (
                    <Link to={key} className="text-gray-blue-5 typography-button hover:text-black uppercase">
                      {mappedValue?.[key] || breadcrumb}
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
