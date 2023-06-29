import SearchForm from './Search-Form';
import React, { lazy, Suspense } from 'react';

const PropertyDetails = lazy(() => import('./Property-Details'));
const MarketSearchMap = lazy(() => import('./Map'));
const TenantAndLead = lazy(() => import('./TenantAndLead'));

const MarketResearch: React.FC = () => {
  return (
    <div className="bg-white h-full flex flex-col">
      

      <div className="space-y-4 pt-4 relative h-full flex flex-col">
        <SearchForm />

        <Suspense>
          <PropertyDetails />

          <MarketSearchMap />

          <TenantAndLead />
        </Suspense>
      </div>
    </div>
  );
};

export default MarketResearch;
